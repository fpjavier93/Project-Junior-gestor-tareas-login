# Handoff para una IA: TaskFlow

> **Estado de esta evaluacion:** 2026-07-21. Este documento se creo revisando el codigo fuente, configuracion, pruebas y migraciones disponibles. Cuando haya contradiccion, el codigo es la fuente de verdad; la documentacion antigua puede estar desactualizada.

## 1. Instrucciones para la IA que reciba este proyecto

- El usuario esta aprendiendo React con JavaScript, HTML basico, Tailwind y ahora shadcn/ui. Explica la logica de forma gradual y explicita antes de proponer abstracciones complejas.
- La aplicacion usa React, no TypeScript, salvo que el usuario pida una migracion.
- No modifiques archivos si el usuario pide solamente explicacion, diagnostico, revision o una recomendacion. Pide o espera una orden explicita para editar.
- Trata todos los archivos como UTF-8. En PowerShell, lee archivos con `Get-Content -Encoding UTF8`.
- Conserva cambios existentes del usuario. No uses `git reset --hard`, `git checkout --` ni reversiones amplias.
- Para cambios de interfaz, conserva los componentes de shadcn y los tokens de `src/index.css`; no reintroduzcas librerias de modales/toasts eliminadas sin una razon concreta.
- El usuario valora aprender. Al explicar codigo, relaciona props, estado, eventos, datos de API y HTML final; no limites la respuesta a pegar codigo.

## 2. Que es el proyecto

**TaskFlow** es una aplicacion de productividad personal: usuarios autenticados crean, consultan, filtran, editan, completan y eliminan tareas; tambien crean proyectos y relacionan tareas con ellos.

Es una SPA con React Router. Supabase proporciona autenticacion y PostgreSQL/PostgREST. La regla deliberada del proyecto es:

```text
Supabase JS se usa para Auth y sesion.
El CRUD de datos usa Axios contra la REST API de Supabase.
No usar supabase.from(...).
```

## 3. Stack y comandos

| Area | Tecnologia |
| --- | --- |
| UI | React 19, JavaScript, Vite 8 |
| Estilos | Tailwind CSS 4, shadcn/ui, Radix UI, Lucide |
| Formularios | React Hook Form + Zod |
| Navegacion | React Router DOM 7 |
| API de datos | Axios hacia PostgREST de Supabase |
| Auth | `@supabase/supabase-js` |
| Pruebas | Vitest, Testing Library, JSDOM |

Comandos relevantes:

```bash
npm install
npm run dev          # http://127.0.0.1:3000
npm run lint
npm run test:run
npm run build
```

Variables de entorno requeridas:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Se consumen en `utils/supabase.js` y `src/lib/apiClient.js`.

## 4. Arquitectura real

```text
src/
  app/router.jsx                         Rutas de toda la SPA
  layouts/DashboardLayout.jsx            Shell protegido: sidebar, header y Outlet
  components/                            Wrappers compartidos y estados reutilizables
  components/ui/                         Componentes shadcn copiados al repo
  features/auth/                         Auth, contexto, login, registro y proteccion
  features/dashboard/                    Tareas, proyectos, dashboard, hooks y servicios
  lib/apiClient.js                       Cliente Axios de PostgREST
  lib/utils.js                           cn() para combinar clases Tailwind
  index.css                              Tokens del sistema visual shadcn/Tailwind
  test/setup.js                          Mocks globales de JSDOM/Radix
utils/supabase.js                        Cliente Supabase solo para Auth
supabase/                                Configuracion local, migracion inicial y snippets SQL
```

La organizacion real agrupa tareas y proyectos dentro de `features/dashboard`; no existe aun un feature `projects` independiente.

## 5. Rutas

Publicas:

| Ruta | Pagina |
| --- | --- |
| `/` | `LoginPage` |
| `/register` | `RegisterPage` |

Protegidas por `ProtectedRoute` y envueltas por `DashboardLayout`:

