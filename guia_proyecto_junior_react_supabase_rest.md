# Guía Oficial del Proyecto
## Proyecto realista para un junior: React + JavaScript + Tailwind + Supabase (Auth + REST API)

---

# 1. Descripción general del proyecto

## Nombre del proyecto
**TaskFlow - Gestor de Tareas con Login y Base de Datos Real**

## Objetivo pedagógico
Construir una aplicación frontend moderna que simule un proyecto real del mundo laboral, donde el estudiante aprenda a:

- trabajar con una estructura de proyecto profesional
- implementar autenticación real
- consumir endpoints REST reales
- manejar tokens y headers HTTP
- guardar datos en una base de datos real
- aplicar buenas prácticas de UI/UX
- proteger rutas
- trabajar con CRUD completo
- desarrollar una aplicación que pueda mostrar en su portafolio

## Contexto del producto (como si fuera un cliente real)
Una pequeña empresa necesita una herramienta interna para que cada empleado pueda gestionar sus tareas personales.

Cada usuario debe poder:
- registrarse
- iniciar sesión
- ver solo sus propias tareas
- crear nuevas tareas
- editar tareas
- marcar tareas como completadas
- eliminar tareas
- buscar y filtrar tareas
- visualizar un pequeño dashboard con estadísticas básicas

---

# 2. Stack tecnológico

## Frontend
- **React** (con Vite)
- **JavaScript**
- **TailwindCSS**
- **React Router DOM**
- **Axios**

## Backend gestionado
- **Supabase**
  - Auth para login/registro
  - PostgreSQL como base de datos
  - REST API auto-generada para tablas
  - Row Level Security (RLS) para seguridad real

## Regla técnica importante del proyecto
> **NO se debe usar la librería de Supabase para el CRUD de datos.**
>
> El estudiante debe consumir los **endpoints REST** de Supabase usando **Axios**.
>
> **Sí se permite usar `@supabase/supabase-js` solamente para autenticación** (registro, login, logout y manejo de sesión), porque hacerlo por REST puro complica demasiado el proyecto para un junior principiante.

---

# 3. Resultado esperado al finalizar

Al finalizar el proyecto, el estudiante debe tener una aplicación que permita:

- registro de usuario
- login de usuario
- logout
- persistencia de sesión
- rutas protegidas
- CRUD completo de tareas
- búsqueda por texto
- filtros por estado
- dashboard con estadísticas
- interfaz responsive
- manejo de loading, error y empty state
- despliegue en Vercel

---

# 4. Alcance del proyecto (MVP)

## Funcionalidades obligatorias (MVP)

### Autenticación
- [ ] Registro con email y contraseña
- [ ] Login con email y contraseña
- [ ] Logout
- [ ] Mantener sesión iniciada al recargar
- [ ] Rutas protegidas

### Dashboard
- [ ] Tarjeta con total de tareas
- [ ] Tarjeta con tareas pendientes
- [ ] Tarjeta con tareas completadas

### Tareas
- [ ] Listar tareas del usuario autenticado
- [ ] Crear tarea
- [ ] Editar tarea
- [ ] Cambiar estado de tarea (pending/completed)
- [ ] Eliminar tarea
- [ ] Ver detalle de una tarea
- [ ] Buscar por título
- [ ] Filtrar por estado

### UX/UI
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Formularios con validación básica
- [ ] Responsive design

### Entrega
- [ ] Código en GitHub
- [ ] Proyecto desplegado en Vercel
- [ ] README profesional

---

# 5. Funcionalidades bonus (opcionales)

Estas se hacen solo si el MVP ya está completo y estable:

- [ ] Ordenar por fecha (más nuevas / más viejas)
- [ ] Ordenar por estado
- [ ] Modo oscuro
- [ ] Toasts de éxito/error
- [ ] Confirmación en modal al eliminar
- [ ] Skeleton loaders
- [ ] Segunda tabla `profiles`
- [ ] Avatar del usuario (solo UI, opcional)

