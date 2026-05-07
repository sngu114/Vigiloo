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

  const initGame = async () => {
    setLoading(true);
    setMatchedIds([]);
    setFirstSelection(null);
    setSecondSelection(null);
    
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

    if (!firstSelection) {
      setFirstSelection(tile);
      return;
    }

    if (tile.id === firstSelection.id) return; 
    
    setSecondSelection(tile);

    if (firstSelection.pairId === tile.pairId && firstSelection.type !== tile.type) {
      setTimeout(() => {
        setMatchedIds(prev => [...prev, tile.pairId]);
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

  const isGameOver = tiles.length > 0 && matchedIds.length === (tiles.length / 2);

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased" style={{ color: "var(--foreground)" }}>
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* Breadcrumb Header */}
        <div className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
          Practice / <span className="text-[#7042F4]">Matching Game</span>
        </div>

        <h1 className="mb-8 text-5xl font-black leading-tight text-gray-900 uppercase">Terminology Match</h1>
        
        {isGameOver ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-xl text-center px-6 transition-all animate-in fade-in zoom-in duration-500">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F3FF] text-4xl">🏆</div>
            <h2 className="text-4xl font-black mb-4 text-gray-900 leading-tight tracking-tight uppercase">Master of Terms!</h2>
            <p className="text-gray-500 font-medium mb-10 max-w-sm">You matched every security concept perfectly. Digital defense is now your second language.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={initGame} 
                className="rounded-2xl bg-[#7042F4] px-12 py-5 text-lg font-black text-white hover:bg-[#5B34E5] transition-all active:scale-95 shadow-lg shadow-[#7042F4]/20"
              >
                PLAY AGAIN
              </button>
              <a 
                href="/socialmedia" 
                className="rounded-2xl bg-gray-100 px-12 py-5 text-lg font-black text-gray-900 hover:bg-gray-200 transition-all text-center"
              >
                BACK TO HUB
              </a>
            </div>
          </div>
        ) : (
          /* --- Standard Game State --- */
          <>
            <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xl text-lg font-medium text-gray-500">
                Match each **Cyber Term** to its correct **Definition**.
              </p>
              <div className="bg-white border border-gray-200 px-6 py-3 rounded-2xl shadow-sm font-bold text-[#7042F4]">
                Tiles Remaining: {tiles.length - (matchedIds.length * 2)}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042F4] mb-4"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tiles.map((tile) => {
                  const isSelected = firstSelection?.id === tile.id || secondSelection?.id === tile.id;
                  const isMatched = matchedIds.includes(tile.pairId);

                  return (
                    <div
                      key={tile.id}
                      onClick={() => handleTileClick(tile)}
                      className={`
                        min-h-[160px] p-6 rounded-[2rem] border-2 flex items-center justify-center text-center cursor-pointer transition-all duration-300
                        ${isMatched ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100 shadow-sm'}
                      `}
                      style={{
                        backgroundColor: isSelected ? '#F5F3FF' : 'white',
                        borderColor: isSelected ? '#7042F4' : '#F3F4F6',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: isSelected ? '0 10px 25px -5px rgba(112, 66, 244, 0.3)' : ''
                      }}
                    >
                      <span className={tile.type === 'term' ? 'text-gray-900 font-black text-lg leading-tight' : 'text-gray-600 text-xs font-medium leading-relaxed'}>
                        {tile.content}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Go Back Link - Hidden during Win State to avoid UI clutter */}
        {!isGameOver && (
          <div className="mt-12 text-center">
            <a href="/socialmedia" className="inline-block text-gray-400 font-bold hover:text-[#7042F4] transition-colors text-sm uppercase tracking-widest py-4">
              ← Back to Practice Hub
            </a>
          </div>
        )}
      </main>
    </div>
  );
}