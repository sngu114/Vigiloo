import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // This API converts The Hacker News RSS into JSON so it never blocks you
    const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews';
    
    const response = await fetch(FEED_URL);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error("News source is currently unreachable.");
    }

    // Map the cybersecurity articles to your database format
    const formattedScams = data.items.map((item: any) => ({
      title: item.title,
      // Clean up the text: remove HTML tags and limit length
      description: item.description.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...',
      link: item.link,
      published_at: new Date(item.pubDate).toISOString(),
    }));

    // Upsert into Supabase (Prevents duplicates based on the link)
    const { error } = await supabase
      .from('scam_alerts')
      .upsert(formattedScams, { onConflict: 'link' });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      count: formattedScams.length,
      source: "The Hacker News",
      message: "Cybersecurity alerts updated!" 
    });

  } catch (err: any) {
    console.error("Sync Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}