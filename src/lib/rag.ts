// src/lib/rag.ts
// RAG orchestration — retrieval + grounded prompt construction + Gemini generation

import { GoogleGenAI } from "@google/genai";
import { retrieveRelevantChunks, RetrievedChunk } from "./retrieval";

export interface RAGResponse {
  reply: string;
  sources: { source: string; title: string }[];
  rag: true;
  cached: false;
}

/**
 * Minimum cosine similarity score for the top retrieved chunk to be
 * considered relevant enough to pass to Gemini.
 *
 * Tune this value based on observed scores:
 * - Real matches (e.g. "10th marks" → class_10.md) score ~0.70–0.90
 * - Unrelated queries (e.g. "Class 9 marks") score ~0.40–0.54
 * - Setting at 0.55 blocks low-relevance queries without over-blocking real ones
 */
const MIN_RELEVANCE_SCORE = 0.55;

const RAG_SYSTEM_PROMPT = `You are Jeeban Mohanty's AI Portfolio Assistant.

Your role is to answer questions from recruiters, engineers, and visitors about Jeeban's background, education, skills, projects, achievements, and career.

RULES:
1. Answer ONLY using the retrieved knowledge context provided. Do not use any outside knowledge.
2. Never invent or assume personal facts — marks, CGPA, dates, project details, or any other specifics.
3. If the context does not contain the answer, say exactly: "I don't have that information in Jeeban's knowledge base."
4. Do not proactively share contact information (email, LinkedIn, GitHub) unless the user explicitly asks about contacting Jeeban or hiring opportunities.
5. When sharing academic scores or specific facts, be precise — quote the exact values from the retrieved context.
6. When multiple sources are relevant, combine them accurately.
7. Keep answers concise but complete. Do not pad with filler.
8. Do not claim information came from a specific document unless it was in the retrieved context.`;

/**
 * Build a grounded prompt from retrieved chunks.
 */
function buildGroundedPrompt(
  question: string,
  chunks: RetrievedChunk[]
): string {
  const contextBlock = chunks
    .map(
      (c, i) =>
        `[${i + 1}] Source: ${c.source}\nTitle: ${c.title}\n${c.text}`
    )
    .join("\n\n---\n\n");

  return `RETRIEVED KNOWLEDGE CONTEXT:
${contextBlock}

---

USER QUESTION:
${question}

Answer the question using only the retrieved context above. Be accurate and specific.`;
}

/** Standard "not in knowledge base" response — no Gemini call needed. */
const NO_INFORMATION_RESPONSE: RAGResponse = {
  reply: "I don't have that information in Jeeban's knowledge base. If you think it should be there, feel free to ask something else or contact Jeeban directly.",
  sources: [],
  rag: true,
  cached: false,
};

/**
 * Full RAG pipeline:
 * 1. Retrieve relevant chunks from Qdrant
 * 2. Relevance gate — skip Gemini if top score < MIN_RELEVANCE_SCORE
 * 3. Build grounded prompt
 * 4. Call Gemini with retrieved context
 * 5. Return answer + deduplicated sources
 */
export async function ragAnswer(question: string): Promise<RAGResponse> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  // Step 1: Retrieve top-k chunks
  const chunks = await retrieveRelevantChunks(question, 5);

  // Step 2: Relevance gate
  // If no chunks returned, or top chunk score is below threshold — don't call Gemini
  if (chunks.length === 0 || chunks[0].score < MIN_RELEVANCE_SCORE) {
    console.log(
      `[RAG] Relevance gate triggered — top score: ${chunks[0]?.score?.toFixed(3) ?? "none"} (threshold: ${MIN_RELEVANCE_SCORE})`
    );
    return NO_INFORMATION_RESPONSE;
  }

  // Only pass chunks that individually meet the threshold
  const relevantChunks = chunks.filter((c) => c.score >= MIN_RELEVANCE_SCORE);

  // Step 3: Build grounded prompt
  const groundedPrompt = buildGroundedPrompt(question, relevantChunks);

  // Step 4: Generate with Gemini
  const genAI = new GoogleGenAI({ apiKey });
  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: groundedPrompt,
    config: {
      systemInstruction: RAG_SYSTEM_PROMPT,
    },
  });

  const reply = result.text ?? "";
  if (!reply) {
    throw new Error("Gemini returned an empty response");
  }

  // Step 5: Deduplicate sources (only from chunks that passed the gate)
  const seenSources = new Set<string>();
  const sources: { source: string; title: string }[] = [];

  for (const chunk of relevantChunks) {
    if (!seenSources.has(chunk.source)) {
      seenSources.add(chunk.source);
      sources.push({ source: chunk.source, title: chunk.title });
    }
  }

  return {
    reply,
    sources,
    rag: true,
    cached: false,
  };
}

