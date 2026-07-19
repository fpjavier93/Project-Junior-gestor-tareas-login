import { Card as ShadcnCard, CardContent, CardDescription } from "@/components/ui/card"

function Card({ name, value }) {
    return (
        <ShadcnCard>
            <CardContent className="space-y-2">
                <CardDescription className="text-xs font-medium uppercase">{name}</CardDescription>
                <p className="text-3xl font-semibold tracking-tight">{value}</p>
            </CardContent>
        </ShadcnCard>
    )
}

export { Card }