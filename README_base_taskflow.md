# TaskFlow - Gestor de Tareas con Login y API REST

Aplicación frontend construida con **React + JavaScript + TailwindCSS** que simula un proyecto real del mundo laboral.

El proyecto utiliza:

- **Supabase Auth** para autenticación
- **Supabase REST API** para CRUD de datos
- **Axios** para consumir endpoints HTTP
- **RLS (Row Level Security)** para seguridad real en base de datos

> **Regla del proyecto:** el CRUD de datos **NO** debe hacerse con `supabase.from()`.  
> Todo el CRUD debe consumir la **REST API de Supabase** usando **Axios**.

---

# Demo

- **Deploy:** _(agregar URL de Vercel aquí)_
- **Repositorio:** _(agregar URL de GitHub aquí)_

---

# Objetivo del proyecto

Construir una aplicación que permita a cada usuario:

- registrarse
- iniciar sesión
- cerrar sesión
- ver solo sus tareas
- crear tareas
- editar tareas
- eliminar tareas
- marcar tareas como completadas
- buscar tareas
- filtrar tareas por estado

---

# Stack tecnológico

## Frontend
- React (Vite)
- JavaScript
- TailwindCSS
- React Router DOM
- Axios

## Backend gestionado
- Supabase Auth
- Supabase PostgreSQL
- Supabase REST API
- Row Level Security (RLS)

---

# Funcionalidades

## Autenticación
- [x] Registro con email y contraseña
- [x] Login con email y contraseña
- [x] Logout
- [x] Persistencia de sesión
- [x] Rutas protegidas

## Dashboard
- [x] Total de tareas
- [x] Tareas pendientes
- [x] Tareas completadas

## Tareas
- [x] Listar tareas del usuario autenticado
- [x] Crear tarea
- [x] Editar tarea
- [x] Eliminar tarea
- [x] Ver detalle de tarea
- [x] Buscar por título
- [x] Filtrar por estado

## UX/UI
- [x] Loading states
- [x] Error states
- [x] Empty states
- [x] Responsive design

---

# Estructura del proyecto

```bash
src/
  app/
    router.jsx
  components/
    layout/
      AppLayout.jsx
      Header.jsx
      Sidebar.jsx
    ui/
      Button.jsx
      Input.jsx
      Textarea.jsx
      Select.jsx
      Card.jsx
      Loader.jsx
      EmptyState.jsx
      ErrorState.jsx
      Badge.jsx
      Modal.jsx
  context/
    AuthContext.jsx
  features/
    auth/
      pages/
        LoginPage.jsx
        RegisterPage.jsx
      services/
        authService.js
    dashboard/
      pages/
        DashboardPage.jsx
    tasks/
      components/
        TaskCard.jsx
        TaskForm.jsx
        TaskFilters.jsx
        TaskList.jsx
      pages/
        TasksPage.jsx
        TaskDetailPage.jsx
        TaskCreatePage.jsx
        TaskEditPage.jsx
      services/
        tasksApi.js
  hooks/
    useAuth.js
    useDebounce.js
  lib/
    supabase.js
    apiClient.js
  utils/
    constants.js
    helpers.js
  main.jsx
  index.css
```

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://TU_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
```

---

# Instalación local

```bash
npm install
npm run dev
```

---

# Dependencias principales

```bash
npm install react-router-dom axios @supabase/supabase-js
npm install -D tailwindcss @tailwindcss/vite
```

---

# Configuración base

## `src/lib/supabase.js`

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

## `src/lib/apiClient.js`

```js
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  },
})
```

---

# Modelo de base de datos

## Tabla `tasks`

```sql
create extension if not exists pgcrypto;

create table tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pending', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

# Seguridad (RLS)

```sql
alter table tasks enable row level security;
```

## Policies

### SELECT
```sql
create policy "Users can view their own tasks"
on tasks
for select
to authenticated
using (auth.uid() = user_id);
```

### INSERT
```sql
create policy "Users can insert their own tasks"
on tasks
for insert
to authenticated
with check (auth.uid() = user_id);
```

### UPDATE
```sql
create policy "Users can update their own tasks"
on tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

### DELETE
```sql
create policy "Users can delete their own tasks"
on tasks
for delete
to authenticated
using (auth.uid() = user_id);
```

---

# Endpoints REST usados

## Base URL
```bash
https://<project_ref>.supabase.co/rest/v1
```

## Endpoints
- `GET /tasks?select=*&order=created_at.desc`
- `GET /tasks?select=*&id=eq.<TASK_ID>`
- `POST /tasks`
- `PATCH /tasks?id=eq.<TASK_ID>`
- `DELETE /tasks?id=eq.<TASK_ID>`

---

# Reglas técnicas importantes

## Permitido
- usar `@supabase/supabase-js` **solo para auth**

## No permitido
- `supabase.from('tasks').select(...)`
- `supabase.from('tasks').insert(...)`
- `supabase.from('tasks').update(...)`
- `supabase.from('tasks').delete(...)`

## Regla
El CRUD de datos debe pasar por:
- Axios
- Supabase REST API
- Bearer token
- RLS

---

# Decisiones técnicas

- Se usa **Supabase Auth** porque simplifica el flujo de autenticación para un junior.
- Se usa **REST API de Supabase + Axios** para acercar el proyecto al consumo real de endpoints HTTP.
- Se usa **RLS** para enseñar seguridad real a nivel de base de datos.
- Se usa **arquitectura por features** para enseñar organización escalable.

---

# Posibles mejoras futuras

- Modo oscuro
- Toasts
- Modal de confirmación
- Tabla `profiles`
- Migración a TypeScript
- React Hook Form + Zod
- TanStack Query

---

# Autor

- Nombre del estudiante: _(completar)_
- Mentor: _(completar)_

---

# Licencia

Uso educativo.
