Usa normalmente:
npx supabase start
Si alguna vez vuelve a fallar por unhealthy, corre una vez:
npx supabase start --ignore-health-check
Espera 1-2 minutos y verifica:
docker ps
npx supabase status
Para apagar sin borrar datos:
npx supabase stop
No uses --debug solo en PowerShell; siempre va junto al comando:

npx supabase start --debug 