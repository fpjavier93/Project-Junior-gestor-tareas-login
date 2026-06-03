# TaskFlow - Gestor de tareas con login

Aplicacion de gestion de tareas construida con React, Vite, TailwindCSS y Supabase. El proyecto permite registrar usuarios, iniciar sesion y administrar tareas propias usando Supabase Auth para autenticacion y la REST API de Supabase para el CRUD.

## Demo

- Deploy: pendiente
- Repositorio: pendiente

## Funcionalidades

- Registro, login y logout.
- Rutas protegidas con contexto de autenticacion.
- Dashboard con total de tareas, pendientes, completadas y progreso.
- Creacion de tareas.
- Listado de tareas del usuario autenticado.
- Edicion de tareas mediante modal.
- Eliminacion con confirmacion.
- Cambio de estado pendiente/completada.
- Busqueda por titulo.
- Filtro por estado.
- Estados de loading, error y empty.

## Stack

- React
- Vite
- JavaScript
- TailwindCSS
- React Router DOM
- Axios
- SweetAlert2
- Supabase Auth
- Supabase PostgreSQL
- Supabase REST API
- Row Level Security

## Regla tecnica principal

El CRUD de tareas no usa `supabase.from()`. Las operaciones sobre `tasks` pasan por Axios contra la REST API de Supabase:

- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks?id=eq.<TASK_ID>`
- `DELETE /tasks?id=eq.<TASK_ID>`

Supabase JS se usa para autenticacion y sesion.

## Estructura principal

```bash
src/
  app/
    router.jsx
  components/
    Buttons.jsx
    Card.jsx
    ErrorMessage.jsx
    LoadingSpinner.jsx
    ProgressBarDashboard.jsx
  features/
    auth/
      components/
        ProtectedRoute.jsx
      context/
        AuthContext.jsx
      pages/
        LoginPage.jsx
        RegisterPage.jsx
      services/
        authService.js
    dashboard/
      pages/
        AllTasksPage.jsx
        CreateTaskPage.jsx
        Dashboard.jsx
      services/
        tasksApi.js
  lib/
    apiClient.js
```

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto:

```env
VITE_SUPABASE_URL=https://TU_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=TU_SUPABASE_PUBLISHABLE_KEY
```

Estas variables se usan en:

- `utils/supabase.js`
- `src/lib/apiClient.js`

## Instalacion local

```bash
npm install
npm run dev
```

Luego abre la URL que muestra Vite, normalmente:

```bash
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Base de datos

La migracion principal esta en:

```bash
supabase/migrations/20260525174335_create_tasks_table.sql
```

Incluye:

- Tabla `tasks`.
- Indices por usuario, fecha y estado.
- Trigger para actualizar `updated_at`.
- Row Level Security.
- Policies para select, insert, update y delete por usuario autenticado.

## Deploy

Para desplegar en Vercel:

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Configura las variables de entorno:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Usa los comandos por defecto de Vite:
   - Build command: `npm run build`
   - Output directory: `dist`
5. En Supabase, agrega la URL del deploy en la configuracion de Auth si usas redirects.

## Estado del proyecto

- CRUD de tareas con REST API: completado.
- AuthContext y rutas protegidas: completado.
- Loading, error y empty states: completado.
- Edicion por modal: completado.
- Deploy: pendiente.
