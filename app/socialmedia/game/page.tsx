"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 2. Define the Game Tile Type
interface GameTile {
  id: string;
  content: string;
  type: 'term' | 'def';
  pairId: string;
}

export default function MatchingGame() {
  const [loading, setLoading] = useState(true);
  const [tiles, setTiles] = useState<GameTile[]>([]);

  // 3. Fetch and Shuffle Logic
  useEffect(() => {
    async function initGame() {
      setLoading(true);
      
      // Fetch a pool of 40 cards so the game variety is high
      const { data, error } = await supabase
        .from('flashcards')
        .select('term, definition')
        .limit(40);

      if (data && data.length > 0) {
        // Pick 6 random items from the 40 fetched
        const selectedCards = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);

        // Create 12 tiles (6 terms + 6 definitions)
        const gameTiles: GameTile[] = [
          ...selectedCards.map(item => ({
            id: `term-${item.term}`,
            content: item.term,
            type: 'term' as const,
            pairId: item.term
          })),
          ...selectedCards.map(item => ({
            id: `def-${item.term}`,
            content: item.definition,
            type: 'def' as const,
            pairId: item.term
          }))
        ];

        // Shuffle the final 12 tiles together
        setTiles(gameTiles.sort(() => Math.random() - 0.5));
      } else if (error) {
        console.error("Error loading game data:", error);
      }
      
      setLoading(false);
    }

    initGame();
  }, []);

  return (
    <div 
      className="min-h-screen bg-transparent font-sans antialiased" 
      style={{ color: "var(--foreground)" }}
    >
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* Breadcrumb Header */}
        <div className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
          Practice / <span className="text-[#7042F4]">Matching Game</span>
        </div>

        <h1 className="mb-8 text-5xl font-black leading-tight">Terminology Match</h1>
        
        {/* Game Stats Bar */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-lg font-medium text-gray-500" style={{ color: "var(--muted)" }}>
            Match each **Cyber Term** to its correct **Definition**. 
            A correct match will make the tiles disappear.
          </p>
          <div className="bg-white border border-gray-200 px-6 py-3 rounded-2xl shadow-sm font-bold text-[#7042F4]">
            Tiles to Match: {tiles.length}
          </div>
        </div>

        {/* The Game Board */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042F4] mb-4"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Shuffling Deck...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tiles.map((tile) => (
              <div
                key={tile.id}
                className={`
                  min-h-[160px] p-6 rounded-[2rem] border-2 transition-all flex items-center justify-center text-center cursor-pointer shadow-sm
                  ${tile.type === 'term' 
                    ? 'bg-white border-gray-100 text-gray-900 font-black text-xl' 
                    : 'bg-gray-50 border-dashed border-gray-200 text-gray-600 text-sm font-medium'}
                  hover:border-[#7042F4] hover:shadow-md hover:scale-[1.02] active:scale-95
                `}
              >
                {tile.content}
              </div>
            ))}
          </div>
        )}

        {/* Go Back Link */}
        <div className="mt-12 text-center">
          <a href="/socialmedia" className="text-gray-400 font-bold hover:text-[#7042F4] transition-colors text-sm uppercase tracking-widest">
            ← Back to Practice Hub
          </a>
        </div>
      </main>
    </div>
  );
}