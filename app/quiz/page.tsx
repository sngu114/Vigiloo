"use client";
import { useState } from "react";

export default function QuizPage() {
  const [selected, setSelected] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const correct = "B";

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  const isCorrect = selected === correct;

  return (
    <main className="min-h-screen px-6 py-12 bg-transparent font-sans antialiased">
      <div className="mx-auto max-w-2xl relative z-10">
        <h1 className="text-5xl font-black tracking-tight text-[#7042F4] mb-2">
          Daily <span className="text-foreground">Quiz</span>
        </h1>
        <p className="mb-8 text-xl font-medium text-muted">
          Can you spot today's scam?
        </p>

        <div 
          className="rounded-[40px] p-8 shadow-2xl border backdrop-blur-md bg-white/5 dark:bg-gray-900/40" 
          style={{ borderColor: 'var(--card-border)' }}
        >
          <h2 className="text-2xl font-extrabold mb-8 leading-tight text-foreground">
            You receive a text saying your bank account is locked and you must click a link within 10 minutes.
          </h2>

          <div className="space-y-4">
            {[
              { id: "A", text: "It mentions your bank" },
              { id: "B", text: "It creates urgency and asks you to click a link" },
              { id: "C", text: "It was sent via text message" },
              { id: "D", text: "It uses simple language" },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => { setSelected(option.id); setSubmitted(false); }}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 font-medium cursor-pointer ${
                  selected === option.id
                    ? "border-[#7042F4] bg-[#7042F4]/10 text-foreground"
                    : "border-transparent bg-white/5 hover:border-[#7042F4]/50 text-foreground"
                }`}
                style={{
                  borderColor: selected === option.id ? '#7042F4' : 'var(--card-border)',
                }}
              >
                <span className="font-black mr-3 text-[#7042F4]">{option.id}.</span>
                {option.text}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-[#0F172A] dark:bg-[#7042F4] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all active:scale-[0.98] shadow-xl cursor-pointer"
          >
            Check Answer
          </button>

          {submitted && (
            <div className={`mt-8 p-6 rounded-2xl border backdrop-blur-sm ${
              isCorrect
                ? "bg-green-500/10 border-green-500/50 text-green-400"
                : "bg-red-500/10 border-red-500/50 text-red-400"
            }`}>
              <p className="font-black text-xl flex items-center gap-2">
                {isCorrect ? "✅ Correct!" : "❌ Not quite."}
              </p>
              <p className="mt-2 font-medium leading-relaxed">
                The correct answer is <span className="underline decoration-2">B</span>. Scammers create urgency and push you to click links quickly to trick you.
              </p>
            </div>
          )}
        </div>

        {submitted && (
          <p className="text-center mt-8 font-bold text-muted tracking-wide">
            COME BACK TOMORROW FOR A NEW CHALLENGE 👀
          </p>
        )}
      </div>
    </main>
  );
}