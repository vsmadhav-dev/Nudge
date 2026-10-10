export function updateCheckboxStatus(taskNameText, isChecked) {
    let taskData = JSON.parse(localStorage.getItem('taskData')) || [];

    for (let task of taskData) {
        if (task.taskName.toLowerCase().trim() === taskNameText.toLowerCase().trim()) {
            task.checked = isChecked;
            let found = true
            if(found){
                console.log('found');
            }
            break;
        }
    }

    localStorage.setItem('taskData', JSON.stringify(taskData));
    return true;
}