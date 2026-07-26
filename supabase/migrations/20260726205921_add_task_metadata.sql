alter table public.tasks
add column if not exists priority text not null default 'medium',
add column if not exists image_url text default '',
add column if not exists due_date date,
add column if not exists task_type text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'tasks_priority_check'
      and conrelid = 'public.tasks'::regclass
  ) then
    alter table public.tasks
    add constraint tasks_priority_check
    check (priority in ('low', 'medium', 'high'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'tasks_task_type_check'
      and conrelid = 'public.tasks'::regclass
  ) then
    alter table public.tasks
    add constraint tasks_task_type_check
    check (task_type in ('study', 'work', 'personal'));
  end if;
end $$;