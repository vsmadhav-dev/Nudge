import {addTaskInUi} from "./addtaskinui.js";

export function pushTaskByPriority(taskDetails) {
    let priorityToFetch = taskDetails['taskPiority'];
    let tasks = JSON.parse(localStorage.getItem(`${priorityToFetch}task`)) || [];
    tasks.push(taskDetails);
    localStorage.setItem(`${priorityToFetch}task`, JSON.stringify(tasks));
    // for (let task of tasks) {
    //     let taskName = task.taskName;
    //     let taskPiority = task.taskPiority;
    //     let taskCreated = task.taskCreated;
    //     let labelValue = task.label;
    //     let timeComplete = task.timeComplete;
    //     let isChecked = task.checked || false;
    //
    //     // addTaskInUi(taskName, taskPiority, labelValue, timeComplete, taskCreated, isChecked);
    // }
    return true;
}
