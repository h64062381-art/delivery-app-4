// وصّلني — Supabase connection
// هذا الملف متوافق مع صفحات وصّلني التي تستخدم:
// window.WASSELNI_DB.request(...)

(function () {
  const SUPABASE_URL = "https://ogiflmvzizvupdphxxon.supabase.co";
  const SUPABASE_KEY = "sb_publishable_TJxZmbtpLDu5dI-ygeVEzA_j3YFh--7";

  window.WASSELNI_SUPABASE_URL = SUPABASE_URL;
  window.WASSELNI_SUPABASE_KEY = SUPABASE_KEY;
  window.WASSELNI_SUPABASE_ANON_KEY = SUPABASE_KEY;

  window.WASSELNI_DB = {
    async request(path, options = {}) {
      const url = SUPABASE_URL + "/rest/v1/" + String(path).replace(/^\/+/, "");

      const headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(options.headers || {})
      };

      const response = await fetch(url, {
        ...options,
        headers
      });

      const text = await response.text();
      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (_) {
        data = text;
      }

      if (!response.ok) {
        const message =
          (data && data.message) ||
          (data && data.error_description) ||
          (data && data.hint) ||
          text ||
          ("HTTP " + response.status);

        throw new Error(message);
      }

      return data;
    }
  };
})();
