-- Pages storage
create table if not exists public.pages (
  slug text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.pages enable row level security;

-- Policies
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'pages' and policyname = 'Read pages for authed'
  ) then
    create policy "Read pages for authed" on public.pages
      for select to authenticated using (auth.role() = 'authenticated');
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'pages' and policyname = 'Insert pages for authed'
  ) then
    create policy "Insert pages for authed" on public.pages
      for insert to authenticated with check (auth.role() = 'authenticated');
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'pages' and policyname = 'Update pages for authed'
  ) then
    create policy "Update pages for authed" on public.pages
      for update to authenticated using (auth.role() = 'authenticated');
  end if;
end $$;
