import { useNavigate } from "react-router-dom"
import { ArrowRight, CheckCircle2, CircleDashed, ListTodo } from "lucide-react"
import { Card } from "../../../components/Card"
import { useEffect, useState } from "react"
import { handlesignOut as handleSignOut } from "../services/DashboardServices"
import { getCurrentUser } from "../../auth/services"
import ProgressBarDashboard from "../../../components/ProgressBarDashboard"
import { getTasks } from "../services/tasksApiServices"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorMessage from "../../../components/ErrorMessage"
import { RisentltyTask } from "../components/TaskCardDashboard"
import { calcDiffInDays } from "../utils/CreateTaskUtils"
import { Button } from "@/components/ui/button"
import { Card as ShadcnCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Dashboard() {
    const today = new Date().toISOString().split("T")[0]
    const navigate = useNavigate()
    const [userTasks, setUserTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
        handleTasks()
    }, [])

    const handleTasks = async () => {
        try {
            setLoading(true)
            const currentUser = await getCurrentUser()
            if (!currentUser.success || !currentUser.user) throw new Error(currentUser.error || "No se pudo obtener el usuario actual")
            setUserName(currentUser.user.user_metadata?.nombre || currentUser.user.email || "Usuario")
            setUserTasks(await getTasks())
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const completedTasks = userTasks.filter((task) => task.status === "completed").length
    const progress = userTasks.length > 0 ? (completedTasks * 100) / userTasks.length : 0

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage error="Error al cargar la página" onTryAgain={handleTasks} onCancel={() => handleSignOut(navigate)} />

    return (
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">Hola, {userName}</h1>
                <p className="mt-1 text-sm text-muted-foreground">Este es el resumen actual de tus tareas.</p>
            </header>
            <section className="grid gap-4 sm:grid-cols-3">
                <div className="relative"><ListTodo className="absolute right-4 top-4 size-5 text-muted-foreground" /><Card name="Total" value={userTasks.length} /></div>
                <div className="relative"><CircleDashed className="absolute right-4 top-4 size-5 text-amber-600" /><Card name="Pendientes" value={userTasks.length - completedTasks} /></div>
                <div className="relative"><CheckCircle2 className="absolute right-4 top-4 size-5 text-emerald-600" /><Card name="Completadas" value={completedTasks} /></div>
            </section>
            <ProgressBarDashboard progress={progress} />
            <ShadcnCard>
                <CardHeader className="flex-row items-center justify-between border-b">
                    <CardTitle>Tareas recientes</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/tasks")}>Ver todas<ArrowRight data-icon="inline-end" /></Button>
                </CardHeader>
                <CardContent className="px-0">
                    {userTasks.length === 0
                        ? <p className="px-4 py-10 text-center text-sm text-muted-foreground">Todavía no tienes tareas.</p>
                        : userTasks.slice(0, 4).map((task) => <RisentltyTask key={task.id} task={task} today={today} diffInDays={calcDiffInDays(task, today)} />)}
                </CardContent>
            </ShadcnCard>
        </main>
    )
}

export default Dashboard