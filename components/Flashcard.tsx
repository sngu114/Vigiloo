type FlashcardProps = {
  term: string;
  definition: string;
  isFlipped: boolean;
  onFlip: () => void;
};

/**
 * Reusable interactive flashcard for cybersecurity terms.
 */
export default function Flashcard({
  term,
  definition,
  isFlipped,
  onFlip,
}: FlashcardProps) {
  return (
    <div
      onClick={onFlip}
      className="perspective-1000 group mb-8 h-64 w-full max-w-lg cursor-pointer"
    >
      <div
        className={`preserve-3d relative h-full w-full transition-all duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div
          className="backface-hidden absolute inset-0 flex items-center justify-center rounded-[32px] border-2 bg-white/5 p-8 shadow-sm backdrop-blur-md dark:bg-gray-900/60"
          style={{ borderColor: "var(--card-border)" }}
        >
          <h3 className="text-center text-3xl font-black tracking-tight text-[#7042F4]">
            {term}
          </h3>

          <span className="absolute bottom-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
            Click to Flip
          </span>
        </div>

        <div className="backface-hidden absolute inset-0 flex rotate-y-180 items-center justify-center rounded-[32px] bg-[#7042F4] p-8 text-center">
          <p className="text-lg font-bold leading-relaxed text-white">
            {definition}
          </p>
        </div>
      </div>
    </div>
  );
}