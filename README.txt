وصّلني — ربط الطلبات بقاعدة Supabase مشتركة

الملفات الوظيفية داخل الحزمة:
1) checkout.html — إنشاء الطلب من جهاز الزبون.
2) restaurant-orders.html — المطعم يستلم الطلب ويوافق ويجهزه ويضغط «جاهز للسائق».
3) driver.html — السائق يشاهد الطلبات الجاهزة، يستلم الطلب، ثم يضغط «تم تسليم الطلب».
4) order-tracking.html — الزبون يتابع حالة الطلب.
5) wasselni-db.js — طبقة الربط المشتركة مع Supabase.

مهم جداً قبل التشغيل:
في Supabase > SQL Editor نفّذ هذا SQL مرة واحدة:

create table if not exists public.orders (
  id text primary key,
  customer text not null,
  phone text not null,
  address text not null,
  payment text,
  note text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  status text not null default 'pending',
  restaurant_status text not null default 'pending',
  driver_status text not null default 'waiting',
  driver_id text,
  driver_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  driver_accepted_at timestamptz,
  delivered_at timestamptz
);

alter table public.orders enable row level security;

create policy "wasselni anon read orders" on public.orders for select to anon using (true);
create policy "wasselni anon create orders" on public.orders for insert to anon with check (true);
create policy "wasselni anon update orders" on public.orders for update to anon using (true) with check (true);

ملاحظة: الربط يستخدم publishable key فقط. لا تضع Secret/Service Role Key داخل ملفات الموقع.
الصفحات تفحص قاعدة البيانات كل 3 ثوانٍ حتى تظهر تغييرات المطعم والسائق على الأجهزة الأخرى.
