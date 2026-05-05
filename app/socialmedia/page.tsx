"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import PracticeCard from "@/components/PracticeCard";
import Flashcard from "@/components/Flashcard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

const platforms: PlatformItem[] = [
  {
    name: "Instagram",
    imageUrl: "/instagram.png",
    description: "Practice avoiding common influencer scams and fake giveaway alerts.",
    href: "/socialmedia/instagram",
  },
  {
    name: "Snapchat",
    imageUrl: "/snapchat.png",
    description: "Identify vanishing message scams and unauthorized login attempts.",
    href: "/socialmedia/snapchat",
  },
  {
    name: "TikTok",
    imageUrl: "/tiktok.png",
    description: "Identify fake investment schemes and fraudulent brand partnerships.",
    href: "/socialmedia/tiktok",
  },
];

export default function SocialMediaHub() {
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'term' | 'definition'>('term');

  useEffect(() => {
    async function fetchFlashcards() {
      const { data, error } = await supabase
        .from('flashcards')
        .select('term, definition');
      if (!error && data) {
        setFlashcards(data);
      }
      setLoading(false);
    }
    fetchFlashcards();
  }, []);

  const handleFlipCard = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNextCard = () => {
    if (flashcards.length === 0) return;
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handleModeToggle = (newMode: 'term' | 'definition') => {
    setMode(newMode);
    setIsFlipped(false);
  };

  const activeFlashcard = flashcards[currentCard];

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

        <p className="mb-12 max-w-2xl text-lg font-medium" style={{ color: "var(--muted)" }}>
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
            <p className="font-medium mb-6" style={{ color: "var(--muted)" }}>
              {loading ? "Fetching terms..." : "Quick-fire flashcards to learn essential cybersecurity jargon."}
            </p>

            {/* Mode Toggle */}
            {!loading && activeFlashcard && (
              <div className="inline-flex rounded-2xl border p-1" style={{ borderColor: "var(--card-border)", background: "var(--card)" }}>
                <button
                  onClick={() => handleModeToggle('term')}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    mode === 'term'
                      ? 'bg-[#7042F4] text-white shadow-md'
                      : 'text-gray-400 hover:text-[#7042F4]'
                  }`}
                >
                  Term → Definition
                </button>
                <button
                  onClick={() => handleModeToggle('definition')}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    mode === 'definition'
                      ? 'bg-[#7042F4] text-white shadow-md'
                      : 'text-gray-400 hover:text-[#7042F4]'
                  }`}
                >
                  Definition → Term
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7042F4]"></div>
              </div>
            ) : activeFlashcard ? (
              <>
                <Flashcard
                  term={mode === 'term' ? activeFlashcard.term : activeFlashcard.definition}
                  definition={mode === 'term' ? activeFlashcard.definition : activeFlashcard.term}
                  isFlipped={isFlipped}
                  onFlip={handleFlipCard}
                />

                <button
                  onClick={handleNextCard}
                  className="mt-8 flex cursor-pointer items-center gap-3 rounded-2xl bg-[#7042F4] px-12 py-5 text-lg font-black text-white shadow-xl shadow-[#7042F4]/20 transition-all hover:bg-[#5B34E5]"
                >
                  Next Flashcard →
                </button>
              </>
            ) : (
              <p className="text-gray-400">No flashcards available.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}