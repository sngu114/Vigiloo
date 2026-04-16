"use client";

import LessonPathCard from "@/components/LessonPathCard";
import StatItem from "@/components/StatItem";

type LessonPath = {
  title: string;
  icon: string;
  description: string;
  href: string;
};

type LessonStat = {
  value: string;
  label: string;
};

const lessonPaths: LessonPath[] = [
  {
    title: "Senior Defense",
    icon: "👴",
    description:
      "Specialized guidance on identifying phone impersonators, medical insurance fraud, and banking transfers.",
    href: "/lessons/elderlyscams",
  },
  {
    title: "Youth & Gaming",
    icon: "🎮",
    description:
      "Stay safe from social media phishing, gaming currency scams, and deceptive influencer sponsorships.",
    href: "/lessons/youthscams",
  },
  {
    title: "General Knowledge",
    icon: "📁",
    description:
      "Browse our complete database of scam education for all age groups and categories to become a security expert.",
    href: "/lessons/all",
  },
];

const lessonStats: LessonStat[] = [
  { value: "20+", label: "Interactive Modules" },
  { value: "5k+", label: "Global Students" },
  { value: "0$", label: "Always Free" },
];

/**
 * Lessons hub page.
 * Displays the main learning paths and platform stats.
 */
export default function LessonsHub() {
  return (
    <div
      className="min-h-screen bg-transparent font-sans antialiased"
      style={{ color: "var(--foreground)" }}
    >
      <section className="relative z-10 pt-20 pb-10 text-center">
        <div className="mb-6 inline-block rounded-full bg-[#F0EBFF] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#7042F4] dark:bg-[#7042F4]/20">
          Vigiloo Academy
        </div>

        <h1
          className="mb-4 text-6xl font-black tracking-tighter"
          style={{ color: "var(--foreground)" }}
        >
          Choose Your Path
        </h1>

        <p
          className="mx-auto max-w-2xl text-xl font-medium"
          style={{ color: "var(--muted)" }}
        >
          Every journey starts with a single step. Select a specialized track to
          begin your defense training.
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {lessonPaths.map((path) => (
            <LessonPathCard
              key={path.title}
              title={path.title}
              icon={path.icon}
              description={path.description}
              href={path.href}
            />
          ))}
          
        </div>
      </section>

      <section
        className="relative z-10 mx-auto max-w-4xl border-t px-6 py-20 text-center"
        style={{ borderColor: "var(--card-border)" }}
      >
        <div className="flex justify-center gap-12">
          {lessonStats.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>
    </div>
  );
}