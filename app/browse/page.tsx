"use client";

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BrowseKnowledge() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [scams, setScams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Financial', 'Social Media', 'Elderly', 'Teens'];

  useEffect(() => {
    async function fetchScams() {
      setLoading(true);
      
      // 1. Start with a clean query for EVERYTHING
      let query = supabase
        .from('global_scams')
        .select('*')
        .order('date_added', { ascending: false });

      // 2. Apply filters ONLY if a specific category is selected
      // If 'All' is selected, we skip these and get the whole table
      if (activeFilter === 'Financial') {
        query = query.contains('tags', ['banking']);
      } else if (activeFilter === 'Social Media') {
        query = query.contains('tags', ['social']);
      } else if (activeFilter === 'Elderly' || activeFilter === 'Teens') {
        query = query.eq('threat', 'phishing');
      }

      const { data, error } = await query.limit(40);
      
      if (error) {
        console.error("Data Fetch Error:", error);
      } else {
        setScams(data || []);
      }
      setLoading(false);
    }

    fetchScams();
  }, [activeFilter]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Browse Knowledge</h1>
        
        {/* Navigation Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f 
                  ? 'bg-black text-white shadow-lg' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scams.length > 0 ? (
              scams.map((item) => {
                const isMalware = item.threat === 'malware';
                
                return (
                  <div key={item.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col h-full transition-transform hover:scale-[1.02] hover:shadow-xl">
                    
                    {/* Icon Section */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isMalware ? 'bg-red-50' : 'bg-blue-50'}`}>
                        <span className="text-3xl">{isMalware ? '🛡️' : '📷'}</span>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="flex gap-2 mb-4">
                      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isMalware ? 'text-red-500' : 'text-blue-600'}`}>
                        {isMalware ? 'General' : 'Social Media'} • Active Threat
                      </span>
                    </div>

                    {/* Title: Extracting the site name or defaulting to threat type */}
                    <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-gray-900 leading-tight">
                      {isMalware ? 'Virus Detected' : `${item.host?.split('.')[0] || 'Unknown'} Threat`}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                      Our system flagged a <strong className="text-gray-900">{item.threat?.toUpperCase()}</strong> attempt from 
                      <span className="font-semibold text-gray-800 break-all"> {item.host}</span>. 
                      {isMalware 
                        ? " This link is known to distribute malicious software. Avoid downloading any files." 
                        : " This appears to be a fraudulent login page. Always verify the sender before clicking."}
                    </p>

                    <hr className="border-gray-100 mb-6" />

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-[10px] font-bold text-green-500 tracking-widest uppercase">
                        Verified Risk
                      </span>
                      <button className="text-[10px] font-bold text-blue-600 tracking-widest uppercase flex items-center gap-2 hover:translate-x-1 transition-transform">
                        Safety Guide <span>→</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-200 rounded-[2rem]">
                <p className="text-gray-400 text-lg">No active threats found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}