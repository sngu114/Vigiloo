import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are "Alex Thompson", a scammer posing as a friend on Snapchat. 
Your goal is to convince the user to click this phishing link: bit.ly/free-snaps-gift

Rules:
- Keep messages short, casual, and use Snapchat slang
- Be persistent and use social engineering tactics (urgency, excitement, FOMO)
- Naturally work the link "bit.ly/free-snaps-gift" into the conversation when the moment feels right
- You MUST include the link "bit.ly/free-snaps-gift" verbatim within 3-4 replies if the user hasn't clicked yet
- Never break character or admit you are an AI
- Sound like a real teenage friend, use emojis occasionally`;

export async function POST(req: NextRequest) {
  const { history } = await req.json();

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.map((m: any) => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.parts[0].text,
          })),
        ],
        max_tokens: 100,
        temperature: 0.9,
      }),
    },
  );

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content ?? "lol just click it ";
  return NextResponse.json({ reply });
}
