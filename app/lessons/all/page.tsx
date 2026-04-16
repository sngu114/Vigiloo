'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
// Corrected to use createBrowserClient for the 'use client' file
import { createBrowserClient } from '@supabase/ssr';
import { getScamCategory } from '../../utils/scam-helpers';

interface Scam {
  id: number;
  url: string;
  host: string;
  threat: string;
  tags: string[];
  date_added: string;
}

export default function BrowseKnowledge() {
  const [scams, setScams] = useState<Scam[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  // Initialize the browser client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const categories = ['All', 'Financial', 'Social Media', 'Elderly', 'Teens'];

  useEffect(() => {
    const fetchScams = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('global_scams')
          .select('*')
          .order('date_added', { ascending: false });
        
        if (activeTab !== 'All') {
          // Standardizes tab names to match your database tags
          const filterTag = activeTab.toLowerCase().replace(' ', '');
          query = query.contains('tags', [filterTag]);
        }

        // Fetching the scams
        const { data, error } = await query.limit(20); 
        
        if (error) throw error;
        setScams((data as Scam[]) || []);
      } catch (err) {
        console.error("Error fetching scams:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchScams();
  }, [activeTab, supabase]);

  return (
    /* FIXED: Changed hardcoded background to CSS variables for Dark Mode compatibility */
    <div className="min-h-screen p-8 md:p-12 font-sans transition-colors duration-300" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl font-black mb-8 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Browse Knowledge
        </h1>
        
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full border-2 text-sm font-bold transition-all duration-200 ${
                activeTab === cat 
                ? 'bg-[#7042F4] text-white border-[#7042F4] shadow-lg' 
                : 'bg-transparent text-gray-500 border-gray-100 dark:border-gray-800 hover:border-[#7042F4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-full text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042F4] mx-auto mb-4"></div>
            <p className="text-gray-400 font-bold">Scanning Registry...</p>
          </div>
        ) : scams.length > 0 ? (
          scams.map((scam) => {
            const category = getScamCategory(scam.tags);
            
            // Logic to handle titles for common scams
            const displayTitle = isNaN(parseInt(scam.host[0])) 
              ? scam.host.split('.')[0].toUpperCase() 
              : "Unverified Source";

            return (
              /* FIXED: Changed bg-white to var(--card) and added border variables */
              <div 
                key={scam.id} 
                className="group rounded-[2.5rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                style={{ background: 'var(--card)', borderColor: 'var(--card-border)' }}
              >
                <div className={`${category.bg} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[11px] font-black tracking-widest uppercase ${category.color}`}>
                    {category.label}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-[11px] font-bold">• ACTIVE THREAT</span>
                </div>

                <h3 className="text-2xl font-black mb-4 leading-tight" style={{ color: 'var(--foreground)' }}>
                  {displayTitle} Threat
                </h3>

                <p className="text-gray-400 dark:text-gray-400 text-base leading-relaxed mb-10 flex-grow font-medium">
                  Our system flagged a <span className="text-gray-900 dark:text-gray-100 font-bold">{scam.threat.replace('_', ' ').toUpperCase()}</span> attempt from <strong>{scam.host}</strong>. 
                  Always verify the sender before clicking.
                </p>

                <div className="flex items-center justify-between pt-8 border-t" style={{ borderColor: 'var(--card-border)' }}>
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
          })
        ) : (
          /* FIXED: Updated empty state to use card variables */
          <div className="col-span-full text-center py-24 rounded-[3rem] border-2 border-dashed" style={{ background: 'var(--card)', borderColor: 'var(--card-border)' }}>
            <p className="text-gray-400 text-xl font-bold">No threats found for "{activeTab}"</p>
          </div>
        )}
      </div>
    </div>
  );
}