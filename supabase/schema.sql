create table if not exists public.viewings (
  id uuid primary key default gen_random_uuid(),
  apartment text not null,
  date date not null,
  time text not null,
  name text not null,
  email text not null,
  phone text,
  note text,
  created_at timestamptz not null default now()
);

alter table public.viewings
  add constraint viewings_slot_unique unique (apartment, date, time);

create index if not exists viewings_apartment_date
  on public.viewings (apartment, date);

alter table public.viewings enable row level security;
