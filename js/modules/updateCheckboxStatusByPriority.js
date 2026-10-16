let priorityToFind = '';
export function updateCheckboxStatusByPriority(taskName, isChecked)
{
    let taskData = JSON.parse(localStorage.getItem('taskData'));
    for (let i = 0; i < taskData.length; i++){
        if (taskName == taskData[i].taskName){
            priorityToFind = taskData[i].taskPiority;
        }
    }
    let taskDataByPriority = JSON.parse(localStorage.getItem(`priority-${priorityToFind}task`));

    for (let i = 0; i < taskDataByPriority.length; i++){
        if (taskName == taskDataByPriority[i].taskName){
            taskDataByPriority[i].checked = isChecked;
        }
    }

    localStorage.setItem(`priority-${priorityToFind}task`, JSON.stringify(taskDataByPriority));
    return true;
}