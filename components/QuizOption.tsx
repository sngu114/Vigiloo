type QuizOptionProps = {
  label: string;
  text: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
};

/**
 * Reusable answer option button for quiz-style pages.
 */
export default function QuizOption({
  label,
  text,
  isSelected,
  onSelect,
}: QuizOptionProps) {
  return (
    <button
      onClick={() => onSelect(text)}
      className={`w-full cursor-pointer rounded-2xl border p-5 text-left font-medium transition-all duration-200 ${
        isSelected
          ? "bg-[#7042F4]/10 text-foreground"
          : "bg-white/5 text-foreground hover:border-[#7042F4]/50"
      }`}
      style={{
        borderColor: isSelected ? "#7042F4" : "var(--card-border)",
      }}
    >
      <span className="mr-3 font-black text-[#7042F4]">{label}.</span>
      {text}
    </button>
  );
}