| Ruta | Pagina |
| --- | --- |
| `/dashboard` | Resumen y tareas recientes |
| `/dashboard/create-task` | Crear tarea |
| `/dashboard/tasks` | Lista, busqueda y filtros |
| `/dashboard/tasks/:taskId` | Detalle de tarea |
| `/dashboard/project-page` | Lista de proyectos |
| `/dashboard/create-project-page` | Crear proyecto |
| `/dashboard/projects/:projectID` | Detalle de proyecto y sus tareas |

`TaskDetailPage` conserva el origen mediante `location.state?.from`, para que el boton de volver regrese a la lista o al proyecto desde el que se abrio.

## 6. Flujo de autenticacion

1. `main.jsx` envuelve toda la aplicacion con `AuthProvider` y `TooltipProvider`.
2. `AuthContext` llama a `getSession()` al montar y escucha `onAuthStateChange` de Supabase.
3. Expone `session`, `user`, `loading` e `isAuthenticated` por Context.
4. `ProtectedRoute` muestra `LoadingSpinner` mientras carga y redirige a `/` cuando no hay sesion.
5. Login y registro usan React Hook Form + Zod; `authService.js` llama a Supabase Auth.
6. El logout se ejecuta desde `DashboardServices.handlesignOut(navigate)`.

El usuario autenticado contiene metadatos `nombre`, `apellidos` y `empresa`; el sidebar/header usa `user.user_metadata.nombre`.

## 7. Modelo de datos que el frontend espera

### `tasks`

