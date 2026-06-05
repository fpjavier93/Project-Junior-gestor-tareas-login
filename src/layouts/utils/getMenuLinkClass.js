// get       = obtiene/calcula algo
//MenuLink  -> para links del menú
// ClassName = devuelve clases CSS para className

export default function getMenuLinkClassName(isActive) {
    return (
        isActive
            ? "block w-full  px-3 py-2 text-sm font-medium text-white border border-transparent hover:bg-indigo-300 bg-indigo-600"
            : "block w-full  px-3 py-2 text-sm font-medium text-white border border-transparent hover:bg-indigo-300"
    )
};

function handleDrewer(isDrewer,) {

}