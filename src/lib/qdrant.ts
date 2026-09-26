// src/lib/qdrant.ts
// Qdrant Cloud REST client — no extra npm package needed, uses fetch

import { EMBEDDING_DIMENSION } from "./embeddings";

interface QdrantPoint {
  id: string | number;
  vector: number[];
  payload: Record<string, unknown>;
}

interface QdrantSearchResult {
  id: string | number;
  score: number;
  payload: Record<string, unknown>;
}

function getQdrantConfig() {
  const url = process.env.QDRANT_URL?.trim();
  const apiKey = process.env.QDRANT_API_KEY?.trim();
  const collection = process.env.QDRANT_COLLECTION?.trim() ?? "jeeban_ai";

  if (!url) throw new Error("QDRANT_URL is not set");
  if (!apiKey) throw new Error("QDRANT_API_KEY is not set");

  return { url, apiKey, collection };
}

function qdrantHeaders(apiKey: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    "api-key": apiKey,
  };
}

/**
 * Create the Qdrant collection if it doesn't already exist.
 * Uses cosine distance for semantic similarity.
 */
export async function ensureCollection(): Promise<void> {
  const { url, apiKey, collection } = getQdrantConfig();

  // Check if collection exists
  const checkRes = await fetch(`${url}/collections/${collection}`, {
    headers: qdrantHeaders(apiKey),
  });

  if (checkRes.ok) {
    console.log(`Collection "${collection}" already exists.`);
    return;
  }

  // Create it
  const createRes = await fetch(`${url}/collections/${collection}`, {
    method: "PUT",
    headers: qdrantHeaders(apiKey),
    body: JSON.stringify({
      vectors: {
        size: EMBEDDING_DIMENSION,
        distance: "Cosine",
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Failed to create Qdrant collection: ${err}`);
  }

  console.log(`Collection "${collection}" created successfully.`);
}

/**
 * Upsert a batch of points into Qdrant.
 */
export async function upsertPoints(points: QdrantPoint[]): Promise<void> {
  const { url, apiKey, collection } = getQdrantConfig();

  const res = await fetch(`${url}/collections/${collection}/points`, {
    method: "PUT",
    headers: qdrantHeaders(apiKey),
    body: JSON.stringify({ points }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to upsert points: ${err}`);
  }
}

/**
 * Search for the most semantically similar chunks to a query vector.
 */
export async function searchPoints(
  queryVector: number[],
  topK = 5
): Promise<QdrantSearchResult[]> {
  const { url, apiKey, collection } = getQdrantConfig();

  const res = await fetch(`${url}/collections/${collection}/points/search`, {
    method: "POST",
    headers: qdrantHeaders(apiKey),
    body: JSON.stringify({
      vector: queryVector,
      limit: topK,
      with_payload: true,
      score_threshold: 0.4, // ignore low-relevance results
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Qdrant search failed: ${err}`);
  }

  const data = await res.json();
  return data.result as QdrantSearchResult[];
}

/**
 * Delete all points in the collection (useful for re-ingestion).
 */
export async function clearCollection(): Promise<void> {
  const { url, apiKey, collection } = getQdrantConfig();

  const res = await fetch(
    `${url}/collections/${collection}/points/delete`,
    {
      method: "POST",
      headers: qdrantHeaders(apiKey),
      body: JSON.stringify({ filter: {} }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to clear collection: ${err}`);
  }

  console.log(`Collection "${collection}" cleared.`);
}

/**
 * Fully delete the collection (used when dimension changes).
 */
export async function deleteCollection(): Promise<void> {
  const { url, apiKey, collection } = getQdrantConfig();

  const res = await fetch(`${url}/collections/${collection}`, {
    method: "DELETE",
    headers: qdrantHeaders(apiKey),
  });

  if (!res.ok && res.status !== 404) {
    const err = await res.text();
    throw new Error(`Failed to delete collection: ${err}`);
  }

  console.log(`Collection "${collection}" deleted.`);
}
