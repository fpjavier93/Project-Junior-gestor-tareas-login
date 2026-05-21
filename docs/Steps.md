Lado izquierdo

Tiene:

texto pequeño DASHBOARD
título grande
subtítulo
Lado derecho

Tiene:

botón "Ver todas"
botón "+ Nueva tarea"

Aquí probablemente usarías:

div header
    div info
    div actions

Y el header tendría:

display: flex
justify-between


3. Tarjetas de estadísticas

La parte:

TOTAL
5

PENDIENTES
3

COMPLETADAS
2

SÍ, aquí normalmente hay:

un contenedor grande
y dentro varias cards separadas

Algo así mentalmente:

StatsSection
 ├── StatCard
 ├── StatCard
 └── StatCard

Cada card:

es un div
tiene borde
padding
título pequeño
número grande

Consejo importante:

No copies y pegues 3 veces el mismo JSX.

Piensa:

“Esto parece reutilizable”

Entonces probablemente deberías tener:

un componente StatCard

que recibe:

título
valor