"use client";

import { useState } from "react";
import QuizOption from "@/components/QuizOption";
import QuizFeedback from "@/components/QuizFeedback";

type QuizOptionItem = {
  id: string;
  text: string;
};

const question =
  "You receive a text saying your bank account is locked and you must click a link within 10 minutes.";

const options: QuizOptionItem[] = [
  { id: "A", text: "It mentions your bank" },
  { id: "B", text: "It creates urgency and asks you to click a link" },
  { id: "C", text: "It was sent via text message" },
  { id: "D", text: "It uses simple language" },
];

const correctAnswer = "B";

const explanation =
  "Scammers create urgency and push you to click links quickly to trick you.";

export default function QuizPage() {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (optionId: string) => {
    setSelected(optionId);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selected) {
      return;
    }

    setSubmitted(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <main className="min-h-screen bg-transparent px-6 py-12 font-sans antialiased">
      <div className="relative z-10 mx-auto max-w-2xl">
        <h1 className="mb-2 text-5xl font-black tracking-tight text-[#7042F4]">
          Daily <span className="text-foreground">Quiz</span>
        </h1>

        <p className="mb-8 text-xl font-medium text-muted">
          Can you spot today&apos;s scam?
        </p>

        <div
          className="rounded-[40px] border bg-white/5 p-8 shadow-2xl backdrop-blur-md dark:bg-gray-900/40"
          style={{ borderColor: "var(--card-border)" }}
        >
          <h2 className="mb-8 text-2xl font-extrabold leading-tight text-foreground">
            {question}
          </h2>

          <div className="space-y-4">
            {options.map((option) => (
              <QuizOption
                key={option.id}
                id={option.id}
                text={option.text}
                isSelected={selected === option.id}
                onSelect={handleSelectOption}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full cursor-pointer rounded-2xl bg-[#0F172A] py-4 text-lg font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98] dark:bg-[#7042F4]"
          >
            Check Answer
          </button>

          {submitted && (
            <QuizFeedback
              isCorrect={isCorrect}
              correctAnswer={correctAnswer}
              explanation={explanation}
            />
          )}
        </div>

        {submitted && (
          <p className="mt-8 text-center font-bold tracking-wide text-muted">
            COME BACK TOMORROW FOR A NEW CHALLENGE 👀
          </p>
        )}
      </div>
    </main>
  );
}