---

# 6. Requisitos técnicos obligatorios

## Estructura del proyecto
El proyecto debe estar organizado por **features**, no todo mezclado en `components/` y `pages/`.

## API
- El CRUD de tareas debe hacerse con **Axios** consumiendo **endpoints REST de Supabase**.
- No se debe usar `supabase.from('tasks')`.

## Seguridad
- La tabla `tasks` debe tener **RLS activado**.
- Cada usuario debe poder ver y manipular **solo sus propias tareas**.

## Calidad mínima
Cada feature debe tener:
- UI funcional
- loading state
- error handling
- validación básica
- persistencia real

---

# 7. Arquitectura recomendada

## Estructura de carpetas

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

# 8. Diseño de base de datos

## Tabla principal: `tasks`

### SQL recomendado

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

## Trigger opcional para `updated_at`

```sql
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on tasks
for each row
execute function update_updated_at_column();
```

---

# 9. Seguridad real con RLS (OBLIGATORIO)

## Activar RLS

```sql
alter table tasks enable row level security;
```

## Policy: SELECT

```sql
create policy "Users can view their own tasks"
on tasks
for select
to authenticated
using (auth.uid() = user_id);
```

## Policy: INSERT

```sql
create policy "Users can insert their own tasks"
on tasks
for insert
to authenticated
with check (auth.uid() = user_id);
```

## Policy: UPDATE

```sql
create policy "Users can update their own tasks"
on tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

## Policy: DELETE

```sql
create policy "Users can delete their own tasks"
on tasks
for delete
to authenticated
using (auth.uid() = user_id);
```

## Explicación pedagógica
Aunque el frontend envíe `user_id`, la seguridad real no depende del frontend.

La seguridad real debe estar en la base de datos con RLS.

Esto enseña una lección clave del mundo real:
> **Ocultar o filtrar datos en el frontend no es seguridad.**
> **La seguridad real vive en backend / base de datos.**

---

# 10. Supabase: uso correcto en este proyecto

## Permitido
- `@supabase/supabase-js` **solo para auth**
  - registro
  - login
  - logout
  - obtener usuario actual
  - escuchar cambios de sesión

## No permitido
- `supabase.from('tasks').select(...)`
- `supabase.from('tasks').insert(...)`
- `supabase.from('tasks').update(...)`
- `supabase.from('tasks').delete(...)`

## Regla
Todo el CRUD de datos debe pasar por:
- **Axios**
- **REST API de Supabase**

---

# 11. Variables de entorno

## Archivo `.env`

```env
VITE_SUPABASE_URL=https://TU_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
```

---

# 12. Configuración base del proyecto

## Crear proyecto con Vite

```bash
npm create vite@latest taskflow
cd taskflow
npm install
```

## Instalar dependencias

```bash
npm install react-router-dom axios @supabase/supabase-js
npm install -D tailwindcss @tailwindcss/vite
```

---

# 13. Configuración de Supabase en frontend

## `src/lib/supabase.js`

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

---

# 14. Cliente HTTP para consumir endpoints REST

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

## Regla importante
Para todas las operaciones de datos se debe enviar también:

- `Authorization: Bearer <access_token>`

Eso permite que la REST API aplique correctamente las policies de RLS según el usuario autenticado.

---

# 15. Auth service (solo auth)

## `src/features/auth/services/authService.js`

```js
import { supabase } from '../../../lib/supabase'

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
}
```

---

# 16. AuthContext recomendado

## Responsabilidades del contexto
- guardar el usuario actual
- guardar el access token
- exponer loading inicial
- exponer login / register / logout
- escuchar cambios de sesión

## Estado mínimo sugerido
- `user`
- `session`
- `accessToken`
- `isLoading`
- `isAuthenticated`

---

# 17. Endpoints REST que se van a consumir

## Base URL

```bash
https://<project_ref>.supabase.co/rest/v1
```

## Endpoints principales

### Obtener tareas
```http
GET /tasks?select=*&order=created_at.desc
```

### Obtener una tarea por ID
```http
GET /tasks?select=*&id=eq.<TASK_ID>
```

### Crear tarea
```http
POST /tasks
```

### Actualizar tarea
```http
PATCH /tasks?id=eq.<TASK_ID>
```

### Eliminar tarea
```http
DELETE /tasks?id=eq.<TASK_ID>
```

---

# 18. Headers requeridos para la REST API

## Headers mínimos

```js
{
  apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
}
```

## Header recomendado al crear o actualizar

```js
Prefer: 'return=representation'
```

Esto permite que Supabase devuelva el registro creado o actualizado.

---

# 19. Servicio de tareas con Axios (OBLIGATORIO)

## `src/features/tasks/services/tasksApi.js`

```js
import { apiClient } from '../../../lib/apiClient'

