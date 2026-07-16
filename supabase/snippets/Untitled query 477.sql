alter table public.tasks
drop constraint tasks_project_id_fkey;

alter table public.tasks
add constraint tasks_project_id_fkey
foreign key (project_id)
references public.projects(id)
on delete set null;