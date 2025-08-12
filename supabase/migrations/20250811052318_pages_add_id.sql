-- Add UUID id column to pages and backfill
alter table public.pages add column if not exists id uuid not null default gen_random_uuid();

-- Make id the primary key, keep slug unique
do $$ begin
  if not exists (select 1 from pg_indexes where schemaname='public' and indexname='pages_slug_key') then
    alter table public.pages add constraint pages_slug_key unique(slug);
  end if;
end $$;

-- Switch primary key to id if not already
do $$ begin
  if exists (select 1 from pg_constraint where conname = 'pages_pkey' and conrelid = 'public.pages'::regclass) then
    alter table public.pages drop constraint pages_pkey;
  end if;
  alter table public.pages add constraint pages_pkey primary key (id);
end $$;

