export function deleteTask(task){
    let taskData = JSON.parse(localStorage.getItem('taskData'));
    for(let i of taskData){
        if(i['taskName'].toLowerCase() == task.trim()){
            let indexToDelete = taskData.indexOf(i);
            taskData.splice(indexToDelete , 1);
        }
    }
    localStorage.setItem('taskData', JSON.stringify(taskData));
    return true;
}