export function buildProductivityData(tasks, days = 7, now = new Date()) {
    const completedPerDay = new Map();

    for (const task of tasks) {
        const isCompleted = task.status === "completed";
        const hasCompletionDate = Boolean(task.completed_at);

        if (!isCompleted || !hasCompletionDate) {
            continue;
        }

        const completionDate = new Date(task.completed_at);
        const isInvalidDate = Number.isNaN(completionDate.getTime());

        if (isInvalidDate) {
            continue;
        }

        const dayKey = getLocalDateKey(completionDate);
        const currentCount = completedPerDay.get(dayKey) || 0;

        completedPerDay.set(dayKey, currentCount + 1);
    }

    const chartData = [];

    for (let index = days - 1; index >= 0; index--) {
        const day = new Date(now);

        day.setHours(0, 0, 0, 0);
        day.setDate(day.getDate() - index);

        const dayKey = getLocalDateKey(day);

        chartData.push({
            date: dayKey,
            label: day
                .toLocaleDateString("es-ES", { weekday: "short" })
                .replace(".", ""),
            completed: completedPerDay.get(dayKey) || 0,
        });
    }

    return chartData;
}

function getLocalDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}