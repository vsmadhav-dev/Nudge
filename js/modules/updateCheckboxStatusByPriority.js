let priorityToFind = '';
export function  updateCheckboxStatusByPriority(taskName , isChecked)
{
    let taskData = JSON.parse(localStorage.getItem('taskData'));
    for (let i = 0; i <taskData.length; i++){
        if (taskName == taskData[i].taskName){
        priorityToFind  = taskData[i]. taskPiority;
        }
    }
    let taskDataByPriority = JSON.parse(localStorage.getItem(`priority-${priorityToFind}task`));
    taskDataByPriority.checked = isChecked;
    return true;
}
