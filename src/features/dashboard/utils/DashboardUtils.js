async function generarTareasAleatorias(cantidad) {

    return new Promise((resolve) => {
        setTimeout(() => {
            const titulos = [
                "Refactorizar el módulo de autenticación",
                "Crear formulario de login",
                "Optimizar consultas del dashboard",
                "Agregar validación de inputs",
                "Corregir bug del menú lateral"
            ];

            const descripciones = [
                "Migrar a JWT con refresh token y revisar el guard.",
                "Diseñar interfaz y conectar API.",
                "Reducir tiempo de carga de datos.",
                "Evitar datos vacíos en formularios.",
                "Arreglar comportamiento responsive."
            ];

            const estados = ["Pendiente", "En progreso", "Completada"];

            const tareas = [];

            for (let i = 1; i <= cantidad; i++) {

                const tarea = {
                    id: i,
                    titulo: titulos[Math.floor(Math.random() * titulos.length)],
                    descripcion: descripciones[Math.floor(Math.random() * descripciones.length)],
                    estado: estados[Math.floor(Math.random() * estados.length)],
                    completada: Math.random() > 0.5
                };

                tareas.push(tarea);
            }
            resolve(tareas);
        }, 2000);
    });

}

export default generarTareasAleatorias;