```js
{
  id: "uuid",
  user_id: "uuid",             // auth.users.id
  title: "string",             // obligatorio
  description: "string | null",
  status: "pending | completed",
  priority: "low | medium | high",
  task_type: "study | work | personal",
  due_date: "YYYY-MM-DD | null",
  image_url: "string | null",
  project_id: "uuid | null",  // FK hacia projects.id
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

### `projects`

El frontend usa como minimo:

```js
{
  id: "uuid",
  user_id: "uuid",
  name: "string",
  description: "string | null",
  color: "hex color string",
  created_at: "timestamp"
}
```

Relaciones:

```text
auth.users 1 --- N tasks
auth.users 1 --- N projects
projects   1 --- N tasks (tasks.project_id, opcional)
```

La intencion actual de la FK es `ON DELETE SET NULL`: al borrar un proyecto, sus tareas deben permanecer y quedar sin proyecto. Existe un snippet SQL para esa regla.

## 8. Base de datos y seguridad: dato critico

La migracion versionada `supabase/migrations/20260525174335_create_tasks_table.sql` solo contiene la tabla inicial `tasks` con `id`, `user_id`, `title`, `description`, `status`, timestamps, indices, trigger `updated_at` y las cuatro policies RLS de tareas.

El codigo actual depende ademas de `priority`, `due_date`, `task_type`, `image_url`, `project_id` y de la tabla `projects`. Parte de esas modificaciones solo vive en snippets SQL o se hizo manualmente desde Supabase Studio.

**No asumir que `supabase db reset` reconstruye el esquema actual.** Antes de tocar schema o deploy:

1. Inspeccionar la base local/remota real.
2. Crear migraciones ordenadas e idempotentes para toda la evolucion.
3. Versionar tabla `projects`, columnas extra de `tasks`, FK e RLS de `projects`.
4. Verificar `SELECT`, `INSERT`, `UPDATE` y `DELETE` de ambas tablas con un usuario autenticado.

RLS es parte del diseno, no se debe desactivar como atajo.

## 9. Acceso a datos

`src/lib/apiClient.js` usa:

```js
baseURL: `${VITE_SUPABASE_URL}/rest/v1`
apikey: VITE_SUPABASE_PUBLISHABLE_KEY
```

Los servicios obtienen el access token desde `getSession()` y agregan:

```http
Authorization: Bearer <access_token>
```

Servicios principales:

| Archivo | Responsabilidad |
| --- | --- |
| `tasksApiServices.js` | `getTasks`, `createTask`, `editTask`, `deleteTask`, tareas por proyecto |
| `getTaskById.js` | Una tarea por UUID |
| `taskProjectServices.js` | Crear/listar/obtener/eliminar proyectos |
| `imagesApiService.js` | Lista de imagenes de Picsum |
| `authService.js` | Registro, login, logout, sesion y cambios de Auth |

Filtros de tareas actuales se convierten a query params de PostgREST:

```text
status      -> eq.pending / eq.completed
title       -> ilike.%texto%
priority    -> eq.low / eq.medium / eq.high
task_type   -> eq.study / eq.work / eq.personal
project_id  -> eq.<uuid> para detalle de proyecto
```

## 10. Flujos principales de la aplicacion

### Crear tarea

- Pagina: `CreateTaskPage`.
- RHF controla `title`, `description`, `priority`, `task_type`, `project_id`, `has_due_date`, `due_date`, `image_url`.
- Zod valida titulo, descripcion, enums, UUID opcional de proyecto y fecha no pasada.
- Los controles shadcn complejos (`RadioGroup`, `Select`, `Checkbox`) usan `Controller`; inputs nativos usan `register`.
- El dialogo de imagen entrega una URL a `setValue("image_url", url)`.
- `useTasks.handleSubmitCreateTaskForm` agrega `user_id`, transforma fecha vacia en `null`, elimina el campo de UI `has_due_date` y transforma proyecto vacio en `null` antes del POST.

### Listar y administrar tareas

- Pagina: `AllTasksPage`.
- `useTasks` carga, filtra por estado/prioridad/tipo, busca por titulo y cambia estado.
- `useEditTasks` controla seleccion y guardado del dialogo de edicion.
- `useEraseTasks` controla la confirmacion de eliminacion.
- `TaskCard` muestra prioridad, tipo, fecha limite, imagen, switch de estado, detalle, edicion y eliminacion.
- El cambio de estado actualiza localmente solo la tarea afectada para evitar un refresh completo y perder la posicion de scroll.

### Dashboard

- Pagina: `Dashboard`.
- Calcula total, pendientes, completadas y progreso.
- Usa `RisentltyTask` (nombre actual con typo) para tareas recientes.
- Muestra fechas vencidas o proximas con `calcDiffInDays`.

### Proyectos

- Paginas: `CreateProjectPage`, `ProjectPage`, `ProjectDetailsPage`.
- La creacion de proyectos usa de momento `FormData` y validacion HTML nativa, no RHF/Zod.
- `ProjectSelect` se alimenta con los proyectos al crear una tarea. El valor interno `none` se convierte en `""` para el formulario.
- `ProjectDetailsPage` obtiene un proyecto y sus tareas mediante `project_id`; cada tarea enlaza a su detalle.
- La eliminacion usa `DeleteConfirmationDialog` y muestra mensajes mapeados desde errores de Supabase.

## 11. Sistema visual y shadcn

El proyecto ya fue migrado a shadcn/ui. Los componentes de `src/components/ui/` son codigo local copiado y modificable, no una caja negra.

Capas:

```text
Tailwind  -> layout, colores, espaciado y clases utilitarias
shadcn    -> componentes locales y tokens coherentes
Radix     -> comportamiento accesible de Select, Dialog, Checkbox, etc.
Lucide    -> iconos
```

Reglas visuales:

- Usar tokens semanticos cuando corresponda: `bg-primary`, `text-muted-foreground`, `border-border`, `bg-destructive`.
- La configuracion del tema esta en `src/index.css`; los componentes shadcn se configuran en `components.json`.
- `@/` es alias de `src/`.
- Los componentes compuestos tienen partes: por ejemplo `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`.
- Componentes como `Dialog` y `SelectContent` pueden usar portal: no asumir que son descendientes HTML del lugar donde aparecen en JSX.
- Radix expone estados como `data-active`, `data-state="checked"`, etc.; Tailwind puede responder con variantes como `data-[active=true]:bg-indigo-500`.
- Para un cambio local, usar `className`. Para un patron repetido, crear variante o componente propio. Para un cambio global, modificar tokens de `index.css` o el componente local de `components/ui`.

El sidebar usa `SidebarProvider` controlado, persiste abierto/cerrado en `localStorage` (`MenuPosition`) y aísla el scroll en `#dashboard-scroll-container` para que navegacion y header permanezcan visibles.

