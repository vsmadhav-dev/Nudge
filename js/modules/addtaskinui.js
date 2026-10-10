export function addTaskInUi(name , piorityValue , labelValue , timetocomplete , timeCreated){
    let li = document.createElement('li');
    li.classList.add('todo-card');
    let priorityClass = piorityValue === 'high' ? 'priority-high' : piorityValue === 'medium' ? 'priority-medium' : '';
    let completedClass = isChecked ? 'completed' : '';
    li.className = `todo-card ${priorityClass} ${completedClass}`;

    li.innerHTML = `
        <label class="custom-checkbox">
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <div class="todo-content">
            <span class="todo-title">${name}</span>
            <div class="todo-meta">
                ${labelValue ? `<span class="tag ${piorityValue === 'high' ? 'tag-high' : 'tag-medium'}">${labelValue}</span>` : ''}
                <span class="todo-time">${timetocomplete || timeCreated}</span>
            </div>
        </div>
        <div class="todo-actions">
            <button type="button" class="btn-icon btn-ai" title="Get AI Suggestions">
                <span class="material-symbols-outlined">auto_awesome</span>
            </button>
            <button type="button" class="btn-icon btn-delete" title="Delete Task">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    `;

    todoList.prepend(li);
}
