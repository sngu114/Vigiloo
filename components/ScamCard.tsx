import Link from "next/link";
import { getScamCategory } from "@/app/utils/scam-helpers";

type ScamCardProps = {
  scam: any;
};

export default function ScamCard({ scam }: ScamCardProps) {
  const category = getScamCategory(scam.tags);

  const displayTitle = isNaN(parseInt(scam.host[0]))
    ? scam.host.split(".")[0].toUpperCase()
    : "Unverified Source";

  return (
    <div
      className="group rounded-[2.5rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className={`${category.bg} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform`}
      >
        {category.icon}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span
          className={`text-[11px] font-black tracking-widest uppercase ${category.color}`}
        >
          {category.label}
        </span>

        <span className="text-gray-400 dark:text-gray-500 text-[11px] font-bold">
          • ACTIVE THREAT
        </span>
      </div>

      <h3
        className="text-2xl font-black mb-4 leading-tight"
        style={{ color: "var(--foreground)" }}
      >
        {displayTitle} Threat
      </h3>

      <p className="text-gray-400 dark:text-gray-400 text-base leading-relaxed mb-10 flex-grow font-medium">
        Our system flagged a{" "}
        <span className="text-gray-900 dark:text-gray-100 font-bold">
          {scam.threat.replace("_", " ").toUpperCase()}
        </span>{" "}
        attempt from <strong>{scam.host}</strong>. Always verify the sender
        before clicking.
      </p>

      <div
        className="flex items-center justify-between pt-8 border-t"
        style={{ borderColor: "var(--card-border)" }}
      >
        <span className="text-[11px] font-black text-green-500 uppercase tracking-widest">
          Verified Risk
        </span>

        <Link
          href={`/lessons/all/${scam.id}`}
          className="text-[#7042F4] font-black text-sm uppercase tracking-wider hover:opacity-70 flex items-center gap-2"
        >
          Safety Guide <span className="text-lg">→</span>
        </Link>
      </div>
    </div>
  );
}