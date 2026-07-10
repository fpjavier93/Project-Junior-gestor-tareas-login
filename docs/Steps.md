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






