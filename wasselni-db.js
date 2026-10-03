/* وصّلني - Shared Supabase order database */
(function(){
  const SUPABASE_URL='https://ogiflmvzizvupdphxxon.supabase.co';
  const SUPABASE_KEY='sb_publishable_TJxZmbtpLDu5dI-ygeVEzA_j3YFh--7';
  const TABLE='orders';
  const CURRENT='wasselniCurrentOrderId';
  const POLL_MS=3000;
  let timer=null;
  const listeners=[];

  function headers(extra={}){return Object.assign({'apikey':SUPABASE_KEY,'Content-Type':'application/json'},extra)}
  async function api(path,options={}){
    const r=await fetch(SUPABASE_URL+'/rest/v1/'+path,{...options,headers:headers(options.headers||{})});
    const txt=await r.text();
    let data=null;try{data=txt?JSON.parse(txt):null}catch(e){data=txt}
    if(!r.ok){const msg=(data&&data.message)|| (data&&data.error_description)|| (data&&data.hint)||txt||('HTTP '+r.status);throw new Error(msg)}
    return data;
  }
  function normalize(o){
    if(!o)return null;
    return {
      ...o,
      status:o.status||'pending',
      restaurantStatus:o.restaurant_status??o.restaurantStatus??'pending',
      driverStatus:o.driver_status??o.driverStatus??'waiting',
      driverId:o.driver_id??o.driverId??null,
      driverName:o.driver_name??o.driverName??null,
      createdAt:o.created_at??o.createdAt??null,
      updatedAt:o.updated_at??o.updatedAt??null,
      driverAcceptedAt:o.driver_accepted_at??o.driverAcceptedAt??null,
      deliveredAt:o.delivered_at??o.deliveredAt??null
    };
  }
  function dbRow(o){
    return {
      id:o.id,customer:o.customer||'',phone:o.phone||'',address:o.address||'',payment:o.payment||'',note:o.note||'',items:Array.isArray(o.items)?o.items:[],total:Number(o.total)||0,
      status:o.status||'pending',restaurant_status:o.restaurantStatus||'pending',driver_status:o.driverStatus||'waiting',driver_id:o.driverId||null,driver_name:o.driverName||null,
      created_at:o.createdAt||new Date().toISOString(),updated_at:new Date().toISOString(),driver_accepted_at:o.driverAcceptedAt||null,delivered_at:o.deliveredAt||null
    };
  }
  async function all(){const rows=await api(TABLE+'?select=*&order=created_at.desc');return (rows||[]).map(normalize)}
  async function get(id){if(!id)return null;const rows=await api(TABLE+'?select=*&id=eq.'+encodeURIComponent(id)+'&limit=1');return normalize(rows&&rows[0])}
  async function create(data){
    const o=normalize({...data,id:data.id||('W'+Date.now().toString().slice(-7)),createdAt:new Date().toISOString()});
    const rows=await api(TABLE,{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify(dbRow(o))});
    const created=normalize(rows&&rows[0]); if(created)localStorage.setItem(CURRENT,created.id); return created;
  }
  async function update(id,patch){
    if(!id)return null;
    const row={};
    if('status' in patch)row.status=patch.status;
    if('restaurantStatus' in patch)row.restaurant_status=patch.restaurantStatus;
    if('driverStatus' in patch)row.driver_status=patch.driverStatus;
    if('driverId' in patch)row.driver_id=patch.driverId;
    if('driverName' in patch)row.driver_name=patch.driverName;
    if('driverAcceptedAt' in patch)row.driver_accepted_at=patch.driverAcceptedAt;
    if('deliveredAt' in patch)row.delivered_at=patch.deliveredAt;
    if('note' in patch)row.note=patch.note;
    row.updated_at=new Date().toISOString();
    const rows=await api(TABLE+'?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{'Prefer':'return=representation'},body:JSON.stringify(row)});
    return normalize(rows&&rows[0]);
  }
  async function claim(id,driverId='driver-1',driverName='سائق وصّلني'){
    const now=new Date().toISOString();
    const path=TABLE+'?id=eq.'+encodeURIComponent(id)+'&status=eq.ready&driver_id=is.null';
    const rows=await api(path,{method:'PATCH',headers:{'Prefer':'return=representation'},body:JSON.stringify({status:'picked_up',driver_status:'picked_up',driver_id:driverId,driver_name:driverName,driver_accepted_at:now,updated_at:now})});
    return normalize(rows&&rows[0]);
  }
  async function latest(){const rows=await api(TABLE+'?select=*&order=created_at.desc&limit=1');return normalize(rows&&rows[0])}
  function stop(){if(timer){clearInterval(timer);timer=null}}
  function subscribe(fn){
    listeners.push(fn); stop();
    const tick=async()=>{try{const list=await all();fn(list)}catch(e){console.warn('Wasselni DB:',e.message)}};
    tick(); timer=setInterval(tick,POLL_MS); return stop;
  }
  window.WasselniOrders={all,get,create,update,claim,latest,subscribe,normalize,config:{url:SUPABASE_URL,table:TABLE}};
})();
