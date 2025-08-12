-- Create table to store Puck editor pages
create table if not exists public.puck_pages (
  slug text primary key,
  content jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger to maintain updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_timestamp on public.puck_pages;
create trigger set_timestamp
before update on public.puck_pages
for each row execute procedure public.set_updated_at();

-- Enable Row Level Security and permissive policies
alter table public.puck_pages enable row level security;

-- Allow anyone to read (adjust as needed)
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'puck_pages' and policyname = 'puck_pages_read'
  ) then
    create policy puck_pages_read on public.puck_pages
      for select
      using (true);
  end if;
end $$;

-- Allow authenticated users to insert/update
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'puck_pages' and policyname = 'puck_pages_write_insert'
  ) then
    create policy puck_pages_write_insert on public.puck_pages
      for insert
      with check (auth.role() = 'authenticated');
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'puck_pages' and policyname = 'puck_pages_write_update'
  ) then
    create policy puck_pages_write_update on public.puck_pages
      for update
      using (auth.role() = 'authenticated')
      with check (auth.role() = 'authenticated');
  end if;
end $$;


