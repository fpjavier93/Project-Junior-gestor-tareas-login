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