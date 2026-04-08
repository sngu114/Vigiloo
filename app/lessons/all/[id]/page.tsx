import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function SafetyGuide(props: { params: Promise<{ id: string }> }) {
  // 1. Unpack the params for Next.js 15 compatibility
  const params = await props.params;
  const id = params.id;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 2. Fetch the specific scam data from Supabase
  const { data: scam } = await supabase
    .from('global_scams')
    .select('*')
    .eq('id', id)
    .single();

  if (!scam) notFound();

  // 3. Dynamic Logic: Customizes advice based on database tags
  const getDynamicAdvice = (tags: string[]) => {
    if (tags.includes('financial')) {
      return {
        title: "Verify via Official App",
        desc: "Banks never text you links to 'unlock' accounts. Open your banking app manually or check the back of your physical card for a support number."
      };
    }
    if (tags.includes('social') || tags.includes('phishing')) {
      return {
        title: "Check Account Security",
        desc: "Go directly to the platform's official settings (e.g., Apple ID or Tinder) to view recent login activity instead of using this message's link."
      };
    }
    return {
      title: "Contact Source Directly",
      desc: "Reach out to the company using a trusted phone number from their official website to verify if this message is legitimate."
    };
  };

  const advice = getDynamicAdvice(scam.tags || []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans p-8 md:p-16">
      {/* Top Navigation */}
      <nav className="max-w-7xl mx-auto mb-12">
        <Link href="/lessons/all" className="text-gray-400 font-bold hover:text-black transition-colors flex items-center gap-2">
          ← Back to Registry
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-red-100">
              Live Threat Analysis
            </span>
            {scam.is_golden && (
              <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-yellow-200">
                ⭐ Verified Lesson
              </span>
            )}
          </div>
          <h1 className="text-6xl font-black text-[#1A1A1A] tracking-tight mb-4 leading-tight">
            {scam.threat}
          </h1>
          <p className="text-2xl text-gray-400 font-medium">
            Analyzing risks associated with <span className="text-black font-bold font-mono">{scam.host}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN: Visual Simulation */}
          <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-50 relative overflow-hidden">
            <h2 className="text-2xl font-black mb-8 text-gray-800 underline decoration-yellow-400 underline-offset-8">
              Anatomy of the Scam
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase mb-4 tracking-tighter">
                SENDER: {scam.url || "Unknown Source"}
              </p>
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <p className="text-gray-700 font-medium leading-relaxed border-l-4 border-red-400 pl-4">
                  "Your account requires immediate verification. Please follow the link to avoid permanent suspension."
                </p>
                <div className="mt-8 w-full py-5 bg-[#6366F1] rounded-2xl text-white font-black text-center shadow-lg cursor-not-allowed">
                  SECURE YOUR ACCOUNT NOW
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm text-gray-400 font-bold text-center">
              ⚠️ Hovering over buttons would reveal the hidden host: {scam.host}
            </p>
          </section>

          {/* RIGHT COLUMN: Safety Checklist */}
          <aside className="space-y-6">
            <h2 className="text-3xl font-black mb-4">Safety Checklist</h2>
            
            {/* Step 1: URL Check */}
            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black mb-2 text-blue-600">1. Inspect the Link</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                The reported host is <span className="text-black font-bold">{scam.host}</span>. If this does not match the official company domain, close the page immediately.
              </p>
            </div>

            {/* Step 2: Dynamic Advice */}
            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm border-l-8 border-l-indigo-500">
              <h3 className="text-xl font-black mb-2 text-indigo-600">2. {advice.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{advice.desc}</p>
            </div>

            {/* Step 3: Red Action Button */}
            <div className="space-y-4">
              <button className="w-full py-6 bg-red-600 text-white rounded-[2.5rem] font-black text-xl shadow-xl shadow-red-100 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                REPORT THIS HOST <span className="text-2xl">→</span>
              </button>
              <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                Verified Threat Identification by Vigiloo
              </p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}