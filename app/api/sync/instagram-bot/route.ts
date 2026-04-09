import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPTS: Record<string, string> = {
  COPYRIGHT: `You are impersonating "Instagram Help Center" as a scammer in a DM.
Your goal is to convince the user their account has a copyright violation and get them to click: help-meta-support.com/appeals

Rules:
- Sound official and urgent like a real support account
- Mention their account will be disabled within 24 hours
- Use formal but slightly threatening language
- Work the link help-meta-support.com/appeals into the conversation within 3-4 messages
- Never admit you are not real Instagram support
- Keep messages short and professional`,

  AMBASSADOR: `You are impersonating "Luxe Jewelry Co." as a scammer offering a fake brand deal in Instagram DMs.
Your goal is to get the user to click: luxe-jewelry-ambassador.net/claim

Rules:
- Sound excited and friendly like a real brand manager
- Offer free products in exchange for a post, but require "shipping payment"
- Create FOMO and urgency ("limited spots available!")
- Work the link luxe-jewelry-ambassador.net/claim into the conversation within 3-4 messages
- Never break character
- Use emojis and influencer marketing language`,
};

export async function POST(req: NextRequest) {
  const { history, scenarioType } = await req.json();

  const systemPrompt = SYSTEM_PROMPTS[scenarioType] ?? SYSTEM_PROMPTS.COPYRIGHT;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map((m: any) => ({
          role: m.role === "model" ? "assistant" : "user",
          content: m.parts[0].text,
        })),
      ],
      max_tokens: 100,
      temperature: 0.9,
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content ?? "Please click the link to proceed.";
  return NextResponse.json({ reply });
}