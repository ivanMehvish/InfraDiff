import { GoogleGenAI } from "@google/genai";

// API key is read automatically from GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function explainImpact(input: {
  resource: string;
  action: string;
  risk: string;
  downtime: string;
  reason: string;
}): Promise<string> {
  const prompt = `
You are a senior cloud engineer.

Explain the following infrastructure change in plain English.
Do NOT invent facts. Be concise and practical.

Details:
- Resource: ${input.resource}
- Action: ${input.action}
- Risk level: ${input.risk}
- Downtime: ${input.downtime}
- Reason: ${input.reason}

Respond using this format:
1) What is changing
2) Why it is risky
3) Recommendation to reduce risk
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text || "";
}
