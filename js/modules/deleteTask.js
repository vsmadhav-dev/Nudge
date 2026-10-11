export function deleteTask(task){
    let taskData = JSON.parse(localStorage.getItem('taskData')) || [];
    let normalizedTask = task.toLowerCase().trim();
    let filteredTaskData = taskData.filter((item) => item.taskName?.toLowerCase().trim() !== normalizedTask);
    localStorage.setItem('taskData', JSON.stringify(filteredTaskData));
    return filteredTaskData.length !== taskData.length;
}