# TaskFlow

Aplicación web para gestionar tareas y proyectos personales. Permite crear una cuenta, iniciar sesión y trabajar únicamente con los datos del usuario autenticado.

Está construida con React y Supabase. La autenticación se realiza con Supabase Auth, mientras que el CRUD de tareas y proyectos usa Axios contra la REST API de Supabase. Las reglas de Row Level Security (RLS) limitan el acceso a los datos propios de cada usuario.

## Funcionalidades

- Registro, inicio y cierre de sesión.
- Rutas protegidas para el dashboard.
- Dashboard con resumen de tareas pendientes, completadas y progreso.
- Creación, edición, eliminación y cambio de estado de tareas.
- Prioridades: baja, media y alta.
- Tipos de tarea: estudio, trabajo y personal.
- Fecha límite opcional y validada.
- Asociación opcional de una tarea a un proyecto.
- Gestión de proyectos: crear, listar, consultar detalle y eliminar.
- Búsqueda por título y filtros por estado, prioridad y tipo.
- Vista de detalle de cada tarea.
- Selector de imágenes para tareas, usando imágenes de Picsum Photos.
- Estados de carga, error, listas vacías y confirmación antes de eliminar.
- Fondo visual compartido por las rutas y dashboard con sidebar persistente.

## Tecnologías

- React 19 y JavaScript.
- Vite.
- Tailwind CSS 4.
- React Router DOM.
- React Hook Form y Zod para formularios y validación.
- shadcn/ui y Radix UI para componentes accesibles, incluidos `AlertDialog` y diálogos.
- Lucide React para iconos.
- Axios para peticiones a la REST API de Supabase.
- Supabase Auth, PostgreSQL, REST API y Row Level Security.
- Vitest y Testing Library para pruebas.

> El proyecto ya no utiliza SweetAlert2. Las confirmaciones se implementan con los componentes de shadcn/ui.

## Arquitectura

```text
src/
├── app/
│   └── router.jsx                 # Rutas públicas, protegidas y anidadas
├── components/                    # Componentes reutilizables globales
├── features/
│   ├── auth/
│   │   ├── components/             # ProtectedRoute
│   │   ├── context/                # AuthContext
│   │   ├── pages/                  # Login y registro
│   │   ├── schemas/                # Validaciones de autenticación
│   │   └── services/               # Supabase Auth
│   └── dashboard/
│       ├── components/             # Tarjetas, filtros, diálogos y selector de imágenes
│       ├── constants/              # Tipos de error
│       ├── hooks/                  # Lógica reutilizable de tareas, proyectos e imágenes
│       ├── pages/                  # Dashboard, tareas, proyectos y vistas de detalle
│       ├── schemas/                # Validaciones de tareas y edición
│       ├── services/               # Peticiones a la REST API de Supabase
│       └── utils/                  # Utilidades de filtrado, fechas e imágenes
├── layouts/
│   ├── AppBackgroundLayout.jsx     # Fondo compartido de la aplicación
│   └── DashboardLayout.jsx         # Sidebar, encabezado y <Outlet /> del dashboard
├── lib/
│   └── apiClient.js                # Instancia de Axios para /rest/v1
└── index.css

supabase/
├── config.toml                     # Configuración de Supabase local
└── migrations/                     # Historial versionado del esquema SQL
```

## Rutas principales

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio de sesión. |
| `/register` | Registro de usuario. |
| `/dashboard` | Resumen de tareas; requiere autenticación. |
| `/dashboard/create-task` | Creación de tarea. |
| `/dashboard/tasks` | Listado, búsqueda y filtros de tareas. |
| `/dashboard/tasks/:taskId` | Detalle de una tarea. |
| `/dashboard/project-page` | Listado de proyectos. |
| `/dashboard/create-project-page` | Creación de proyecto. |
| `/dashboard/projects/:projectID` | Detalle de un proyecto y sus tareas. |

