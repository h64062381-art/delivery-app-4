-- وصّلني: جدول الطلبات الأساسي في Supabase
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  phone text not null,
  address text not null,
  payment_method text,
  restaurant_name text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  status text not null default 'new',
  driver_id text,
  driver_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.orders enable row level security;
-- للتجربة الأولى فقط: اسمح بالقراءة والإضافة والتعديل عبر publishable key.
-- قبل الإطلاق التجاري استبدل هذه السياسات بسياسات مقيدة حسب المستخدم/الدور.
drop policy if exists "wasselni orders select" on public.orders;
drop policy if exists "wasselni orders insert" on public.orders;
drop policy if exists "wasselni orders update" on public.orders;
create policy "wasselni orders select" on public.orders for select to anon using (true);
create policy "wasselni orders insert" on public.orders for insert to anon with check (true);
create policy "wasselni orders update" on public.orders for update to anon using (true) with check (true);
