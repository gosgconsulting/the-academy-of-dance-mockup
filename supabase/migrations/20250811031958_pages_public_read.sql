-- Allow public (anon) read access to pages
alter table public.pages enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'pages' and policyname = 'Public read pages'
  ) then
    create policy "Public read pages" on public.pages
      for select to anon, authenticated using (true);
  end if;
end $$;
