--primra rgla
alter table public.tasks
add column if not exists completed_at timestamptz;

--segunda regla
alter table public.tasks
add constraint tasks_status_completed_at_check
check (
  (status = 'pending' and completed_at is null)
  or
  (status = 'completed' and completed_at is not null)
);

-- Una tarea manual solo puede crearse pendiente y sin fecha de completado.
drop policy if exists "Users can insert their own tasks" on public.tasks;

create policy "Users can insert their own tasks"
on public.tasks
for insert
to authenticated
with check (
  auth.uid() = user_id
  and status = 'pending'
  and completed_at is null
);

