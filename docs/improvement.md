
## Plan Actual De Mejora Y Aprendizaje

### Decision actual

Por ahora no conviene hacer deploy como prioridad principal. Primero conviene seguir haciendo crecer la app con features coherentes y usar cada feature para aprender conceptos nuevos de React.

El deploy, README final, screenshots y usuario demo quedan para un hito posterior, cuando la app tenga mas valor como producto y no sea solo un CRUD de tareas.

### Objetivo del proyecto

Convertir el gestor de tareas en una app de productividad personal.

La app puede crecer con modulos relacionados:

- [x] Tareas.
- [ ] Prioridades.
- [ ] Fechas limite.
- [ ] Categorias o etiquetas.
- [ ] Proyectos.
- [ ] Detalle de tarea.
- [ ] Estadisticas.
- [ ] Perfil/configuracion.

La regla es no agregar features random. Cada feature debe mejorar la idea central de productividad.

### Orden recomendado de features

   - [x] **1. Prioridad de tareas.**
   - [x] Nueva columna en Supabase: `priority`.
   - [x] Valores posibles: `low`, `medium`, `high`.
   - [x] Mostrar prioridad en cada tarea.
   - [x] Permitir crear/editar prioridad. 
   - [x] Filtrar por prioridad mas adelante.

   - [ ] **2. Fecha limite.**
   - [x] Nueva columna en Supabase: `due_date`.
   - [x] Usar input de fecha.
   - [x] Mostrar si una tarea vence pronto o esta vencida.
   - [x] Practicar manejo de fechas en JavaScript.

- [ ] **3. Detalle de tarea.**
   - [ ] Ruta dinamica: `/dashboard/tasks/:taskId`.
   - [ ] Usar `useParams`.
   - [ ] Cargar una tarea por id.
   - [ ] Separar vista de lista y vista de detalle.

- [ ] **4. Categorias o etiquetas.**
   - [ ] Permitir clasificar tareas por tipo.
   - [ ] Ejemplos: trabajo, estudio, personal.
   - [ ] Practicar filtros multiples.

- [ ] **5. Proyectos.**
   - [ ] Crear una tabla `projects`.
   - [ ] Relacionar tareas con proyectos.
   - [ ] Practicar relaciones entre tablas y rutas dinamicas.

- [ ] **6. Formularios profesionales.**
   - [ ] Introducir React Hook Form.
   - [ ] Introducir Zod.
   - [ ] Mejorar login, registro y creacion/edicion de tareas.

- [ ] **7. Testing.**
   - [ ] Introducir Vitest.
   - [ ] Introducir React Testing Library.
   - [ ] Testear componentes principales, hooks y servicios.

- [ ] **8. Portfolio.**
   - [ ] Deploy en Vercel.
   - [ ] README con URL real.
   - [ ] Screenshots.
   - [ ] Usuario demo o instrucciones claras.
   - [ ] Explicacion tecnica de RLS, REST API, Auth y estructura.

### Roadmap De React Aplicado Al Proyecto

Cada feature nueva debe traer un concepto nuevo del roadmap. La idea no es aprender temas sueltos, sino aplicarlos dentro de una app real.

#### Conceptos ya practicados

- [x] JSX.
- [x] Componentes funcionales.
- [x] Props.
- [x] Estado con `useState`.
- [x] Efectos con `useEffect`.
- [x] Renderizado condicional.
- [x] Listas y keys.
- [x] Eventos.
- [x] React Router.
- [x] Context con `AuthContext`.
- [x] Custom hooks: `useTasks`, `useEditTasks`, `useEraseTasks`.
- [x] API calls con Axios.
- [x] Separacion por features.
- [x] Servicios para API.
- [x] Componentes presentacionales: `TaskCard`, `TaskSearch`, `TaskFilters`, `TaskEmptyState`.

#### Conceptos a practicar pronto

- [ ] Mejor composicion de componentes.
- [ ] Custom hooks con API mas limpia.
- Rutas dinamicas con `useParams`.
- Formularios con React Hook Form.
- Validacion con Zod.
- Testing con Vitest y React Testing Library.
- Manejo mas avanzado de errores.
- Mejoras de UX en loading, empty states y validaciones.

#### Conceptos que no conviene priorizar todavia

- Redux.
- Zustand.
- Next.js.
- GraphQL.
- Framer Motion.
- Cypress.
- React Native.

No son malos, pero ahora distraen. Primero conviene dominar componentes, estado, hooks, rutas, formularios, API y validacion.

### Regla Para Cada Feature Nueva

Antes de implementar una feature nueva, definir:

1. Que problema de la app resuelve.
2. Que cambio necesita en base de datos.
3. Que cambio necesita en servicios/API.
4. Que componentes nuevos necesita.
5. Que hooks o logica nueva necesita.
6. Que concepto del roadmap se va a practicar.
7. Como se va a probar manualmente.

Ejemplo con prioridad de tareas:

- Problema: el usuario necesita distinguir tareas importantes de tareas normales.
- Base de datos: agregar columna `priority`.
- API: enviar y recibir `priority` en create/edit/get.
- Componentes: mostrar prioridad en `TaskCard`; agregar select en formulario.
- Hooks: actualizar flujo de crear/editar/listar tareas.
- Roadmap: forms, controlled inputs, props, conditional rendering, API calls.
- Prueba manual: crear tarea con prioridad alta, editarla, verla en lista y confirmar que persiste al recargar.

### Proximo paso recomendado

Implementar `priority` en tareas.

Esta feature es buena porque es pequena, pero toca varias partes reales del stack:

- Supabase migration.
- Formulario de creacion.
- Edicion de tarea.
- Servicio API.
- Render en `TaskCard`.
- Logica de UI.
- Posible filtro futuro.

Es una buena feature para practicar crecimiento controlado del proyecto.

