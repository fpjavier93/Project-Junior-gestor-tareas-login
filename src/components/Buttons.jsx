import { ArrowLeft, LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

function Blue({ name, onClick = undefined, type, disabled }) {
    return <Button disabled={disabled} type={type} onClick={onClick}>{name}</Button>
}

function White({ name, type, onClick }) {
    return <Button variant="outline" type={type} onClick={onClick}>{name}</Button>
}

function LogOut({ onclick }) {
    return (
        <Button variant="ghost" onClick={onclick}>
            <LogOutIcon data-icon="inline-start" />
            Cerrar sesión
        </Button>
    )
}

function Inicio({ onclick }) {
    return (
        <Button variant="ghost" onClick={onclick}>
            <ArrowLeft data-icon="inline-start" />
            Volver a inicio
        </Button>
    )
}

export { Blue, White, LogOut, Inicio }