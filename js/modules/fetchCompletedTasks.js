import {addTaskInUi} from "./addtaskinui.js";

export function fetchCompletedTasks(callback, wantCompleted) {
    const allTasks = JSON.parse(localStorage.getItem('taskData')) || [];
    const todoList = document.querySelector('#todoList');
    todoList.innerHTML = '';

    for (const task of allTasks) {
        if (!!task.checked === wantCompleted) {
            callback(task.taskName, task.taskPiority, task.label,
                     task.timeComplete, task.taskCreated, task.checked);
        }
    }
}