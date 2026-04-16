"use client";

import { useMemo, useState } from "react";
import QuizOption from "@/components/QuizOption";
import QuizFeedback from "@/components/QuizFeedback";
import { quizQuestions } from "@/lib/quizQuestions";
import { getDailyQuestion, shuffleArray } from "@/lib/quizUtils";

const optionLabels = ["A", "B", "C", "D"];

/**
 * Daily quiz page.
 * Displays one rotating quiz question per day with randomized answer order.
 */
export default function QuizPage() {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const dailyQuestion = getDailyQuestion(quizQuestions, today);

  const shuffledOptions = useMemo(() => {
    return shuffleArray(dailyQuestion.options);
  }, [dailyQuestion.id]);

  const handleSelectOption = (optionText: string) => {
    setSelected(optionText);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selected) {
      return;
    }

    setSubmitted(true);
  };

  const isCorrect = selected === dailyQuestion.correctAnswer;

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
            {dailyQuestion.question}
          </h2>

          <div className="space-y-4">
            {shuffledOptions.map((optionText, index) => (
              <QuizOption
                key={optionText}
                label={optionLabels[index]}
                text={optionText}
                isSelected={selected === optionText}
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
              correctAnswer={dailyQuestion.correctAnswer}
              explanation={dailyQuestion.explanation}
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