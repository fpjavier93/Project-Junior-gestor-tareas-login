create policy "Users can delete their own projects"
on public.projects
for delete
to authenticated
using (auth.uid() = user_id);