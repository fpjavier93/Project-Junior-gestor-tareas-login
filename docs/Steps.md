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

Prioridad Recomendada

--Crear src/lib/apiClient.js e instalar axios.
--Rehacer CRUD de tareas con REST API, no supabase.from().

--Crear AuthContext y ProtectedRoute:

AuthContext guarda el estado global de autenticación.
AuthProvider envuelve la app.
useAuth permite leer ese estado.
ProtectedRoute decide si una página se muestra o redirige.


--Añadir búsqueda por título.

Mejorar loading/error/empty states.
Corregir edición como página o dejar claro que editas por modal.
Preparar README y deploy.