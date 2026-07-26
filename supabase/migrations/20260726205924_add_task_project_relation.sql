alter table public.tasks
add column if not exists project_id uuid;

alter table public.tasks
drop constraint if exists tasks_project_id_fkey;

alter table public.tasks
add constraint tasks_project_id_fkey
foreign key (project_id)
references public.projects(id)
on delete set null;

create index if not exists tasks_project_id_idx
on public.tasks (project_id);