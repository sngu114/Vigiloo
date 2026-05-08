type LessonCardProps = {
  lesson: any;
  hasMounted: boolean;
  onStart: () => void;
};

export default function LessonCard({
  lesson,
  hasMounted,
  onStart,
}: LessonCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:border-[#7042F4]/30 transition-all flex flex-col relative overflow-hidden">

      <div className="absolute top-0 right-4 text-[8px] font-mono text-green-500/20 dark:text-green-400/10 pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity">
        {hasMounted &&
          Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {Math.random().toString(36).substring(2, 10)}
            </div>
          ))}
      </div>

      <div className="absolute top-6 right-6 bg-[#F0EBFF] dark:bg-[#7042F4]/20 text-[#7042F4] dark:text-[#A78BFF] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
        +{lesson.points} XP
      </div>

      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs mb-6">
        {lesson.id}
      </div>

      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 leading-[1.2] tracking-tight uppercase min-h-[3rem]">
        {lesson.title}
      </h3>

      <img
        src={lesson.image}
        alt={lesson.title}
        className="w-full h-48 object-cover rounded-2xl mb-6 border border-slate-50 dark:border-slate-800 shadow-sm"
      />

      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
        {lesson.description}
      </p>

      <button
        onClick={onStart}
        className="mt-auto w-full py-4 bg-[#7042F4] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#5B34E5] transition-colors cursor-pointer"
      >
        Start Lesson
      </button>
    </div>
  );
}