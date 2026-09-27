alter table public.tasks
add constraint tasks_title_content_check
check (char_length(btrim(title)) between 1 and 100);

--btrim(title)
--→ quita espacios al inicio y final.

--char_length(...)
--→ cuenta caracteres.

--between 1 and 100
--→ rechaza "", espacios solamente y más de 100 caracteres.