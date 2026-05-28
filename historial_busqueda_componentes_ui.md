# Historial: Como buscar componentes y efectos visuales UI

## Tema

Como aprender a buscar efectos visuales o componentes para React/Tailwind sin tener que preguntar siempre.

## Caso concreto

El componente buscado era un switch lateral de encendido/apagado para tareas:

- Estado pendiente.
- Al hacer click cambia a realizada.
- Visualmente se conoce como toggle switch.

## Nombres comunes para buscar

- toggle switch
- switch component
- toggle button
- status switch
- checkbox toggle switch
- accessible switch component

## Busquedas recomendadas

En ingles:

```txt
tailwind toggle switch
react toggle switch tailwind
task status toggle switch react
checkbox toggle switch tailwind
accessible switch component react
```

En espanol:

```txt
interruptor toggle react tailwind
switch encendido apagado tailwind
boton toggle react
```

Conviene buscar en ingles porque hay mucho mas contenido.

## Donde buscar

- Tailwind CSS docs: https://tailwindcss.com/docs
- Tailwind UI: https://tailwindcss.com/plus/ui-blocks
- Flowbite: https://flowbite.com/docs/forms/toggle/
- DaisyUI: https://daisyui.com/components/toggle/
- Headless UI Switch: https://headlessui.com/react/switch
- shadcn/ui Switch: https://ui.shadcn.com/docs/components/switch
- Radix UI Switch: https://www.radix-ui.com/primitives/docs/components/switch

## Idea importante

Tailwind normalmente no trae componentes ya listos. Tailwind trae clases CSS para construirlos.

Por ejemplo, para un switch se suelen usar clases como:

```txt
bg-green-500
rounded-full
translate-x-5
transition
peer-checked
```

## Dos caminos posibles

### Tailwind puro

Buscar:

```txt
tailwind css toggle switch
```

Normalmente se hace con un `input type="checkbox"` oculto y un `label` estilizado.

Es bueno para aprender CSS, estados visuales y Tailwind.

### Libreria de componentes

Buscar:

```txt
react switch component
```

Opciones recomendadas:

- Headless UI
- Radix UI
- shadcn/ui
- Flowbite
- DaisyUI

Es bueno cuando se quiere algo mas profesional, accesible y mantenible.

## Camino recomendado para aprender

1. Buscar primero `tailwind toggle switch checkbox`.
2. Mirar 2 o 3 ejemplos.
3. Identificar las piezas: `checkbox`, `checked`, `rounded-full`, `translate`, `transition`.
4. Luego buscar `headless ui switch react`.
5. Comparar la diferencia entre hacerlo manualmente y usar una libreria.

## Palabras clave utiles

Cuando no sepas como se llama algo visual, prueba combinar estas palabras:

```txt
component
ui component
react component
tailwind component
interaction
animation
microinteraction
toggle
switch
badge
dropdown
modal
tabs
accordion
toast
tooltip
skeleton loader
empty state
```

## Formula practica de busqueda

Buscar como:

```txt
nombre del componente + framework + libreria de estilos
```

Ejemplos:

```txt
toggle switch react tailwind
modal react tailwind
tabs react tailwind
skeleton loader react tailwind
```

Para el caso de tareas:

```txt
react tailwind toggle switch component
react task status switch tailwind
tailwind toggle complete pending task
accessible react switch component
```

La frase mas exacta:

```txt
react tailwind toggle switch component
```

Para algo mas robusto:

```txt
headless ui switch react tailwind
```
