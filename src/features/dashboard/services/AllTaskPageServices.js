import { editTask } from "./tasksApi";

async function updateStatusTask(task_id, updateFields) {
    return editTask(task_id, updateFields);
}





export { updateStatusTask, };
