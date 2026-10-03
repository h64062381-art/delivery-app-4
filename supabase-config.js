// Wasselni - Supabase configuration
// This file uses the project's public Publishable key.
// Do NOT put a service_role/secret key in the website.

const SUPABASE_URL = "https://ogiflmvzizvupdphxxon.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_TJxZmbtpLDu5dI-ygeVEzA_j3YFh--7";

// Backward-compatible aliases for pages that use the older variable names.
const SUPABASE_ANON_KEY = SUPABASE_PUBLISHABLE_KEY;

if (window.supabase && typeof window.supabase.createClient === "function") {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
  window.WASSELNI_SUPABASE_URL = SUPABASE_URL;
  window.WASSELNI_SUPABASE_KEY = SUPABASE_PUBLISHABLE_KEY;
}
