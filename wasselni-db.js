(function(){
  const KEY='wasselni_orders_v2';
  const LEGACY='wasselniOrder';
  const EVENTS='wasselni_order_event';
  const listeners=[];
  function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch(e){return []}}
  function write(list){localStorage.setItem(KEY,JSON.stringify(list));localStorage.setItem(EVENTS,String(Date.now()));window.dispatchEvent(new CustomEvent('wasselni:orders'));}
  function migrate(){
    let list=read();
    if(!list.length){try{const old=JSON.parse(localStorage.getItem(LEGACY)||'null');if(old&&old.id){list=[normalize(old)];write(list)}}catch(e){}}
    return list;
  }
  function normalize(o){return {...o,status:o.status||'pending',restaurantStatus:o.restaurantStatus||'pending',driverStatus:o.driverStatus||'waiting',updatedAt:o.updatedAt||new Date().toISOString()}}
  function all(){return migrate()}
  function get(id){return all().find(x=>x.id===id)||null}
  function create(data){
    const now=new Date().toISOString();
    const o=normalize({...data,id:data.id||('W'+Date.now().toString().slice(-7)),createdAt:now,updatedAt:now,status:'pending',restaurantStatus:'pending',driverStatus:'waiting',driverId:null});
    const list=all();list.unshift(o);write(list);localStorage.setItem('wasselniOrder',JSON.stringify(o));return o;
  }
  function update(id,patch){const list=all();const i=list.findIndex(x=>x.id===id);if(i<0)return null;list[i]={...list[i],...patch,updatedAt:new Date().toISOString()};write(list);localStorage.setItem('wasselniOrder',JSON.stringify(list[i]));return list[i]}
  function latest(){return all()[0]||null}
  function subscribe(fn){const h=()=>fn(all());window.addEventListener('storage',h);window.addEventListener('wasselni:orders',h);return()=>{window.removeEventListener('storage',h);window.removeEventListener('wasselni:orders',h)}}
  window.WasselniOrders={all,get,create,update,latest,subscribe,normalize};
})();
