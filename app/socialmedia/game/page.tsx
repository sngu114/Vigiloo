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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const initGame = async () => {
    setLoading(true);
    setMatchedIds([]);
    setFirstSelection(null);
    setSecondSelection(null);

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
    if (firstSelection?.id === tile.id) {
      setFirstSelection(null);
      return;
    }
    if (!firstSelection) {
      setFirstSelection(tile);
      return;
    }

    setSecondSelection(tile);

    if (firstSelection.pairId === tile.pairId && firstSelection.type !== tile.type) {
      setTimeout(() => {
        const newMatches = [...matchedIds, tile.pairId];
        setMatchedIds(newMatches);
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
    <div className="min-h-screen bg-transparent font-sans antialiased overflow-x-hidden" style={{ color: "var(--foreground)" }}>
      {/* Container with better padding for mobile */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-16">
        
        <div className="mb-4 text-[10px] sm:text-sm font-bold uppercase tracking-widest text-gray-400">
          Practice / <span className="text-[#7042F4]">Matching Game</span>
        </div>

        <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight">
          Terminology Match
        </h1>

        {isGameOver ? (
          <div className="flex flex-col items-center justify-center py-10 md:py-16 bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-xl text-center px-4 md:px-6 animate-in fade-in zoom-in duration-500">
            <div className="text-4xl md:text-6xl mb-4">🔥</div>
            <h2 className="text-2xl md:text-4xl font-black mb-2 text-gray-900 uppercase">Streak: {streak}</h2>
            <p className="text-gray-500 font-medium mb-8 tracking-widest text-[10px] uppercase">Best: {bestStreak}</p>
            
            <button onClick={initGame} className="w-full sm:w-auto rounded-2xl bg-[#7042F4] px-10 py-4 md:py-5 text-base md:text-lg font-black text-white hover:bg-[#5B34E5] transition-all active:scale-95 shadow-lg shadow-[#7042F4]/20">
              NEXT ROUND
            </button>

            <div className="w-full max-w-md border-t mt-10 pt-10" style={{ borderColor: "var(--card-border)" }}>
                <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-[#F5F3FF] border border-[#7042F4]/20">
                        <span className="font-bold text-sm md:text-base text-gray-900">1. You</span>
                        <span className="font-black text-sm md:text-base text-[#7042F4]">{bestStreak} Wins</span>
                    </div>
                </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-base md:text-lg font-medium" style={{ color: "var(--muted)" }}>
                Current Streak: <span className="text-[#7042F4] font-black">{streak}</span>
              </p>
              <div className="bg-white border border-gray-200 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-sm font-bold text-[#7042F4] text-sm md:text-base">
                Remaining: {tiles.length - (matchedIds.length * 2)}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7042F4]"></div>
              </div>
            ) : (
              /* THE RESPONSIVE GRID */
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {tiles.map((tile) => {
                  const isSelected = firstSelection?.id === tile.id || secondSelection?.id === tile.id;
                  const isMatched = matchedIds.includes(tile.pairId);

                  return (
                    <div
                      key={tile.id}
                      onClick={() => handleTileClick(tile)}
                      className={`
                        min-h-[100px] sm:min-h-[140px] md:min-h-[180px] p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 flex items-center justify-center text-center cursor-pointer transition-all duration-300
                        ${isMatched ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100 shadow-sm'}
                      `}
                      style={{
                        backgroundColor: isSelected ? '#F5F3FF' : 'white',
                        borderColor: isSelected ? '#7042F4' : 'var(--card-border)',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: isSelected ? '0 10px 20px -5px rgba(112, 66, 244, 0.2)' : ''
                      }}
                    >
                      <span className={`
                        leading-tight break-words
                        ${tile.type === 'term' 
                          ? 'text-gray-900 font-black text-sm sm:text-base md:text-xl' 
                          : 'text-gray-500 text-[10px] sm:text-xs md:text-sm font-medium'}
                      `}>
                        {tile.content}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-12 text-center pb-8">
              <a href="/socialmedia" className="text-gray-400 font-bold hover:text-[#7042F4] transition-colors text-[10px] sm:text-xs uppercase tracking-widest py-4">
                ← Back to Practice Hub
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
}