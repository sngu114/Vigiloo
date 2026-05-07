"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface GameTile {
  id: string;
  content: string;
  type: 'term' | 'def';
  pairId: string;
}

export default function MatchingGame() {
  const [loading, setLoading] = useState(true);
  const [tiles, setTiles] = useState<GameTile[]>([]);
  const [firstSelection, setFirstSelection] = useState<GameTile | null>(null);
  const [secondSelection, setSecondSelection] = useState<GameTile | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  
  // Stats States
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const initGame = async () => {
    setLoading(true);
    setMatchedIds([]);
    setFirstSelection(null);
    setSecondSelection(null);

    // Sync best streak from local storage
    const savedBest = localStorage.getItem("matching-best-streak");
    if (savedBest) setBestStreak(parseInt(savedBest));
    
    const { data } = await supabase.from('flashcards').select('term, definition').limit(40);
    
    if (data && data.length > 0) {
      const selectedCards = [...data].sort(() => Math.random() - 0.5).slice(0, 6);
      const gameTiles: GameTile[] = [
        ...selectedCards.map(item => ({
          id: `t-${item.term}`,
          content: item.term,
          type: 'term' as const,
          pairId: item.term.trim()
        })),
        ...selectedCards.map(item => ({
          id: `d-${item.term}`,
          content: item.definition,
          type: 'def' as const,
          pairId: item.term.trim()
        }))
      ];
      setTiles(gameTiles.sort(() => Math.random() - 0.5));
    }
    setLoading(false);
  };

  useEffect(() => { initGame(); }, []);

  const handleTileClick = (tile: GameTile) => {
    if (secondSelection || matchedIds.includes(tile.pairId)) return;

    // FIX: Deselect if clicking the same card twice
    if (firstSelection?.id === tile.id) {
      setFirstSelection(null);
      return;
    }

    if (!firstSelection) {
      setFirstSelection(tile);
      return;
    }

    setSecondSelection(tile);

    // Match logic
    if (firstSelection.pairId === tile.pairId && firstSelection.type !== tile.type) {
      setTimeout(() => {
        const newMatches = [...matchedIds, tile.pairId];
        setMatchedIds(newMatches);
        
        // Handle Win Condition
        if (newMatches.length === 6) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
            localStorage.setItem("matching-best-streak", newStreak.toString());
          }
        }
        
        setFirstSelection(null);
        setSecondSelection(null);
      }, 400); 
    } else {
      setTimeout(() => {
        setFirstSelection(null);
        setSecondSelection(null);
      }, 800);
    }
  };

  const isGameOver = tiles.length > 0 && matchedIds.length === 6;

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased" style={{ color: "var(--foreground)" }}>
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        
        <div className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
          Practice / <span className="text-[#7042F4]">Matching Game</span>
        </div>

        <h1 className="mb-4 text-5xl font-black uppercase" style={{ color: "var(--foreground)" }}>
          Terminology Match
        </h1>

        {isGameOver ? (
          /* --- Victory State with Leaderboard --- */
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-[3rem] border border-gray-100 shadow-xl text-center px-6 animate-in fade-in zoom-in duration-500">
            <div className="text-6xl mb-4">🔥</div>
            <h2 className="text-4xl font-black mb-2 text-gray-900 uppercase">Streak: {streak}</h2>
            <p className="text-gray-500 font-medium mb-8 tracking-widest text-xs">Personal Best: {bestStreak}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={initGame} className="rounded-2xl bg-[#7042F4] px-12 py-5 text-lg font-black text-white hover:bg-[#5B34E5] transition-all active:scale-95 shadow-lg shadow-[#7042F4]/20">
                NEXT ROUND
              </button>
            </div>

            {/* Global Styled Leaderboard */}
            <div className="w-full max-w-md border-t pt-10" style={{ borderColor: "var(--card-border)" }}>
                <span className="text-[10px] font-bold text-[#7042F4] tracking-[0.2em] uppercase mb-6 block">Global Top Streaks</span>
                <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center p-5 rounded-2xl bg-[#F5F3FF] border border-[#7042F4]/20">
                        <span className="font-bold text-gray-900">1. You</span>
                        <span className="font-black text-[#7042F4]">{bestStreak} Wins</span>
                    </div>
                    <div className="flex justify-between items-center p-5 rounded-2xl bg-white border border-gray-100 opacity-60">
                        <span className="font-bold text-gray-600">2. RootAdmin_X</span>
                        <span className="font-black text-gray-400">14 Wins</span>
                    </div>
                </div>
            </div>
          </div>
        ) : (
          /* --- Active Game State --- */
          <>
            <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="max-w-xl text-lg font-medium" style={{ color: "var(--muted)" }}>
                Current Streak: <span className="text-[#7042F4] font-black">{streak}</span>
              </p>
              <div className="bg-white border border-gray-200 px-6 py-3 rounded-2xl shadow-sm font-bold text-[#7042F4]">
                Remaining: {tiles.length - (matchedIds.length * 2)}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042F4]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tiles.map((tile) => {
                  const isSelected = firstSelection?.id === tile.id || secondSelection?.id === tile.id;
                  const isMatched = matchedIds.includes(tile.pairId);

                  return (
                    <div
                      key={tile.id}
                      onClick={() => handleTileClick(tile)}
                      className={`
                        min-h-[140px] md:min-h-[180px] p-4 md:p-6 rounded-[2rem] border-2 flex items-center justify-center text-center cursor-pointer transition-all duration-300
                        ${isMatched ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100 shadow-sm hover:border-[#7042F4]'}
                      `}
                      style={{
                        backgroundColor: isSelected ? '#F5F3FF' : 'white',
                        borderColor: isSelected ? '#7042F4' : 'var(--card-border)',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: isSelected ? '0 10px 25px -5px rgba(112, 66, 244, 0.3)' : ''
                      }}
                    >
                      <span className={`leading-tight ${tile.type === 'term' ? 'text-gray-900 font-black text-base md:text-xl' : 'text-gray-500 text-xs md:text-sm font-medium'}`}>
                        {tile.content}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-12 text-center">
              <a href="/socialmedia" className="inline-block text-gray-400 font-bold hover:text-[#7042F4] transition-colors text-sm uppercase tracking-widest py-4">
                ← Back to Practice Hub
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
}