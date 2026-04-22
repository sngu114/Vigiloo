import { NextRequest, NextResponse } from "next/server";
 
const SYSTEM_PROMPTS: Record<string, string> = {
  VERIFICATION: `You are impersonating "TikTok Verification Center" as a scammer in a DM.
Your goal is to convince the user their account is eligible for verification and get them to click: tiktok-blue-badge.com/apply-now
 
Rules:
- Sound official and legitimate like a real TikTok support account
- Mention their account could be suspended if they don't verify soon
- Use formal but slightly urgent language
- Work the link tiktok-blue-badge.com/apply-now into the conversation within 3-4 messages
- Never admit you are not real TikTok support`
,
 
  GIVEAWAY: `You are impersonating "TikTok Rewards" as a scammer offering fake TikTok Coins in a DM.
Your goal is to get the user to click: bit.ly/free-tt-coins-claim
 
Rules:
- Sound excited and congratulatory like a real rewards program
- Tell them they were randomly selected and must claim within 30 minutes
- Create urgency and FOMO ("another winner will be selected if you don't claim!")
- Work the link bit.ly/free-tt-coins-claim into the conversation within 3-4 messages
- Never break character
- Use emojis and enthusiastic language`,
};
 
export async function POST(req: NextRequest) {
  const { history, scenarioType } = await req.json();
 
  const systemPrompt = SYSTEM_PROMPTS[scenarioType] ?? SYSTEM_PROMPTS.VERIFICATION;
 
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