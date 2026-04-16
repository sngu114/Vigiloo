"use client";

import { useState } from "react";
import PracticeCard from "@/components/PracticeCard";
import Flashcard from "@/components/Flashcard";

type FlashcardItem = {
  term: string;
  definition: string;
};

type PlatformItem = {
  name: string;
  imageUrl: string;
  description: string;
  href: string;
};

const placeholderFlashcards: FlashcardItem[] = [
  {
    term: "Phishing",
    definition:
      "A scam where attackers send fake emails or messages to trick you into revealing sensitive info.",
  },
  {
    term: "2FA",
    definition:
      "Two-Factor Authentication: Adding a second layer of security beyond just a password.",
  },
  {
    term: "Social Engineering",
    definition:
      "Manipulating people into giving up confidential information through psychological trickery.",
  },
];

const platforms: PlatformItem[] = [
  {
    name: "Instagram",
    imageUrl: "/instagram.png",
    description:
      "Practice avoiding common influencer scams and fake giveaway alerts.",
    href: "/socialmedia/instagram",
  },
  {
    name: "Snapchat",
    imageUrl: "/snapchat.png",
    description:
      "Identify vanishing message scams and unauthorized login attempts.",
    href: "/socialmedia/snapchat",
  },
  {
    name: "TikTok",
    imageUrl: "/tiktok.png",
    description:
      "Identify fake investment schemes and fraudulent brand partnerships.",
    href: "/socialmedia/tiktok",
  },
];

/**
 * Social media practice hub page.
 * Displays practice platforms and interactive flashcards.
 */
export default function SocialMediaHub() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlipCard = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % placeholderFlashcards.length);
  };

  const activeFlashcard = placeholderFlashcards[currentCard];

  return (
    <div
      className="min-h-screen bg-transparent font-sans antialiased"
      style={{ color: "var(--foreground)" }}
    >
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
          Dashboard / <span className="text-[#7042F4]">Practice</span>
        </div>

        <h1 className="mb-4 text-5xl font-black" style={{ color: "var(--foreground)" }}>
          Social Media Practice
        </h1>

        <p
          className="mb-12 max-w-2xl text-lg font-medium"
          style={{ color: "var(--muted)" }}
        >
          Select a platform to practice identifying and avoiding common social
          media scams in a safe, simulated environment.
        </p>

        <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
          {platforms.map((platform) => (
            <PracticeCard
              key={platform.name}
              name={platform.name}
              imageUrl={platform.imageUrl}
              description={platform.description}
              href={platform.href}
            />
          ))}
        </div>

        <section className="border-t pt-20" style={{ borderColor: "var(--card-border)" }}>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-black" style={{ color: "var(--foreground)" }}>
              Master the Terms
            </h2>

            <p className="font-medium" style={{ color: "var(--muted)" }}>
              Quick-fire flashcards to learn essential cybersecurity jargon.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Flashcard
              term={activeFlashcard.term}
              definition={activeFlashcard.definition}
              isFlipped={isFlipped}
              onFlip={handleFlipCard}
            />

            <button
              onClick={handleNextCard}
              className="flex cursor-pointer items-center gap-3 rounded-2xl bg-[#7042F4] px-12 py-5 text-lg font-black text-white shadow-xl shadow-[#7042F4]/20 transition-all hover:bg-[#5B34E5]"
            >
              Next Flashcard →
            </button>
          </div>
        </section>
      </main>
      
    </div>
  );
}