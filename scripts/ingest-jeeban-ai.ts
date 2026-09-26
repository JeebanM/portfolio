// scripts/ingest-jeeban-ai.ts
// Run once to index all jeeban_ai/ markdown files into Qdrant Cloud
//
// Usage:
//   npx tsx scripts/ingest-jeeban-ai.ts
//
// Requirements: GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY, QDRANT_COLLECTION
// set in .env.local (loaded below via dotenv).

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Load .env.local manually (tsx doesn't load it automatically)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const envPath = path.join(projectRoot, ".env.local");

// Parse .env.local
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=").trim();
    if (key && value) {
      process.env[key.trim()] = value;
    }
  }
  console.log("✅ Loaded .env.local");
} else {
  console.warn("⚠️  .env.local not found — using existing env vars");
}

import { chunkMarkdown } from "../src/lib/chunking.js";
import { embedText } from "../src/lib/embeddings.js";
import { ensureCollection, upsertPoints, deleteCollection } from "../src/lib/qdrant.js";

const JEEBAN_AI_DIR = path.join(projectRoot, "jeeban_ai");
const BATCH_SIZE = 5; // chunks to embed before upserting
const DELAY_BETWEEN_EMBEDS_MS = 200; // stay within Gemini rate limits

/**
 * Recursively find all .md files under a directory.
 */
function findMarkdownFiles(dir: string, base: string = dir): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath, base));
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Convert absolute file path to relative source key.
 * e.g. "E:/portfolio/jeeban_ai/education/class_10.md"
 *   → "education/class_10"
 */
function toSourceKey(absolutePath: string): string {
  const relative = path.relative(JEEBAN_AI_DIR, absolutePath);
  return relative.replace(/\\/g, "/").replace(/\.md$/, "");
}

/**
 * Generate a stable numeric ID for a chunk based on source + index.
 * Qdrant accepts integer IDs.
 */
function chunkId(source: string, chunkIndex: number): number {
  let hash = 0;
  const str = `${source}__${chunkIndex}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // convert to 32-bit int
  }
  return Math.abs(hash);
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("\n🚀 Jeeban AI — Knowledge Base Ingestion");
  console.log("=========================================\n");

  // Validate env
  const required = ["GEMINI_API_KEY", "QDRANT_URL", "QDRANT_API_KEY", "QDRANT_COLLECTION"];
  for (const key of required) {
    if (!process.env[key]) {
      console.error(`❌ Missing environment variable: ${key}`);
      process.exit(1);
    }
  }

  console.log(`📁 Knowledge base: ${JEEBAN_AI_DIR}`);
  console.log(`🔗 Qdrant: ${process.env.QDRANT_URL}`);
  console.log(`📦 Collection: ${process.env.QDRANT_COLLECTION}\n`);

  // Step 1: Delete existing collection (handles dimension mismatch)
  console.log("1️⃣  Deleting old collection (if exists)...");
  await deleteCollection();

  // Step 2: Create fresh collection with correct dimensions
  console.log("2️⃣  Creating collection with correct dimensions...");
  await ensureCollection();

  // Step 3: Find all markdown files
  console.log("3️⃣  Scanning jeeban_ai/ for markdown files...");
  const mdFiles = findMarkdownFiles(JEEBAN_AI_DIR);
  console.log(`   Found ${mdFiles.length} files\n`);

  // Step 4: Chunk + embed + upsert
  let totalChunks = 0;
  let totalEmbedded = 0;

  for (const filePath of mdFiles) {
    const source = toSourceKey(filePath);
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkMarkdown(rawContent, source);

    console.log(`📄 ${source} → ${chunks.length} chunk(s)`);

    // Process in batches
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      // Skip empty chunks
      if (!chunk.text.trim()) continue;

      try {
        const vector = await embedText(chunk.text);

        const point = {
          id: chunkId(source, chunk.chunkIndex),
          vector,
          payload: {
            text: chunk.text,
            source: chunk.source,
            category: chunk.category,
            title: chunk.title,
            chunkIndex: chunk.chunkIndex,
          },
        };

        await upsertPoints([point]);
        totalEmbedded++;
        process.stdout.write(`   Embedded chunk ${i + 1}/${chunks.length}\r`);

        // Rate limit delay
        if (i < chunks.length - 1) {
          await sleep(DELAY_BETWEEN_EMBEDS_MS);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`\n   ❌ Failed chunk ${i + 1} of ${source}: ${message}`);
      }

      totalChunks++;
    }

    console.log(`   ✅ Done (${chunks.length} chunk(s) indexed)`);
  }

  console.log("\n=========================================");
  console.log(`✅ Ingestion complete!`);
  console.log(`   Files processed : ${mdFiles.length}`);
  console.log(`   Total chunks    : ${totalChunks}`);
  console.log(`   Vectors stored  : ${totalEmbedded}`);
  console.log(`   Collection      : ${process.env.QDRANT_COLLECTION}`);
  console.log("\nYour chatbot is now RAG-enabled. 🎉\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
