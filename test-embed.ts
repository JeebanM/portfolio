import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.embedContent({
      model: "text-embedding-004",
      contents: "Hello world",
    });
    console.log("Success! Dimensions:", response.embeddings?.[0]?.values?.length);
  } catch (e) {
    console.error("Error:", e);
  }
}

run();
