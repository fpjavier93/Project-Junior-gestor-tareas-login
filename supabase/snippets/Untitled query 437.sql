alter table public.tasks
add column if not exists priority text not null default 'medium';

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'tasks_priority_check'
    ) then
        alter table public.tasks
        add constraint tasks_priority_check
        check (priority in ('low', 'medium', 'high'));
    end if;
end $$;