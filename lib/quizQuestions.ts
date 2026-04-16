// lib/quizQuestions.ts

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "bank-urgency-text",
    question:
      "You receive a text saying your bank account is locked and you must click a link within 10 minutes.",
    options: [
      "It mentions your bank",
      "It creates urgency and asks you to click a link",
      "It was sent via text message",
      "It uses simple language",
    ],
    correctAnswer: "It creates urgency and asks you to click a link",
    explanation:
      "Scammers create urgency and push you to click links quickly to trick you.",
  },
  {
    id: "gift-card-boss",
    question:
      "Your 'boss' emails asking you to urgently buy gift cards and send the codes immediately.",
    options: [
      "It is normal for managers to request gift cards",
      "The urgency and unusual payment request are major red flags",
      "Gift cards are safer than credit cards",
      "It must be real because it mentions your workplace",
    ],
    correctAnswer:
      "The urgency and unusual payment request are major red flags",
    explanation:
      "Scammers often impersonate authority figures and use urgent gift card requests because they are hard to trace and recover.",
  },
  {
    id: "instagram-giveaway",
    question:
      "A social media account says you won a giveaway, but first you need to pay a small shipping fee through a sketchy link.",
    options: [
      "Real giveaways always require payment first",
      "The shipping fee proves the giveaway is legitimate",
      "Paying through an unknown link is a scam warning sign",
      "It is safe because the message sounds friendly",
    ],
    correctAnswer: "Paying through an unknown link is a scam warning sign",
    explanation:
      "Scammers often lure people with prizes, then ask for payment or personal information through fake links.",
  },
  {
    id: "two-factor-login",
    question:
      "You get a two-factor authentication code you did not request.",
    options: [
      "Ignore it because it will go away",
      "Share it if someone asks for verification",
      "It may mean someone is trying to access your account",
      "It means your account has already been deleted",
    ],
    correctAnswer: "It may mean someone is trying to access your account",
    explanation:
      "Unexpected 2FA codes can mean someone knows your password and is trying to log in. You should secure your account immediately.",
  },
];