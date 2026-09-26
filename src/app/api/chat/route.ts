// app/api/chat/route.ts

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { AI_SYSTEM_PROMPT, FAQ_CACHE } from "@/lib/portfolioData";
import { ragAnswer } from "@/lib/rag";

function normalizeQuestion(q: string): string {
  return q.toLowerCase().trim().replace(/[?!.,]/g, "");
}

function getCachedResponse(message: string): string | null {
  const normalized = normalizeQuestion(message);

  for (const [key, value] of Object.entries(FAQ_CACHE)) {
    if (normalized.includes(key)) {
      return value;
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Get API key from environment
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing");
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const { allowed } = rateLimit(ip, "chat", 10, 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    // Parse request
    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // ─── Step 1: FAQ Cache (fast path for common questions) ───────────────────
    const cached = getCachedResponse(message);
    if (cached) {
      return NextResponse.json({
        reply: cached,
        sources: [],
        cached: true,
        rag: false,
      });
    }

    // ─── Step 2: RAG — retrieve from jeeban_ai knowledge base ────────────────
    const qdrantConfigured =
      process.env.QDRANT_URL && process.env.QDRANT_API_KEY;

    if (qdrantConfigured) {
      try {
        const ragResult = await ragAnswer(message);
        return NextResponse.json(ragResult);
      } catch (ragErr: unknown) {
        // RAG failed — log and fall through to plain Gemini
        const ragMessage = ragErr instanceof Error ? ragErr.message : String(ragErr);
        console.warn("RAG retrieval failed, falling back to Gemini:", ragMessage);
      }
    }

    // ─── Step 3: Fallback — plain Gemini with system prompt ──────────────────
    const genAI = new GoogleGenAI({ apiKey });

    const result = await genAI.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
      config: {
        systemInstruction: AI_SYSTEM_PROMPT,
      },
    });

    const reply = result.text ?? "";

    if (!reply) {
      console.error("Gemini returned an empty response");
      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply,
      sources: [],
      cached: false,
      rag: false,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = (err as { status?: number })?.status;

    console.error("========== CHAT API ERROR ==========");
    console.error("Message:", message);
    console.error("Status:", status);
    console.error("=====================================");

    return NextResponse.json(
      { error: message || "Unknown error" },
      { status: 500 }
    );
  }
}
