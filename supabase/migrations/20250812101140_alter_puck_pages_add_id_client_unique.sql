-- Add id primary key, client_id, and composite unique index to puck_pages

-- Add id UUID column and client_id text column
alter table public.puck_pages
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists client_id text;

-- If slug was previously primary key, drop it and set id as primary
-- Drop any existing primary key constraint by name if it exists
do $$ declare
  pk_name text;
begin
  select tc.constraint_name into pk_name
  from information_schema.table_constraints tc
  where tc.table_schema = 'public' and tc.table_name = 'puck_pages' and tc.constraint_type = 'PRIMARY KEY'
  limit 1;
  if pk_name is not null then
    execute format('alter table public.puck_pages drop constraint %I', pk_name);
  end if;
end $$;

alter table public.puck_pages add primary key (id);

-- Unique composite index on (slug, client_id)
create unique index if not exists puck_pages_slug_client_unique on public.puck_pages (slug, client_id);

-- Helpful index for slug lookups when client_id NULL
create index if not exists puck_pages_slug_idx on public.puck_pages (slug);


