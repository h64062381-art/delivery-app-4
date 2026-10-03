// وصّلني — Supabase connection
// Publishable key is intended for browser use. Never put a service_role/secret key here.
window.WASSELNI_SUPABASE = Object.freeze({
  url: 'https://ogiflmvzizvupdphxxon.supabase.co',
  key: 'sb_publishable_TJxZmbtpLDu5dI-ygeVEA_j3YFh--7'
});

window.WASSELNI_DB = Object.freeze({
  async request(path, options = {}) {
    const headers = {
      apikey: window.WASSELNI_SUPABASE.key,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };
    const response = await fetch(
      window.WASSELNI_SUPABASE.url + '/rest/v1/' + path,
      { ...options, headers }
    );
    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (_) { data = text; }
    if (!response.ok) {
      const message = data?.message || data?.hint || data?.details || text || ('HTTP ' + response.status);
      throw new Error(message);
    }
    return data;
  }
});
