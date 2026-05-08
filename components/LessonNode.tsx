type LessonNodeProps = {
  lesson: string;
  idx: number;
  isCurrent: boolean;
  color: string;
  onOpen: () => void;
};

export default function LessonNode({
  lesson,
  idx,
  isCurrent,
  color,
  onOpen,
}: LessonNodeProps) {
  const positions = ["-mt-32", "mt-32", "-mt-16", "mt-16", "-mt-24", "mt-24", "mt-0"];

  return (
    <div
      className={`relative z-10 flex flex-col items-center group transition-all duration-700 ${positions[idx]}`}
    >
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              isCurrent ? "text-yellow-400 animate-pulse" : "text-gray-300 dark:text-gray-700"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <button
        onClick={onOpen}
        className={`relative flex items-center justify-center transition-all duration-300 transform hover:scale-110 w-20 h-20 ${
          isCurrent ? "scale-110" : "grayscale opacity-60"
        }`}
      >
        <div
          className="absolute inset-0 rounded-[2rem] rotate-12 opacity-20"
          style={{ backgroundColor: isCurrent ? color : "#1e293b" }}
        />
        <div
          className={`w-full h-full rounded-[1.8rem] flex flex-col items-center justify-center border-b-8 border-r-4 ${
            isCurrent ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-900"
          }`}
          style={{ borderColor: isCurrent ? color : "#0f172a" }}
        >
          <span className="text-2xl font-black">{idx + 1}</span>
        </div>
      </button>

      <div className="absolute -bottom-12 whitespace-nowrap text-center">
        <h4
          className={`text-xs font-bold ${
            isCurrent ? "text-gray-900 dark:text-white" : "text-gray-500"
          }`}
        >
          {lesson}
        </h4>
      </div>
    </div>
  );
}