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

[x] Loading con spinner
[x] ErrorMessage reutilizable
[x] Error al cargar AllTasksPage
[x] Error al editar
[x] Error al completar
[x] Error al eliminar
[x] Error en Dashboard
[x] Empty state cuando no hay tareas
[x] Empty state cuando la búsqueda no encuentra nada
[x] Empty state cuando el filtro no tiene resultados
[x] Loading/disabled en acciones pequeñas

[x] Edición resuelta por modal en AllTasksPage; no hay ruta/página separada de edición.

[x] README preparado.
[ ] Deploy.
