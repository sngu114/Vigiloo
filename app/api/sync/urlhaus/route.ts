import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Switching to the CSV/Text feed which is more stable for massive bulk imports
    const response = await fetch('https://urlhaus.abuse.ch/downloads/csv_recent/', {
      headers: { 'User-Agent': 'Vigiloo-LSU-Project' },
      cache: 'no-store'
    });

    const csvData = await response.text();
    
    // Split lines and skip the header comments (first 9 lines)
    const lines = csvData.split('\n').filter(line => line && !line.startsWith('#'));

    const scamEntries = lines.slice(0, 100).map(line => {
      // CSV Format: id, dateadded, url, url_status, threat, tags, urlhaus_link, reporter
      const parts = line.replace(/"/g, '').split(',');
      
      return {
        url: parts[2],
        host: new URL(parts[2]).hostname,
        threat: parts[4] || 'malware',
        tags: parts[5] ? parts[5].split('|') : ['general'],
        date_added: parts[1] || new Date().toISOString()
      };
    });

    if (scamEntries.length === 0) {
      return Response.json({ error: "No data found in the CSV feed" }, { status: 500 });
    }

    const { error: dbError } = await supabase
      .from('global_scams')
      .upsert(scamEntries, { onConflict: 'url' });

    if (dbError) throw dbError;

    return Response.json({ 
      success: true, 
      count: scamEntries.length,
      message: "Check global_scams now!" 
    });

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}