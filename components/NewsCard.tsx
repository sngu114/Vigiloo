type NewsCardProps = {
  title: string;
  description: string;
  link: string;
  publishedAt: string;
};

/**
 * Reusable card for scam alert news articles.
 */
export default function NewsCard({
  title,
  description,
  link,
  publishedAt,
}: NewsCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[40px] border border-gray-100/10 bg-white/5 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#7042F4]/30 hover:shadow-2xl dark:bg-gray-900/40"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full bg-[#7042F4]/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#7042F4]">
          Official Report
        </span>

        <span className="text-xs font-bold text-gray-500">
          {new Date(publishedAt).toLocaleDateString()}
        </span>
      </div>

      <h2 className="mb-4 text-2xl font-extrabold leading-tight transition-colors group-hover:text-[#7042F4]">
        {title}
      </h2>

      <p className="mb-8 flex-grow line-clamp-4 font-medium leading-relaxed text-gray-400">
        {description}
      </p>

      <div className="flex items-center text-sm font-bold text-[#7042F4]">
        View Source Details
        <span className="ml-2 transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </a>
  );
}