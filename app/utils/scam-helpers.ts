export const getScamCategory = (tags: string[] = []) => {
  const t = (tags || []).map(tag => tag.toLowerCase());
  
  // 1. ELDERLY (IRS, Medicare)
  if (t.some(tag => ['elderly', 'tax', 'irs', 'medicare'].includes(tag))) {
    return { label: 'ELDERLY', icon: '👵', color: 'text-purple-600', bg: 'bg-purple-50' };
  }

  // 2. SOCIAL MEDIA / SHOPPING (Amazon, Instagram, Netflix)
  if (t.some(tag => ['amazon', 'netflix', 'social', 'instagram', 'facebook', 'login'].includes(tag))) {
    return { label: 'SOCIAL MEDIA', icon: '📸', color: 'text-pink-600', bg: 'bg-pink-50' };
  }

  // 3. FINANCIAL (Banks, PayPal, Visa)
  if (t.some(tag => ['bank', 'paypal', 'visa', 'invoice', 'crypto', 'wallet'].includes(tag))) {
    return { label: 'FINANCIAL', icon: '🏦', color: 'text-blue-600', bg: 'bg-blue-50' };
  }

  // 4. TEENS (Roblox, Discord, Gaming)
  if (t.some(tag => ['roblox', 'gaming', 'discord', 'game', 'steam'].includes(tag))) {
    return { label: 'TEENS', icon: '🎮', color: 'text-indigo-600', bg: 'bg-indigo-50' };
  }

  // 5. MALWARE
  if (t.some(tag => ['malware', 'malware_download', 'elf'].includes(tag))) {
    return { label: 'MALWARE', icon: '👾', color: 'text-red-600', bg: 'bg-red-50' };
  }

  return { label: 'GENERAL', icon: '🛡️', color: 'text-green-600', bg: 'bg-green-50' };
};