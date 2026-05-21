# map en React

{productos.map(producto => (
  <p>{producto.nombre}</p>
))}

validar email
const email = e.target.value.trim();

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
console.log('email invalido')
return
} 
console.log(email)


Los grupos MÁS importantes

Texto
text-
font-
leading-
tracking-

Espaciado
p-
m-
gap-
space-y-

Flexbox
flex
justify-
items-
flex-col

Tamaños
w-
h-
max-w-
min-h-

Bordes y colores
bg-
border-
rounded-
shadow-