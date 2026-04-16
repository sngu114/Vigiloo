import Link from "next/link";

type PracticeCardProps = {
  name: string;
  imageUrl?: string;
  description: string;
  href: string;
};

/**
 * Reusable card for platform-based practice modules.
 */
export default function PracticeCard({
  name,
  imageUrl,
  description,
  href,
}: PracticeCardProps) {
  return (
    <div
      className="group flex flex-col items-center rounded-[40px] border bg-white/5 p-10 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-2xl dark:bg-gray-900/40"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div
        className="mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border bg-white/10 bg-cover bg-center shadow-inner transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          borderColor: "var(--card-border)",
        }}
      >
        {!imageUrl && (
          <span className="px-2 text-center text-xs font-bold text-gray-500">
            No Image Found
          </span>
        )}
      </div>

      <h3 className="mb-4 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        {name}
      </h3>

      <p
        className="mb-10 flex-grow px-2 font-medium leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {description}
      </p>

      <Link href={href} className="w-full">
        <button className="w-full cursor-pointer rounded-2xl bg-[#7042F4] py-4 font-bold text-white shadow-lg transition-colors hover:bg-[#5B34E5]">
          Practice →
        </button>
      </Link>
    </div>
  );
}