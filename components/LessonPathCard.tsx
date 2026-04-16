import Link from "next/link";

type LessonPathCardProps = {
  title: string;
  icon: string;
  description: string;
  href: string;
};

/**
 * Reusable card for lesson path selection.
 */
export default function LessonPathCard({
  title,
  icon,
  description,
  href,
}: LessonPathCardProps) {
  return (
    <div
      className="group flex flex-col items-center rounded-[40px] border bg-white/5 p-10 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-2xl dark:bg-gray-900/40"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F8F7FF] text-3xl transition-transform duration-300 group-hover:scale-110 dark:bg-[#7042F4]/10">
        {icon}
      </div>

      <h3 className="mb-4 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>

      <p
        className="mb-10 flex-grow px-2 font-medium leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {description}
      </p>

      <Link href={href} className="w-full">
        <button className="w-full cursor-pointer rounded-2xl bg-[#7042F4] py-4 font-bold text-white shadow-lg transition-colors hover:bg-[#5B34E5]">
          Enter Hub →
        </button>
      </Link>
    </div>
  );
}