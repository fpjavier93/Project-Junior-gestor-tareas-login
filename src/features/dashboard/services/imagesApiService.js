
export async function getTaskImages() {
    const response = await fetch("https://picsum.photos/v2/list?page=2&limit=18");

    if (!response.ok) {
        throw new Error("No se pudieron cargar las imagenes");
    }

    return response.json();

}