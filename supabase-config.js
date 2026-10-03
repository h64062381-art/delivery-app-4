// وصّلني - إعداد الاتصال الحقيقي بـ Supabase
// هذا مفتاح Publishable مخصص للاستخدام من الواجهة الأمامية.
window.WASSELNI_SUPABASE = Object.freeze({
  url: "https://ogiflmvzizvupdphxxon.supabase.co",
  key: "sb_publishable_TJxZmbtpLDu5dI-ygeVEzA_j3YFh--7"
});

window.WASSELNI_DB = {
  async request(path, options = {}) {
    const res = await fetch(window.WASSELNI_SUPABASE.url + "/rest/v1/" + path, {
      ...options,
      headers: {
        apikey: window.WASSELNI_SUPABASE.key,
        Authorization: "Bearer " + window.WASSELNI_SUPABASE.key,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (_) { data = text; }
    if (!res.ok) {
      const msg = data?.message || data?.hint || data?.details || text || ("HTTP " + res.status);
      throw new Error(msg);
    }
    return data;
  }
};
