-- وصّلني: قاعدة بيانات الطلبات
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text unique not null,
  customer_name text not null,
  phone text,
  address text,
  payment_method text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  status text not null default 'جديد',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "public can insert orders" on public.orders
  for insert to anon with check (true);
create policy "public can read orders" on public.orders
  for select to anon using (true);
create policy "public can update orders" on public.orders
  for update to anon using (true) with check (true);

-- تحديث لحظي للطلبات
alter publication supabase_realtime add table public.orders;
