import {addTaskInUi} from "./addtaskinui.js";

export function fetchTaskByPriority(priority) {
let allTasks;
    let lowercasedPriority = priority.toLowerCase();
    if(lowercasedPriority == 'all'){
         allTasks = JSON.parse(localStorage.getItem('taskData'));
    }else {
        allTasks = JSON.parse(localStorage.getItem(`priority-${lowercasedPriority}task`));
    }
     todoList.innerHTML = '';
    for (let task of allTasks) {
        let taskName = task.taskName;
        let taskPiority = task.taskPiority;
        let taskCreated = task.taskCreated;
        let labelValue = task.label;
        let timeComplete = task.timeComplete;
        let isChecked = task.checked || false;
        addTaskInUi(taskName, taskPiority, labelValue, timeComplete, taskCreated, isChecked);

    }
    return true;
}