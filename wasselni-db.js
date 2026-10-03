/* وصّلني — طبقة الطلبات المشتركة
   تعمل مع Supabase إذا كان الجدول موجوداً، وتحتفظ بنسخة محلية للمعاينة.
*/
window.WASSELNI_CONFIG={url:'https://ogiflmvzizvupdphxxon.supabase.co',key:'sb_publishable_TJxZmbtpLDu5dI-ygeVEzA_j3YFh--7'};
window.WASSELNI_DB={
  key:'wasselniOrders',
  local(){try{return JSON.parse(localStorage.getItem(this.key)||'[]')}catch(e){return[]}},
  saveLocal(a){localStorage.setItem(this.key,JSON.stringify(a));},
  async request(path,opts={}){const h={apikey:WASSELNI_CONFIG.key,Accept:'application/json','Content-Type':'application/json',...(opts.headers||{})};const r=await fetch(WASSELNI_CONFIG.url+'/rest/v1/'+path,{...opts,headers:h});const t=await r.text();let d=null;try{d=t?JSON.parse(t):null}catch(e){d=t}if(!r.ok)throw new Error(d?.message||d?.hint||d?.details||t||('HTTP '+r.status));return d},
  async create(order){const a=this.local();a.unshift(order);this.saveLocal(a);try{await this.request('orders',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(order)});return {remote:true,order}}catch(e){return {remote:false,order,error:e.message}}},
  async list(){const a=this.local();try{const r=await this.request('orders?select=*&order=created_at.desc');if(Array.isArray(r)){this.saveLocal(r);return r}}catch(e){}return a},
  async update(id,patch){let a=this.local();a=a.map(o=>String(o.id)===String(id)?{...o,...patch,updated_at:new Date().toISOString()}:o);this.saveLocal(a);try{await this.request('orders?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify(patch)})}catch(e){}return a.find(o=>String(o.id)===String(id));}
};
