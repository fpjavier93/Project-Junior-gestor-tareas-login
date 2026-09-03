begin;

select plan(4);

-- Usuarios falsos y aislados para el test.
insert into auth.users (id, email)
values
  ('11111111-1111-1111-1111-111111111111', 'owner@example.com'),
  ('22222222-2222-2222-2222-222222222222', 'other@example.com');

-- Simulamos al usuario dueño.
set local role authenticated;
set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';

-- Test 1: el dueño puede crear una tarea pendiente.
select results_eq(
  $$
    insert into public.tasks (
      id,
      user_id,
      title,
      description,
      status,
      priority,
      task_type,
      completed_at
    )
    values (
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      '11111111-1111-1111-1111-111111111111',
      'Tarea permitida por RLS',
      'Debe poder crearse pendiente.',
      'pending',
      'medium',
      'study',
      null
    )
    returning status
  $$,
  array['pending'::text],
  'El dueño puede crear una tarea pendiente'
);

-- Test 2: el dueño no puede crearla ya completada.
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
      '11111111-1111-1111-1111-111111111111',
      'Tarea prohibida por RLS',
      'No debe poder crearse completada.',
      'completed',
      'medium',
      'study',
      now()
    )
  $$,
  '42501',
  null,
  'El dueño no puede crear una tarea ya completada'
);

-- Simulamos a otro usuario autenticado.
set local request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';

select is_empty(
  $$
    update public.tasks
    set title = 'Intento de edición ajena'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
    returning id
  $$,
  'Otro usuario no puede editar la tarea del dueño'
);

set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';

select results_eq(
  $$
    select title
    from public.tasks
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  $$,
  array['Tarea permitida por RLS'::text],
  'El intento ajeno no modificó la tarea del dueño'
);

select * from finish();

rollback;