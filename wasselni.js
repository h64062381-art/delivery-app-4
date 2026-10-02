const restaurants=[
{name:'كيوي برغر',type:'برغر',time:'20–25 دقيقة',rating:'4.9',price:'12,000',emoji:'🍔',tag:'الأكثر طلباً',desc:'برغر طازج وصوص خاص'},
{name:'نابولي',type:'بيتزا',time:'25–30 دقيقة',rating:'4.8',price:'15,000',emoji:'🍕',tag:'مميز',desc:'بيتزا على الطريقة الإيطالية'},
{name:'دارنا',type:'عراقي',time:'30–35 دقيقة',rating:'4.7',price:'18,000',emoji:'🍲',tag:'عراقي',desc:'أكلات عراقية بطابع عصري'},
{name:'مزاج كافيه',type:'قهوة',time:'15–20 دقيقة',rating:'4.9',price:'6,000',emoji:'☕',tag:'قريب منك',desc:'قهوة وحلويات يومية'},
{name:'دجاجة',type:'برغر',time:'20–25 دقيقة',rating:'4.6',price:'11,000',emoji:'🍗',tag:'جديد',desc:'دجاج مقرمش وتتبيلة خاصة'},
{name:'سويت هاوس',type:'حلويات',time:'20–30 دقيقة',rating:'4.8',price:'8,000',emoji:'🍰',tag:'حلو اليوم',desc:'حلويات طازجة كل يوم'},
{name:'مشاوي بغداد',type:'عراقي',time:'35–40 دقيقة',rating:'4.7',price:'22,000',emoji:'🥩',tag:'عائلي',desc:'مشاوي عراقية على الفحم'},
{name:'كافيه 27',type:'قهوة',time:'18–23 دقيقة',rating:'4.8',price:'7,000',emoji:'🧋',tag:'ترند',desc:'قهوة ومشروبات باردة'}
];
let current='الكل';
function render(type=current,list=restaurants){current=type;const data=type==='الكل'?list:list.filter(r=>r.type===type);document.querySelector('#grid').innerHTML=data.map(r=>`<article class="restaurant" onclick="addCart()"><div class="food-img">${r.emoji}<span>${r.tag}</span></div><div class="restaurant-body"><h3>${r.name}</h3><div class="meta"><span>★ ${r.rating} · ${r.time}</span><span>${r.price}+</span></div><p>${r.desc}</p></div></article>`).join('')||'<div style="grid-column:1/-1;padding:40px;text-align:center">ما لكينا نتائج بهالفئة حالياً.</div>'}
function filter(type){document.querySelector('#restaurants').scrollIntoView({behavior:'smooth'});render(type==='مطاعم'?'الكل':type)}
function searchRestaurants(){const q=document.querySelector('#search').value.trim();if(!q){render('الكل');return}const data=restaurants.filter(r=>(r.name+r.type+r.desc).includes(q));document.querySelector('#restaurants').scrollIntoView({behavior:'smooth'});render('الكل',data)}
function addCart(){const el=document.querySelector('#cartCount');el.textContent=Number(el.textContent)+1}
render();
