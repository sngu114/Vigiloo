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
    <main className="min-h-screen px-6 py-12" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-[#7042F4] mb-2">Daily Challenge</h1>
        <p className="mb-8" style={{ color: 'var(--muted)' }}>Can you spot today's scam?</p>

        <div className="rounded-2xl p-6 shadow-sm border" style={{ background: 'var(--card)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>
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
                className={`w-full text-left p-4 rounded-xl border transition ${
                  selected === option.id
                    ? "border-[#7042F4] bg-purple-50 dark:bg-[#7042F4]/10"
                    : "hover:border-[#7042F4]"
                }`}
                style={{
                  color: 'var(--foreground)',
                  borderColor: selected === option.id ? '#7042F4' : 'var(--card-border)',
                }}
              >
                <span className="font-semibold mr-2">{option.id}.</span>
                {option.text}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#7042F4] text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Check Answer
          </button>

          {submitted && (
            <div className={`mt-6 p-4 rounded-xl border ${
              isCorrect
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
            }`}>
              <p className="font-semibold">{isCorrect ? "Correct!" : "Not quite."}</p>
              <p className="mt-2 text-sm">
                The correct answer is <strong>B</strong>. Scammers create urgency and push you to click links quickly to trick you.
              </p>
            </div>
          )}
        </div>

        {submitted && (
          <p className="text-center mt-6" style={{ color: 'var(--muted)' }}>
            Come back tomorrow for a new challenge 👀
          </p>
        )}
      </div>
    </main>
  );
}