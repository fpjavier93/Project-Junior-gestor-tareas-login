begin;

select plan(4);

-- Necesario porque tasks.user_id tiene una foreign key a auth.users.
insert into auth.users (id, email)
values (
  '33333333-3333-3333-3333-333333333333',
  'integrity@example.com'
);

-- RLS no es el tema de este archivo:
-- probamos el CHECK directamente como administrador de la base.
select throws_ok(
  $$
    insert into public.tasks (
      user_id,
      title,
      description,
      status,
      priority,
      task_type,
      completed_at
    )
    values (
      '33333333-3333-3333-3333-333333333333',
      'Pendiente con fecha',
      'Debe fallar por combinación incoherente.',
      'pending',
      'medium',
      'study',
      now()
    )
  $$,
  '23514',
  null,
  'CHECK rechaza pending con completed_at'
);

select throws_ok(
  $$
    insert into public.tasks (
      user_id,
      title,
      description,
      status,
      priority,
      task_type,
      completed_at
    )
    values (
      '33333333-3333-3333-3333-333333333333',
      'Completada sin fecha',
      'Debe fallar por combinación incoherente.',
      'completed',
      'medium',
      'study',
      null
    )
  $$,
  '23514',
  null,
  'CHECK rechaza completed sin completed_at'
);


-- Un título con solo espacios no es un título válido.
select throws_ok(
  $$
    insert into public.tasks (
      user_id,
      title,
      description,
      status,
      priority,
      task_type,
      completed_at
    )
    values (
      '33333333-3333-3333-3333-333333333333',
      '   ',
      'Prueba de integridad.',
      'pending',
      'medium',
      'study',
      null
    )
  $$,
  '23514',
  null,
  'CHECK rechaza un título vacío o compuesto solo por espacios'
);

-- repeat genera 101 letras "a": supera el máximo permitido de 100.
select throws_ok(
  $$
    insert into public.tasks (
      user_id,
      title,
      description,
      status,
      priority,
      task_type,
      completed_at
    )
    values (
      '33333333-3333-3333-3333-333333333333',
      repeat('a', 101),
      'Prueba de integridad.',
      'pending',
      'medium',
      'study',
      null
    )
  $$,
  '23514',
  null,
  'CHECK rechaza un título con más de 100 caracteres'
);

-- La ausencia de descripción sigue siendo una opción válida.
select lives_ok(
  $$
    insert into public.tasks (
      user_id,
      title,
      description,
      status,
      priority,
      task_type,
      completed_at
    )
    values (
      '33333333-3333-3333-3333-333333333333',
      'Tarea sin descripción',
      '',
      'pending',
      'medium',
      'study',
      null
    )
  $$,
  'CHECK permite una descripción vacía'
);

-- Una petición directa no puede guardar dos espacios seguidos.
select throws_ok(
  $$
    insert into public.tasks (
      user_id,
      title,
      description,
      status,
      priority,
      task_type,
      completed_at
    )
    values (
      '33333333-3333-3333-3333-333333333333',
      'Descripción con espacios inválidos',
      'Texto con  dos espacios',
      'pending',
      'medium',
      'study',
      null
    )
  $$,
  '23514',
  null,
  'CHECK rechaza una descripción con espacios consecutivos'
);

-- repeat crea una descripción de 1001 caracteres.
select throws_ok(
  $$
    insert into public.tasks (
      user_id,
      title,
      description,
      status,
      priority,
      task_type,
      completed_at
    )
    values (
      '33333333-3333-3333-3333-333333333333',
      'Descripción demasiado larga',
      repeat('a', 1001),
      'pending',
      'medium',
      'study',
      null
    )
  $$,
  '23514',
  null,
  'CHECK rechaza una descripción de más de 1000 caracteres'
);


select * from finish();

rollback;