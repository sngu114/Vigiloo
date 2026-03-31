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
    <main className="min-h-screen bg-[#FDFDFF] px-6 py-12">
      <div className="mx-auto max-w-2xl">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#7042F4] mb-2">
          Daily Challenge
        </h1>
        <p className="text-gray-600 mb-8">
          Can you spot today’s scam?
        </p>

        {/* Card */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            You receive a text saying your bank account is locked and you must click a link within 10 minutes.
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {[
              { id: "A", text: "It mentions your bank" },
              { id: "B", text: "It creates urgency and asks you to click a link" },
              { id: "C", text: "It was sent via text message" },
              { id: "D", text: "It uses simple language" },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelected(option.id);
                  setSubmitted(false);
                }}
                className={`w-full text-left p-4 rounded-xl border transition text-slate-800 ${
                  selected === option.id
                    ? "border-[#7042F4] bg-purple-50"
                    : "border-gray-200 hover:border-[#7042F4]"
                }`}
              >
                <span className="font-semibold mr-2">{option.id}.</span>
                {option.text}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#7042F4] text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Check Answer
          </button>

          {/* Feedback */}
          {submitted && (
            <div
              className={`mt-6 p-4 rounded-xl border ${
                isCorrect
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              <p className="font-semibold">
                {isCorrect ? "Correct!" : "Not quite."}
              </p>
              <p className="mt-2 text-sm">
                The correct answer is <strong>B</strong>. Scammers create urgency
                and push you to click links quickly to trick you.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        {submitted && (
          <p className="text-center text-gray-500 mt-6">
            Come back tomorrow for a new challenge 👀
          </p>
        )}

      </div>
    </main>
  );
}