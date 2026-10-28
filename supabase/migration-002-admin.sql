alter table public.viewings add column if not exists status text not null default 'requested';
alter table public.viewings add column if not exists ref text;
alter table public.viewings add column if not exists reminded_at timestamptz;
