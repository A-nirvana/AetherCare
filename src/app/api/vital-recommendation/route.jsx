import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI with your API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { bmi, temperature, bpm, spo2 } = await req.json();

    if (bmi === undefined || temperature === undefined || bpm === undefined || spo2 === undefined) {
      return new Response("Missing vital parameters", { status: 400 });
    }

    // Structured and clear prompt for Gemini
    const prompt = `
You are a health assistant AI. Based on the following vitals:
- BMI: ${bmi}
- Temperature: ${temperature}°F
- Heart Rate (BPM): ${bpm}
- SpO2: ${spo2}%

Give personalized, short health insights for each. Format your response as:

1. BMI: [Insight about BMI]
2. Temperature: [Insight about temperature]
3. BPM: [Insight about heart rate]
4. SpO2: [Insight about oxygen level]

Guidelines:
- No markdown or asterisks.
- No sources or external links.
- No bullet points.

`;

const result = await ai.models.generateContent({
    model: "gemini-2.0-flash", // ✅ fixed here
    contents: [{ parts: [{ text: prompt }] }],
  });

    const text = result.response.text();

    return new Response(JSON.stringify({ tips: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Gemini Vital Error:", err);
    return new Response("Failed to generate vital tips", { status: 500 });
  }
}
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function POST(req) {
//   const { query } = await req.json();
//   if (!query) return new Response("Missing query", { status: 400 });

//   const prompt = `Provide 5 concise health tips someone should know about "${query}". Include safe advice and cite reputable sources.`;
// //AetherCare/src/app/api/gemini-tips
//   try {
//     const res = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt,
//     });
//     return new Response(JSON.stringify({ tips: res.text }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error(err);
//     return new Response("AI generation failed", { status: 500 });
//   }
// }