## 12. Testing actual

Configuracion: Vitest con JSDOM y Testing Library. `src/test/setup.js` agrega mocks requeridos por componentes Radix (`ResizeObserver`, pointer capture y `scrollIntoView`).

Estado verificado el 2026-07-21:

```text
8 archivos de test aprobados
33 tests aprobados
ESLint sin errores ni warnings
Build de Vite correcto
```

Cobertura existente:

- Utilidades: estado de tarea, fechas e imagen.
- Schema de tareas con Zod.
- `TaskEmptyState`.
- Hook de imagen.
- `useEditTasks`.
- Servicios de tareas (token, filtros y CRUD) con Axios mockeado.
- `EditTaskDialog`: carga, validacion, exito, error y cierre.

La suite todavia no cubre de forma relevante autenticacion, proyectos, `useTasks`, eliminacion, paginas completas ni el comportamiento real de RLS/REST.

## 13. Estado tecnico y riesgos conocidos

Estos puntos no son instrucciones automaticas de cambio. Son contexto para que una IA evalúe el impacto antes de proponer trabajo.

### Prioridad alta

1. **Migraciones incompletas.** El esquema requerido por el frontend no esta reproducido completamente bajo `supabase/migrations`. Antes de deploy o reset, consolidar y versionar schema + RLS de proyectos.
2. **Documentacion principal desactualizada.** `README.md` aun menciona SweetAlert2, omite shadcn, Radix, RHF, Zod, testing, tareas por tipo/fecha/proyecto y usa el puerto antiguo 5173. No debe usarse como fuente de estado actual.
3. **Estado de filtro de tipo no expuesto.** `AllTasksPage` intenta obtener `taskType` desde `useTasks`, pero el return de `useTasks` no lo expone. El filtrado puede realizar consultas, pero el Select no recibe el valor actual de forma controlada. Verificar y corregir cuando se trabaje en filtros.

### Prioridad media

1. `useTasks` concentra carga, filtros, busqueda, creacion, actualizacion de estado y estado de UI. A medida que crezca, dividirlo por responsabilidad reducira complejidad.
2. La edicion de tarea solo permite titulo, descripcion y prioridad. No edita tipo, proyecto, fecha ni imagen, aunque crear tarea si los admite.
3. `getTasksById(projectID)` realmente obtiene tareas por proyecto; el nombre induce a pensar que busca una tarea por ID.
4. Hay nombres con typos que conviene normalizar solo dentro de una refactorizacion controlada: `RisentltyTask`, `hanldeSearchTypeTask`, `hanldeDeleteProject`, `setloading`.
5. Crear proyecto sigue usando `FormData` y `required` nativo. Si se completa la migracion de formularios profesionales, llevarlo a RHF + Zod.
6. La API de Picsum es externa y puede fallar por CORS/red; `ImagePickerDialog` tiene estado de error, pero no hay estrategia alternativa ni almacenamiento propio.
7. El bundle de produccion es de aproximadamente 854 kB sin gzip (253 kB gzip) y Vite advierte sobre chunk mayor de 500 kB. Considerar `lazy()` y code splitting solo cuando haya una necesidad de rendimiento real.

### Hechos de Git al momento de la evaluacion

Habia cambios de UI sin commit en:

```text
src/components/ui/sidebar.jsx
src/features/dashboard/components/TaskCardDashboard.jsx
src/layouts/DashboardLayout.jsx
```

Asumir que pertenecen al usuario y no revertirlos. Estan relacionados con ajustes recientes del sidebar y badges del dashboard.

## 14. Convenciones de trabajo recomendadas

