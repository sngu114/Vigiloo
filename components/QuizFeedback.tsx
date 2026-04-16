type QuizFeedbackProps = {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
};

/**
 * Reusable feedback panel shown after quiz submission.
 */
export default function QuizFeedback({
  isCorrect,
  correctAnswer,
  explanation,
}: QuizFeedbackProps) {
  return (
    <div
      className={`mt-8 rounded-2xl border p-6 backdrop-blur-sm ${
        isCorrect
          ? "border-green-500/50 bg-green-500/10 text-green-400"
          : "border-red-500/50 bg-red-500/10 text-red-400"
      }`}
    >
      <p className="flex items-center gap-2 text-xl font-black">
        {isCorrect ? "✅ Correct!" : "❌ Not quite."}
      </p>

      <p className="mt-2 font-medium leading-relaxed">
        The correct answer is{" "}
        <span className="underline decoration-2">{correctAnswer}</span>.{" "}
        {explanation}
      </p>
    </div>
  );
}