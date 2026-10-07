
export function pushItem(item) {
    let taskData = JSON.parse(localStorage.getItem('taskData')) || [];
    taskData.push(item);
    localStorage.setItem('taskData', JSON.stringify(taskData));
    return true;
}