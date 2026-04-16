type StatItemProps = {
  value: string;
  label: string;
};

/**
 * Reusable statistic display item.
 */
export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
        {value}
      </span>
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
    </div>
  );
}