export function fetchTask(fallbackFunction) {
    let alltasks = JSON.parse(localStorage.getItem('taskData')) || [];

    for (let task of alltasks) {

        let taskName = task.taskName;
        let taskPiority = task.taskPiority;
        let taskCreated = task.taskCreated;
        let labelValue = task.label;
        let timeComplete = task.timeComplete;


        if (typeof fallbackFunction === 'function') {
            fallbackFunction(taskName, taskPiority, labelValue, timeComplete, taskCreated);
        }
    }
}
