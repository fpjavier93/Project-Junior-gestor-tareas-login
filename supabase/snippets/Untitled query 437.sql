begin;

set local role authenticated;
set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';

update public.tasks
set title = 'Intento de modificar tarea ajena'
where id = '0659ca7a-94cb-46e6-bbcd-08948e0582e1'
returning id, title;

rollback;