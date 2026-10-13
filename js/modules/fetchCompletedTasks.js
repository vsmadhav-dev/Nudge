import {addTaskInUi} from "./addtaskinui.js";

export function fetchCompletedTasks() {
    let allTasks = JSON.parse(localStorage.getItem('taskData'));
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['checked'] == 'true') {
            let taskName = allTasks[i].taskName;
            let taskPiority = allTasks[i].taskPiority;
            let taskCreated = allTasks[i].taskCreated;
            let labelValue = allTasks[i].label;
            let timeComplete = allTasks[i].timeComplete;
            let isChecked = allTasks[i].checked;
        todoList.innerHTML = '';
        addTaskInUi(taskName, taskPiority, labelValue, timeComplete, taskCreated, isChecked);
        }

    }
}