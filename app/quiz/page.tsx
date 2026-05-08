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
  const [questionOffset, setQuestionOffset] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .order("id", { ascending: true });

        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          setQuestions([
            {
              id: 1,
              question:
                "You receive an email saying your Netflix account was suspended and you must log in immediately through a provided link.",
              option_a: "Streaming services always suspend accounts by email",
              option_b: "The urgent login request and suspicious link are red flags",
              option_c: "It must be real because it mentions Netflix",
              option_d: "Emails from companies are always trustworthy",
              correct_answer: "The urgent login request and suspicious link are red flags",
              explanation:
                "Scammers often use fake account suspension warnings and urgent login links to pressure users into giving away their credentials.",
            },
            {
              id: 2,
              question:
                "A text message says you won a free iPhone and asks you to click a link.",
              option_a: "Free giveaways are always real",
              option_b: "The suspicious link and prize offer are phishing red flags",
              option_c: "It must be safe because it mentions Apple",
              option_d: "Text messages cannot be scams",
              correct_answer:
                "The suspicious link and prize offer are phishing red flags",
              explanation:
                "Scammers often use fake prizes and suspicious links to steal personal information.",
            },
            
            {
              id: 3,
              question:
                "Someone on TikTok promises fast money if you send them your login code.",
              option_a: "Sharing login codes is safe with influencers",
              option_b: "Login codes should never be shared online",
              option_c: "TikTok creators always help followers make money",
              option_d: "Codes are only temporary so they are harmless",
              correct_answer:
                "Login codes should never be shared online",
              explanation:
                "Verification and login codes can give scammers access to your account.",
            },
          ]);
        }
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  const today = new Date();

  const dailyQuestion = useMemo(() => {
    if (questions.length === 0) return null;
    const index = questions.length > 0
    ? (Math.floor(today.getTime() / (1000 * 60 * 60 * 24)) + questionOffset) % questions.length
    : 0;
    const q = questions[index];
    return {
      id: q.id,
      question: q.question,
      options: [q.option_a, q.option_b, q.option_c, q.option_d],
      correctAnswer: q.correct_answer,
      explanation: q.explanation,
    };
  }, [questions, questionOffset]);

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
           
          {submitted && !isCorrect && (
            <button
              onClick={() => {
                setQuestionOffset((prev) => prev + 1);
                setSelected("");
                setSubmitted(false);
              }}
             className="mt-4 w-full cursor-pointer rounded-2xl bg-[#7042F4] py-4 text-lg font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98]"
            >
             Practice Another Question
            </button>
          )}

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