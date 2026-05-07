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
    // 1. Don't do anything if we are currently "processing" two cards or if tile is matched
    if (secondSelection || matchedIds.includes(tile.pairId)) return;

    // 2. Handle first selection
    if (!firstSelection) {
      setFirstSelection(tile);
      return;
    }

    // 3. Handle second selection
    if (tile.id === firstSelection.id) return; // Ignore clicking the same card twice
    
    setSecondSelection(tile);

    // 4. Check for match
    if (firstSelection.pairId === tile.pairId && firstSelection.type !== tile.type) {
      // SUCCESS: Wait a moment so user sees both highlights, then vanish
      setTimeout(() => {
        setMatchedIds(prev => [...prev, tile.pairId]);
        setFirstSelection(null);
        setSecondSelection(null);
      }, 400); 
    } else {
      // FAIL: Keep purple for a second so user sees the mistake, then reset
      setTimeout(() => {
        setFirstSelection(null);
        setSecondSelection(null);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased" style={{ color: "var(--foreground)" }}>
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
          Practice / <span className="text-[#7042F4]">Matching Game</span>
        </div>

        <h1 className="mb-8 text-5xl font-black leading-tight text-gray-900 uppercase">Terminology Match</h1>
        
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-lg font-medium text-gray-500">
            Select two cards to find a match!
          </p>
          <div className="bg-white border border-gray-200 px-6 py-3 rounded-2xl shadow-sm font-bold text-[#7042F4]">
            Pairs Found: {matchedIds.length} / 6
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

        <div className="mt-12 text-center">
          <a href="/socialmedia" className="inline-block text-gray-400 font-bold hover:text-[#7042F4] transition-colors text-sm uppercase tracking-widest py-4">
            ← Back to Practice Hub
          </a>
        </div>
      </main>
    </div>
  );
}