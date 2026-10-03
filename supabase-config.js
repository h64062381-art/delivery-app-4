// Wasselni - Supabase connection
// This file is safe to use in the browser with a Supabase Publishable key.

const SUPABASE_URL = "https://ogiflmvzizvupdphxxon.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_TJxZmbtpLDu5dI-ygeVEzA_j3YFh--7";

// Make the values available to the existing pages.
window.WASSELNI_SUPABASE = {
  url: SUPABASE_URL,
  key: SUPABASE_PUBLISHABLE_KEY
};