1. Antes de una feature, definir: problema, cambios de base de datos, servicios, UI, hook/estado, validacion, pruebas y verificacion manual.
2. Si cambia schema, crear una migracion nueva; no dejar el cambio solo en Supabase Studio o snippets.
3. Mantener el CRUD de tablas en servicios Axios, con Bearer token y RLS.
4. No usar estado local para valores simples ya controlados por React Hook Form.
5. Usar `Controller` para componentes shadcn/Radix con APIs `value/onValueChange` o `checked/onCheckedChange`; usar `register` para inputs HTML compatibles.
6. Mantener las actualizaciones optimistas/locales cuando eviten perder el scroll, pero confirmar siempre la escritura en base de datos y manejar el error.
7. Ejecutar `npm run lint`, `npm run test:run` y `npm run build` despues de cambios que afecten codigo compartido.
8. Explicar siempre por que se elige una solucion, sobre todo si cambia arquitectura, estado o base de datos.

## 15. Prompt listo para pegar en otra IA

```text
Actua como un mentor tecnico y colaborador de codigo para el proyecto TaskFlow.

Antes de sugerir o editar, lee `docs/AI_HANDOFF.md` completo y usa el codigo actual como fuente de verdad. La aplicacion es una SPA React 19 + Vite + JavaScript. Usa Tailwind CSS 4, shadcn/ui local, Radix UI, Lucide, React Hook Form, Zod, React Router 7, Axios y Supabase.

Objetivo del producto: gestor de productividad personal con Auth, tareas y proyectos. Cada usuario solo puede acceder a sus propios datos mediante Supabase Auth, REST API de Supabase/PostgREST y RLS.

Reglas obligatorias:
1. Para Auth usa `@supabase/supabase-js`; para CRUD de tareas y proyectos usa Axios contra `/rest/v1`. No introduzcas `supabase.from()`.
2. No edites el proyecto cuando el usuario pida solo explicacion, diagnostico, revision o recomendacion. Explica primero y espera orden explicita para cambiar archivos.
3. Trata los archivos como UTF-8 y, si usas PowerShell, leelos con `Get-Content -Encoding UTF8`.
4. El usuario esta aprendiendo React. Explica de forma clara la relacion entre JSX, props, estado, eventos, hooks, API y HTML/CSS resultante. No respondas solo con una solucion opaca.
5. Respeta shadcn: los componentes locales viven en `src/components/ui`; Tailwind sigue siendo la herramienta de estilo. Investiga la anatomia del componente antes de concluir que `className` no funciona.
6. Conserva cambios no comprometidos del usuario y nunca ejecutes resets destructivos.
7. Si una feature cambia la base de datos, exige/crea una migracion versionada y considera RLS, FK y las operaciones CRUD completas.
8. Antes de terminar cambios de codigo, ejecuta lint, tests y build cuando sea razonable.

Aspectos importantes del estado actual:
- Las rutas protegidas viven bajo `/dashboard`; el layout usa `SidebarProvider` y persiste el menu en `localStorage` con la clave `MenuPosition`.
- Las tareas admiten status, priority, task_type, due_date, image_url y project_id opcional.
- Crear tarea usa RHF/Zod; editar tarea solo edita titulo, descripcion y prioridad.
- La tabla `projects` existe en la base usada por la app, pero las migraciones versionadas estan incompletas. No asumas que un reset reproduce el esquema real.
- Hay 33 pruebas aprobadas y lint/build pasan. El bundle es grande; no hagas code splitting salvo que el trabajo lo justifique.
- Hay cambios visuales sin commit en el sidebar y las tareas recientes. No los reviertas.

Cuando recibas una solicitud, empieza por: (a) identificar los archivos/flujo implicados, (b) explicar el plan y los riesgos, y (c) editar solo si el usuario lo autorizo. Mantén los cambios pequeños, coherentes y comprobables.
```

## 16. Siguiente trabajo recomendado

El siguiente hito de mayor valor no es otra pantalla: consolidar el esquema real de Supabase en migraciones y actualizar README/documentacion. Eso vuelve reproducible el proyecto y evita que una IA, un colaborador o un deploy partan de un estado de base de datos distinto al esperado por el frontend.
