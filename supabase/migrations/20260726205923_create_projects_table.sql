create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  color text,
  created_at timestamptz not null default now()
);

-- Corrige la tabla local si había sido creada manualmente con un UUID aleatorio.
alter table public.projects
alter column user_id drop default;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'projects_user_id_fkey'
      and conrelid = 'public.projects'::regclass
  ) then
    alter table public.projects
    add constraint projects_user_id_fkey
    foreign key (user_id)
    references auth.users(id)
    on delete cascade;
  end if;
end $$;

create index if not exists projects_user_id_idx
on public.projects (user_id);

create index if not exists projects_created_at_idx
on public.projects (created_at desc);

alter table public.projects enable row level security;

drop policy if exists "Users can view their own projects" on public.projects;
create policy "Users can view their own projects"
on public.projects
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their own projects" on public.projects;
create policy "Users can create their own projects"
on public.projects
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own projects" on public.projects;
create policy "Users can delete their own projects"
on public.projects
for delete
to authenticated
using (auth.uid() = user_id);