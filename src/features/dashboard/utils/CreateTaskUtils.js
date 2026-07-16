export function calcDiffInDays(task, today) {

    const todayDate = new Date(today);
    const dueDate = new Date(task.due_date);
    const diffInDays = (dueDate - todayDate) / (1000 * 60 * 60 * 24);

    return diffInDays;
}