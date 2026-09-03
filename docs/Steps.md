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


Layouts, Drawers, SideMenu, Menu, Rutas anidadas

Qué Debes Aprender En Menu

Principalmente estos conceptos:

Diferencia entre botón normal y link de navegación.
Cuándo usar Link.
Cuándo usar NavLink.
Cómo marcar una ruta como activa.
Cómo evitar repetir navegación en cada página.



max-w-max  “El ancho máximo será el tamaño del contenido”
shrink-0   “No reduzcas mi ancho aunque el contenido del lado derecho sea grande”.

Tu siguiente mini-proyecto de ingeniería será: hacer que el contrato de una tarea sea coherente también dentro de PostgreSQL, no solo en React.
Lo que vamos a implementar, en este orden:
1. Nueva migración para agregar completed_at.
2. Regla de coherencia entre status y completed_at.
3. Regla de creación: una tarea manual nace pendiente.
4. Revisar qué validaciones de Zod también merecen existir en PostgreSQL.
5. Aplicar y verificar la migración localmente.
6. Probar casos válidos e inválidos desde la app/API.

No añadiremos triggers, importaciones ni arquitectura compleja todavía. No sería proporcional a lo que necesitas aprender ahora.


