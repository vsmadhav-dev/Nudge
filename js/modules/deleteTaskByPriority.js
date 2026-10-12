export function  deleteTaskByPriority(taskName , priorityClass){
    let taskData = JSON.parse(localStorage.getItem(`${priorityClass}task`));
    for(let i of taskData){
        if(i['taskName'].trim() == taskName.trim()){
            let indexToDelete = taskData.indexOf(i);
            taskData.splice(indexToDelete , 1);
        }
    }
    localStorage.setItem(`${priorityClass}task`, JSON.stringify(taskData));
    return true;

}