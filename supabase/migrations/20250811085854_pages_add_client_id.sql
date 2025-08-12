-- Add client_id to pages and make (client_id, slug) unique
alter table public.pages add column if not exists client_id text;

-- If slug was primary key previously, drop it and set id as PK
do $$ begin
  if exists (select 1 from pg_constraint where conname = 'pages_pkey' and conrelid = 'public.pages'::regclass) then
    alter table public.pages drop constraint pages_pkey;
  end if;
  alter table public.pages add constraint pages_pkey primary key (id);
end $$;

-- Drop unique constraint on slug if present (which may own an index of the same name)
do $$ begin
  if exists (select 1 from pg_constraint where conname = 'pages_slug_key' and conrelid = 'public.pages'::regclass) then
    alter table public.pages drop constraint pages_slug_key;
  end if;
end $$;

-- Create composite unique index for client + slug
create unique index if not exists pages_client_slug_key on public.pages (coalesce(client_id,'default'), slug);