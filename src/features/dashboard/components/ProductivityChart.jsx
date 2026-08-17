import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ProductivityChart({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Productividad semanal</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Tareas completadas en los últimos 7 días.
                </p>
            </CardHeader>

            <CardContent>
                <div className="w-full h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid vertical={false} />

                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    `${value} tareas`,
                                    "Completadas",
                                ]}
                            />

                            <Bar
                                dataKey="completed"
                                fill="#10b981"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}