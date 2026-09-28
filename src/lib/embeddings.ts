// src/lib/embeddings.ts
// Generate text embeddings using Google Gemini gemini-embedding-001

import { GoogleGenAI } from "@google/genai";

const EMBEDDING_MODEL = "gemini-embedding-001";
const EMBEDDING_DIMENSION = 3072; // gemini-embedding-001 outputs 3072-dim vectors

export { EMBEDDING_DIMENSION };


function getGenAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Embed a single text string.
 * Returns a 768-dimensional float array.
 */
export async function embedText(text: string): Promise<number[]> {
  const genAI = getGenAI();

  const result = await genAI.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
  });

  const values = result.embeddings?.[0]?.values;
  if (!values || values.length === 0) {
    throw new Error("Gemini returned empty embedding");
  }

  return values;
}

/**
 * Embed a batch of texts with a small delay between requests
 * to avoid hitting rate limits.
 */
export async function embedBatch(
  texts: string[],
  delayMs = 100
): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (let i = 0; i < texts.length; i++) {
    const embedding = await embedText(texts[i]);
    embeddings.push(embedding);

    // Small delay to avoid rate limiting
    if (i < texts.length - 1 && delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return embeddings;
}
