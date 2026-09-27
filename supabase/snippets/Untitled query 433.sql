begin;

create temporary table tasks_index_lab (
  user_id uuid not null,
  created_at timestamptz not null,
  title text not null
) on commit drop;

insert into tasks_index_lab (
  user_id,
  created_at,
  title
)
select
  (
    '00000000-0000-0000-0000-' ||
    lpad((((number - 1) % 1000) + 1)::text, 12, '0')
  )::uuid,
  timestamptz '2026-01-01 00:00:00+00'
    + (number * interval '1 minute'),
  'Tarea de laboratorio ' || number
from generate_series(1, 100000) as number;

create index tasks_index_lab_user_id_idx
on tasks_index_lab (user_id);

create index tasks_index_lab_created_at_idx
on tasks_index_lab (created_at desc);

create index tasks_index_lab_user_created_at_idx
on tasks_index_lab (user_id, created_at desc);

analyze tasks_index_lab;

explain (analyze, buffers)
select *
from tasks_index_lab
where user_id = '00000000-0000-0000-0000-000000000001'
order by created_at desc
limit 50;

rollback;