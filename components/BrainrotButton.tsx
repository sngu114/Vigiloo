type BrainrotButtonProps = {
  type: string;
  currentType: string;
  label: string;
  onClick: () => void;
};

export default function BrainrotButton({
  type,
  currentType,
  label,
  onClick,
}: BrainrotButtonProps) {
  const isActive = currentType === type;

  return (
    <button
      onClick={onClick}
      className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg border-2 transition-all ${
        isActive
          ? "bg-green-500 text-white border-green-400"
          : "bg-gray-100 dark:bg-gray-800 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}