## Datos y seguridad

### Tabla `tasks`

Contiene, entre otros, los campos `title`, `description`, `status`, `priority`, `task_type`, `due_date`, `image_url`, `project_id` y `user_id`.

- `priority` solo admite `low`, `medium` o `high`.
- `task_type` solo admite `study`, `work` o `personal` cuando tiene valor.
- Al eliminar un proyecto, `project_id` pasa a `null` en sus tareas.

### Tabla `projects`

Cada proyecto tiene `name`, `description`, `color`, `created_at` y `user_id`.

Las tablas tienen RLS activado. Las policies de `tasks` permiten consultar, crear, actualizar y eliminar tareas propias; las de `projects` permiten consultar, crear y eliminar proyectos propios.

## Migraciones de Supabase

El esquema de base de datos está versionado en estas migraciones:

```text
20260525174335_create_tasks_table.sql
20260726205921_add_task_metadata.sql
20260726205923_create_projects_table.sql
20260726205924_add_task_project_relation.sql
```

No ejecutes cambios de estructura únicamente desde SQL Editor. Si agregas una tabla, columna, índice, constraint o policy, crea primero una migración:

```powershell
npx supabase migration new nombre_del_cambio
```

Después edita el archivo generado en `supabase/migrations/` y aplícalo:

```powershell
npx supabase migration up --local
```

Para reconstruir la base local desde todas las migraciones:

```powershell
npx supabase db reset
```

> `db reset` elimina los datos locales. Úsalo para verificar que el repositorio puede recrear el esquema completo o cuando no necesites conservar tus datos locales.

## Configuración local

### Requisitos

- Node.js.
- Docker Desktop en ejecución.
- Dependencias del proyecto instaladas.

### 1. Instalar dependencias

```powershell
npm install
```

### 2. Iniciar Supabase local

```powershell
npx supabase start
```

Comprueba las URLs y claves generadas:

```powershell
npx supabase status
```

Supabase Studio está disponible normalmente en:

```text
http://localhost:54323
```

### 3. Crear variables de entorno

Crea un archivo `.env` en la raíz del proyecto. Usa la URL y la clave publicable que muestra `npx supabase status`.

```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_PUBLISHABLE_KEY=TU_CLAVE_PUBLICABLE_LOCAL
```

Estas variables se usan en:

- `utils/supabase.js`: cliente de Supabase para Auth y sesión.
- `src/lib/apiClient.js`: cliente Axios para `REST /rest/v1`.

Nunca subas `.env` ni claves privadas al repositorio.

### 4. Iniciar la aplicación

```powershell
npm run dev
```

Vite inicia este proyecto en:

```text
http://127.0.0.1:3000
```

## Scripts

```powershell
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Vista previa del build
npm run lint      # Análisis estático con ESLint
npm run test      # Vitest en modo interactivo
npm run test:run  # Vitest una vez, útil en integración continua
```

## API de datos

Las operaciones de tareas y proyectos no usan `supabase.from()`. Se realizan con Axios contra la REST API de Supabase, por ejemplo:

```text
GET    /tasks
POST   /tasks
PATCH  /tasks?id=eq.<TASK_ID>
DELETE /tasks?id=eq.<TASK_ID>

GET    /projects
POST   /projects
DELETE /projects?id=eq.<PROJECT_ID>
```

Supabase JS se reserva para Auth y manejo de sesión.

## Calidad y pruebas

Hay pruebas unitarias y de componentes para validaciones, hooks, utilidades y servicios. Antes de subir cambios relevantes, ejecuta:

```powershell
npm run lint
npm run test:run
npm run build
```

## Estado del proyecto

- Autenticación y rutas protegidas: implementadas.
- CRUD de tareas y proyectos: implementado.
- Migraciones locales versionadas: implementadas.
- Validación de formularios y estados de interfaz: implementados.
- Deploy público: pendiente.
