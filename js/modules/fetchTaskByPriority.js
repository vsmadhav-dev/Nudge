import {addTaskInUi} from "./addtaskinui.js";

export function fetchTaskByPriority(priority){
    let lowercasedPriority = priority.toLowerCase();
    let allTasks = JSON.parse(localStorage.getItem(`${lowercasedPriority}task`));
    for (let task of allTasks) {
        let taskName = task.taskName;
        let taskPiority = task.taskPiority;
        let taskCreated = task.taskCreated;
        let labelValue = task.label;
        let timeComplete = task.timeComplete;
        let isChecked = task.checked || false;
    addTaskInUi(taskName , taskPiority , labelValue ,timeComplete , taskCreated , isChecked);

    }
    return true;
}