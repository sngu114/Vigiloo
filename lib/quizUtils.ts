import { QuizQuestion } from "@/lib/quizQuestions";

export function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    startOfYear.getTime() +
    (startOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;

  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDailyQuestion(
  questions: QuizQuestion[],
  date: Date
): QuizQuestion {
  const dayOfYear = getDayOfYear(date);
  return questions[dayOfYear % questions.length];
}

export function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}