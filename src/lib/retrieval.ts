// src/lib/retrieval.ts
// Semantic retrieval layer — embeds user question and searches Qdrant

import { embedText } from "./embeddings";
import { searchPoints } from "./qdrant";

export interface RetrievedChunk {
  text: string;
  source: string;   // e.g. "education/class_10"
  category: string; // e.g. "education"
  title: string;    // e.g. "Class X – ICSE"
  score: number;    // cosine similarity 0–1
}

/**
 * Retrieve the top-K most relevant chunks from Qdrant
 * for a given user question.
 */
export async function retrieveRelevantChunks(
  question: string,
  topK = 5
): Promise<RetrievedChunk[]> {
  // Embed the question
  const queryVector = await embedText(question);

  // Search Qdrant
  const results = await searchPoints(queryVector, topK);

  // Map to clean interface
  return results.map((r) => ({
    text: String(r.payload.text ?? ""),
    source: String(r.payload.source ?? "unknown"),
    category: String(r.payload.category ?? "general"),
    title: String(r.payload.title ?? ""),
    score: r.score,
  }));
}