export async function getTasks(accessToken) {
  const response = await apiClient.get('/tasks?select=*&order=created_at.desc', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data
}

export async function getTaskById(id, accessToken) {
  const response = await apiClient.get(`/tasks?select=*&id=eq.${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data[0] || null
}

export async function createTask(task, accessToken) {
  const response = await apiClient.post('/tasks', task, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: 'return=representation',
    },
  })

  return response.data[0]
}

export async function updateTask(id, updates, accessToken) {
  const response = await apiClient.patch(`/tasks?id=eq.${id}`, updates, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: 'return=representation',
    },
  })

  return response.data[0]
}

export async function deleteTask(id, accessToken) {
  await apiClient.delete(`/tasks?id=eq.${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
```

---

# 20. Modelo de datos esperado en frontend

## Objeto `task`

```js
{
  id: 'uuid',
  user_id: 'uuid',
  title: 'Estudiar React Router',
  description: 'Completar la navegación protegida',
  status: 'pending',
  created_at: '2026-04-14T10:00:00.000Z',
  updated_at: '2026-04-14T10:00:00.000Z'
}
```

---

# 21. Rutas de la aplicación

## Públicas
- `/login`
- `/register`

## Protegidas
- `/dashboard`
- `/tasks`
- `/tasks/new`
- `/tasks/:id`
- `/tasks/:id/edit`

## Recomendación de flujo
- si no hay sesión -> redirigir a `/login`
- si ya está autenticado y entra a `/login` o `/register` -> redirigir a `/dashboard`

---

# 22. Flujo de navegación esperado

1. Usuario entra a la app
2. Si no tiene sesión, ve login
3. Puede ir a registro
4. Se registra
5. Inicia sesión
6. Entra al dashboard
7. Ve métricas rápidas
8. Navega a lista de tareas
9. Crea una nueva tarea
10. Edita una tarea
11. Marca como completada
12. Busca y filtra
13. Elimina una tarea
14. Cierra sesión

---

# 23. Componentes recomendados

## UI reutilizable
- `Button`
- `Input`
- `Textarea`
- `Select`
- `Card`
- `Loader`
- `EmptyState`
- `ErrorState`
- `Badge`
- `Modal` (opcional)

## Layout
- `AppLayout`
- `Header`
- `Sidebar` (o navbar superior si quieres simplificar)

## Tasks
- `TaskCard`
- `TaskList`
- `TaskForm`
- `TaskFilters`

---

# 24. Reglas de UX/UI (OBLIGATORIAS)

## Cada pantalla debe contemplar
- loading state
- error state
- empty state
- estado normal

## Formularios
- deshabilitar botón mientras envía
- mostrar mensaje de error si falla
- validar campos obligatorios
- evitar doble submit

## Responsive
- mobile-first
- usable en móvil y desktop

## Accesibilidad básica
- labels en inputs
- botones claros
- focus visible
- mensajes comprensibles

---

# 25. Plan de trabajo completo (4 semanas)

---

# SEMANA 1 — Setup profesional + autenticación

## Objetivo
Tener la base del proyecto lista y el flujo de autenticación funcionando.

## Entregable de la semana
- App creada
- Tailwind funcionando
- Router funcionando
- Login / Register / Logout
- Persistencia de sesión
- Rutas protegidas

## Día 1 — Setup del proyecto
### Tareas
- Crear proyecto con Vite
- Instalar dependencias
- Configurar Tailwind
- Limpiar archivos base
- Crear estructura inicial de carpetas

## Día 2 — Crear proyecto en Supabase
### Tareas
- Crear cuenta/proyecto en Supabase
- Obtener URL y ANON KEY
- Configurar `.env`
- Verificar conexión

## Día 3 — Configurar `supabase.js` y `apiClient.js`
### Tareas
- Crear cliente de auth (`supabase.js`)
- Crear cliente REST (`apiClient.js`)

## Día 4 — Crear `authService.js`
### Tareas
- `signUp`
- `signIn`
- `signOut`
- `getCurrentSession`
- `onAuthStateChange`

## Día 5 — Crear `AuthContext`
### Tareas
- almacenar `session`
- almacenar `user`
- almacenar `accessToken`
- exponer acciones de auth
- manejar loading inicial

## Día 6 — Pantallas de login y register
### Tareas
- `LoginPage`
- `RegisterPage`
- formularios controlados
- validación básica
- loading en submit
- mensajes de error

## Día 7 — Rutas protegidas
### Tareas
- `ProtectedRoute`
- redirecciones según sesión
- proteger dashboard y tasks

---

# SEMANA 2 — Base de datos real + CRUD inicial

## Objetivo
Crear la tabla `tasks`, configurar RLS y consumir la REST API con Axios.

## Entregable de la semana
- Tabla lista
- Policies funcionando
- Lista de tareas
- Crear tarea
- Dashboard simple

## Día 8 — Crear tabla `tasks`
### Tareas
- ejecutar SQL de la tabla
- revisar columnas
- revisar tipos

## Día 9 — Activar RLS + policies
### Tareas
- activar RLS
- crear policies de SELECT/INSERT/UPDATE/DELETE
- probar con usuario autenticado

## Día 10 — Crear `tasksApi.js`
### Tareas
- `getTasks`
- `getTaskById`
- `createTask`
- `updateTask`
- `deleteTask`

## Día 11 — Crear lista de tareas
### Tareas
- `TasksPage`
- `TaskList`
- `TaskCard`
- obtener tareas al montar
- mostrar loading / error / empty

## Día 12 — Crear nueva tarea
### Tareas
- `TaskCreatePage`
- `TaskForm`
- validación básica
- enviar `title`, `description`, `status`, `user_id`
- redirigir al guardar

## Día 13 — Dashboard simple
### Tareas
- `DashboardPage`
- total de tareas
- pendientes
- completadas

## Día 14 — Refuerzo / buffer
### Tareas
- corregir bugs
- revisar UX
- limpiar código

---

# SEMANA 3 — Features reales de producto

## Objetivo
Agregar detalle, edición, eliminación, búsqueda y filtros.

## Entregable de la semana
- CRUD completo
- filtros y búsqueda funcionales

## Día 15 — Detalle de tarea
### Tareas
- `TaskDetailPage`
- traer tarea por ID
- mostrar título, descripción, estado, fechas

## Día 16 — Editar tarea
### Tareas
- `TaskEditPage`
- reutilizar `TaskForm`
- cargar valores iniciales
- PATCH a la REST API

## Día 17 — Eliminar tarea
### Tareas
- botón eliminar
- confirmación antes de borrar
- DELETE real
- redirección posterior

## Día 18 — Búsqueda
### Tareas
- input de búsqueda
- filtrar por `title`
- opcional: también por `description`

## Día 19 — Filtros
### Tareas
- todas
- pendientes
- completadas

## Día 20 — Ordenamiento (recomendado)
### Tareas
- más nuevas primero
- más viejas primero

---

# SEMANA 4 — Pulido profesional + entrega final

## Objetivo
Transformar el proyecto en una pieza de portafolio.

## Entregable de la semana
- UI pulida
- código más limpio
- README profesional
- deploy en producción

## Día 21 — Componentes UI reutilizables
### Tareas
- mejorar Button
- mejorar Input
- Badge de estado
- EmptyState
- ErrorState
- Loader

## Día 22 — Mejoras UX/UI
### Tareas
- disabled states
- loaders en botones
- mensajes claros
- responsive final
- hover/focus states

## Día 23 — Refactor
### Tareas
- limpiar nombres
- separar lógica de UI
- mover helpers
- reducir repetición
- revisar imports

## Día 24 — README profesional
### Debe incluir
- descripción del proyecto
- stack
- features
- estructura de carpetas
- variables de entorno
- cómo correr localmente
- screenshots
- decisiones técnicas
- limitaciones
- mejoras futuras

## Día 25 — Deploy
### Recomendado
- Vercel

### Tareas
- conectar repo
- configurar variables de entorno
- probar build
- probar login y CRUD en producción

## Día 26 a 28 — Buffer / mejoras bonus
### Ideas
- modo oscuro
- toasts
- modal de confirmación
- segunda tabla `profiles`

---

# 26. Criterios de evaluación del proyecto

## 1. Estructura y organización (20%)
- carpetas bien separadas
- arquitectura por features
- nombres claros
- servicios separados de componentes

## 2. Autenticación (15%)
- login funcional
- register funcional
- logout funcional
- sesión persistente
- rutas protegidas

## 3. Consumo de API REST (20%)
- uso correcto de Axios
- uso de headers correctos
- uso de bearer token
- no usar `supabase.from()` para CRUD

## 4. CRUD de tareas (20%)
- listar
- crear
- editar
- eliminar
- detalle

## 5. UX/UI (15%)
- loading states
- error states
- empty states
- responsive
- formularios usables

## 6. Calidad final / entrega (10%)
- README
- deploy
- estabilidad general
- código presentable

---

# 27. Errores comunes que debe evitar el estudiante

## Error 1
Usar `supabase.from('tasks')` para el CRUD.

**Incorrecto para este proyecto.**

## Error 2
No enviar `Authorization: Bearer <token>`.

Sin eso, RLS no sabrá quién es el usuario autenticado.

## Error 3
No activar RLS.

Eso haría que cualquier usuario pudiera acceder a datos incorrectamente.

## Error 4
Confiar en filtrar por `user_id` solo desde frontend.

Eso no es seguridad real.

## Error 5
No manejar loading/error/empty state.

En proyectos reales eso es obligatorio.

---

# 28. Buenas prácticas que sí debe aplicar

- nombrar bien archivos y funciones
- separar UI de lógica de datos
- centralizar cliente HTTP
- centralizar auth
- no duplicar código
- usar componentes reutilizables
- escribir código entendible antes que “código avanzado”
- priorizar claridad sobre complejidad

---

# 29. Reglas de mentoría recomendadas

## Regla 1
No ayudarle escribiendo todo el código desde el inicio.

## Regla 2
Primero exigir que explique:
- qué quiere hacer
- qué endpoint va a usar
- qué método HTTP corresponde
- qué headers necesita
- qué espera recibir

## Regla 3
Cada vez que haga una feature, debe responder:
- ¿Qué problema resuelve?
- ¿Qué endpoint consume?
- ¿Qué estados de UI contempla?
- ¿Qué pasa si falla?

---

# 30. Entrega final esperada

## Requisitos de entrega
- repositorio en GitHub
- proyecto desplegado en Vercel
- README profesional
- variables de entorno documentadas
- capturas de pantalla
- aplicación completamente funcional

## Debe poder demostrarse en vivo
Durante la presentación final, el estudiante debe poder:

1. Registrarse
2. Iniciar sesión
3. Crear una tarea
4. Editarla
5. Marcarla como completada
6. Buscarla
7. Filtrarla
8. Eliminarla
9. Explicar cómo funciona RLS
10. Explicar por qué el CRUD usa REST API y no `supabase.from()`

---

# 31. Preguntas de entrevista que este proyecto debería poder responder

- ¿Cómo proteges rutas en React?
- ¿Cómo mantienes la sesión del usuario?
- ¿Qué diferencia hay entre auth y autorización?
- ¿Cómo consumes una REST API con token?
- ¿Qué headers necesitas para Supabase REST?
- ¿Por qué no basta con filtrar datos en frontend?
- ¿Qué es RLS y para qué sirve?
- ¿Cómo organizaste el proyecto para que pueda escalar?
- ¿Cómo manejas loading, error y empty state?
- ¿Cómo desplegaste el proyecto?

---

# 32. Versión ideal del proyecto (resumen ejecutivo)

## Proyecto
**TaskFlow - Gestor de Tareas con Login y API REST**

## Objetivo
Simular una aplicación real de negocio para que un junior aprenda frontend profesional con backend gestionado.

## Tecnologías
- React
- JavaScript
- TailwindCSS
- React Router DOM
- Axios
- Supabase Auth
- Supabase REST API
- PostgreSQL (gestionado por Supabase)

## Resultado
Un proyecto de portafolio que enseña:
- autenticación real
- consumo de endpoints REST
- manejo de tokens
- seguridad real con RLS
- CRUD real
- estructura profesional
- despliegue real

---

# 33. Siguiente nivel (después de terminar este proyecto)

Cuando el estudiante termine correctamente este proyecto, el siguiente proyecto ideal sería:

## Opción 1
Agregar tabla `profiles` y relación con usuarios.

## Opción 2
Migrar a TypeScript.

## Opción 3
Agregar TanStack Query para data fetching profesional.

## Opción 4
Agregar validación con React Hook Form + Zod.

## Opción 5
Convertirlo en una app de notas, tickets o mini CRM.

---

# 34. Checklist final para el estudiante

## Base
- [ ] Proyecto creado con Vite
- [ ] Tailwind configurado
- [ ] Router configurado
- [ ] Estructura de carpetas lista

## Auth
- [ ] Registro funciona
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Sesión persiste
- [ ] Rutas protegidas funcionan

## Supabase
- [ ] Proyecto creado
- [ ] `.env` configurado
- [ ] Tabla `tasks` creada
- [ ] RLS activado
- [ ] Policies creadas

## API
- [ ] `apiClient.js` creado
- [ ] CRUD con Axios implementado
- [ ] Se envía `Authorization: Bearer token`
- [ ] NO se usa `supabase.from()` para CRUD

## Tareas
- [ ] Listado
- [ ] Detalle
- [ ] Crear
- [ ] Editar
- [ ] Eliminar
- [ ] Buscar
- [ ] Filtrar

## UI/UX
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Responsive
- [ ] Formularios con validación

## Entrega
- [ ] GitHub
- [ ] README
- [ ] Vercel
- [ ] Demo funcional

---

# 35. Conclusión

Este proyecto está diseñado para que un **junior principiante** trabaje en algo que **se parezca al mundo real**, sin caer en complejidad innecesaria.

No es un simple tutorial de listas.

Es una experiencia de aprendizaje donde el estudiante practica:

- estructura profesional
- autenticación real
- consumo de endpoints REST
- manejo de tokens
- base de datos real
- seguridad real
- CRUD real
- UI/UX real
- despliegue real

Si el estudiante termina este proyecto correctamente y sabe explicarlo, ya no está haciendo solo ejercicios: **ya está empezando a pensar como desarrollador frontend en un entorno real.**
