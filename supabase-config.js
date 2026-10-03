// Wasselni - Supabase connection
// Browser-safe Publishable key only. Never put a service_role/secret key here.

window.WASSELNI_SUPABASE_URL = 'https://ogiflmvzizvupdphxxon.supabase.co';
window.WASSELNI_SUPABASE_ANON_KEY = 'sb_publishable_TJxZmbtpLDu5dI-ygeVEA_zj3YFh--7';

window.WASSELNI_SUPABASE = {
  url: window.WASSELNI_SUPABASE_URL,
  key: window.WASSELNI_SUPABASE_ANON_KEY
};

window.wasselniSupabaseReady =
  window.WASSELNI_SUPABASE_URL.startsWith('https://') &&
  !window.WASSELNI_SUPABASE_URL.includes('YOUR_') &&
  !!window.WASSELNI_SUPABASE_ANON_KEY &&
  !window.WASSELNI_SUPABASE_ANON_KEY.includes('YOUR_');
