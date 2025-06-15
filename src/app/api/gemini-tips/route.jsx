import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  const { query } = await req.json();
  if (!query) return new Response("Missing query", { status: 400 });

  const prompt = `Provide 5 concise health tips someone should know about "${query}". Include safe advice and cite reputable sources.`;
//AetherCare/src/app/api/gemini-tips
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return new Response(JSON.stringify({ tips: res.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("AI generation failed", { status: 500 });
  }
}
