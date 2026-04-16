"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import NewsSkeletonCard from "@/components/NewsSkeletonCard";

type ScamAlert = {
  id: string | number;
  title: string;
  description: string;
  link: string;
  published_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * News page.
 * Fetches and displays scam alert articles from Supabase.
 */
export default function NewsPage() {
  const [alerts, setAlerts] = useState<ScamAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllAlerts() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("scam_alerts")
          .select("*")
          .order("published_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setAlerts(data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased">
      <section
        className="border-b bg-transparent px-6 pt-20 pb-16"
        style={{ borderColor: "var(--card-border)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-[#7042F4]">
              Vigiloo / <span className="text-gray-400">Live Feed</span>
            </div>

            <h1 className="mb-6 text-6xl font-black tracking-tight">
              Recent <span className="text-[#7042F4]">News</span>
            </h1>

            <p className="max-w-2xl text-xl font-medium leading-relaxed text-gray-400">
              Real-time updates on global fraud trends, phishing campaigns, and
              digital threats targeting your safety.
            </p>
          </div>

          <Link href="/news/doomscroll">
            <button className="group flex cursor-pointer items-center gap-3 rounded-2xl bg-[#0F172A] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#7042F4] active:scale-95">
              Doomscroll the news
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </Link>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <NewsSkeletonCard key={index} />
              ))
            : alerts.map((alert) => (
                <NewsCard
                  key={alert.id}
                  title={alert.title}
                  description={alert.description}
                  link={alert.link}
                  publishedAt={alert.published_at}
                />
              ))}
        </div>
      </main>
    </div>
  );
}