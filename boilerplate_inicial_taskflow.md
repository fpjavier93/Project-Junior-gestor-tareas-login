# Boilerplate Inicial del Proyecto
## TaskFlow - Estructura base + archivos recomendados

---

# 1. Estructura inicial

```bash
taskflow/
  public/
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
  .env
  package.json
  vite.config.js
```

---

# 2. Archivos base sugeridos

## `src/main.jsx`

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRouter from './app/router'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```

---

## `src/app/router.jsx`

```js
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import TasksPage from '../features/tasks/pages/TasksPage'
import TaskDetailPage from '../features/tasks/pages/TaskDetailPage'
import TaskCreatePage from '../features/tasks/pages/TaskCreatePage'
import TaskEditPage from '../features/tasks/pages/TaskEditPage'
import { useAuth } from '../hooks/useAuth'
import AppLayout from '../components/layout/AppLayout'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <div>Cargando...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return children
}

export default function AppRouter() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/new" element={<TaskCreatePage />} />
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        <Route path="tasks/:id/edit" element={<TaskEditPage />} />
      </Route>
    </Routes>
  )
}
```

---

## `src/lib/supabase.js`

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

---

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

## `src/features/auth/services/authService.js`

```js
import { supabase } from '../../../lib/supabase'

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
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

## `src/context/AuthContext.jsx`

```js
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  signIn,
  signOut,
  signUp,
  getCurrentSession,
  onAuthStateChange,
} from '../features/auth/services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let subscription

    async function init() {
      try {
        const currentSession = await getCurrentSession()
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
      } finally {
        setIsLoading(false)
      }

      const { data } = onAuthStateChange((newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)
      })

      subscription = data.subscription
    }

    init()

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  async function login(email, password) {
    const data = await signIn(email, password)
    setSession(data.session)
    setUser(data.user)
    return data
  }

  async function register(email, password) {
    const data = await signUp(email, password)
    setSession(data.session ?? null)
    setUser(data.user ?? null)
    return data
  }

  async function logout() {
    await signOut()
    setSession(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      session,
      user,
      accessToken: session?.access_token ?? null,
      isLoading,
      isAuthenticated: !!session,
      login,
      register,
      logout,
    }),
    [session, user, isLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  return context
}
```

---

## `src/hooks/useAuth.js`

```js
import { useAuthContext } from '../context/AuthContext'

export function useAuth() {
  return useAuthContext()
}
```

---

## `src/hooks/useDebounce.js`

```js
import { useEffect, useState } from 'react'

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
```

---

# 3. Componentes placeholder recomendados

## `Button.jsx`

```js
export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-lg px-4 py-2 font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

## `Loader.jsx`

```js
export default function Loader() {
  return <p className="text-sm text-gray-500">Cargando...</p>
}
```

## `EmptyState.jsx`

```js
export default function EmptyState({ message = 'No hay datos disponibles.' }) {
  return <p className="text-sm text-gray-500">{message}</p>
}
```

## `ErrorState.jsx`

```js
export default function ErrorState({ message = 'Ocurrió un error.' }) {
  return <p className="text-sm text-red-500">{message}</p>
}
```

---

# 4. SQL inicial rápido

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

alter table tasks enable row level security;

create policy "Users can view their own tasks"
on tasks
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
on tasks
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
on tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own tasks"
on tasks
for delete
to authenticated
using (auth.uid() = user_id);
```

---

# 5. Orden recomendado de implementación

1. Auth
2. Protected routes
3. Lista de tareas
4. Crear tarea
5. Dashboard
6. Detalle
7. Editar
8. Eliminar
9. Búsqueda
10. Filtros
11. Refactor
12. Deploy

---

# 6. Regla de oro

Antes de escribir una feature, el estudiante debe poder responder:

- ¿Qué endpoint voy a consumir?
- ¿Qué método HTTP voy a usar?
- ¿Qué headers necesito?
- ¿Qué estado de UI mostraré?
- ¿Qué pasa si falla?

---

# 7. Nota importante

Este boilerplate es una **base pedagógica**, no un producto final.

La idea es que el estudiante:
- complete componentes
- implemente estilos
- conecte pantallas
- resuelva estados de UI
- practique el flujo real de trabajo
