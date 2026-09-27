--La descripción puede faltar o estar vacía.
--Si contiene texto: máximo 1000 caracteres y un solo espacio normal entre palabras.
alter table public.tasks
add constraint tasks_description_length_check
check (
  description is null
  or description  = ''
  or (
    char_length(description) <= 1000
    and description ~ '^[^[:space:]]+( [^[:space:]]+)*$'
    )
);