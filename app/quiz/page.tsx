"use client";
import { useEffect, useMemo, useState } from "react";
import QuizOption from "@/components/QuizOption";
import QuizFeedback from "@/components/QuizFeedback";
import { getDailyQuestion, shuffleArray } from "@/lib/quizUtils";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const optionLabels = ["A", "B", "C", "D"];

export default function QuizPage() {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .order("id", { ascending: true });

      if (data && data.length > 0) {
        setQuestions(data);
      }
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  const today = new Date();

  const dailyQuestion = useMemo(() => {
    if (questions.length === 0) return null;
    const index = questions.length > 0
      ? Math.floor(today.getTime() / (1000 * 60 * 60 * 24)) % questions.length
      : 0;
    const q = questions[index];
    return {
      id: q.id,
      question: q.question,
      options: [q.option_a, q.option_b, q.option_c, q.option_d],
      correctAnswer: q.correct_answer,
      explanation: q.explanation,
    };
  }, [questions]);

  const shuffledOptions = useMemo(() => {
    if (!dailyQuestion) return [];
    return shuffleArray(dailyQuestion.options);
  }, [dailyQuestion?.id]);

  const handleSelectOption = (optionText: string) => {
    setSelected(optionText);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-transparent px-6 py-12 font-sans antialiased">
        <div className="relative z-10 mx-auto max-w-2xl">
          <div className="h-64 animate-pulse rounded-[40px] bg-white/5" />
        </div>
      </main>
    );
  }

  if (!dailyQuestion) {
    return (
      <main className="min-h-screen bg-transparent px-6 py-12 font-sans antialiased">
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="text-center font-bold text-red-400">Could not load quiz. Please try again later.</p>
        </div>
      </main>
    );
  }

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