// Escape text so a task name or label can never be run as HTML
function escapeHtml(text) {
    return String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// "2026-10-28" -> "28 Oct" (adds the year only when it isn't this year).
// Built from the parts, not new Date("2026-10-28"), which is read as UTC
// and can show the previous day in some time zones.
function formatDueDate(isoDate) {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-').map(Number);
    if (!y || !m || !d) return '';
    return new Date(y, m - 1, d).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: y === new Date().getFullYear() ? undefined : 'numeric'
    });
}

export function addTaskInUi(name, piorityValue, labelValue, timetocomplete, timeCreated, isChecked = false, dueDate = '') {
    const todoList = document.querySelector('#todoList');

    let li = document.createElement('li');
    let priorityClass = piorityValue === 'high' ? 'priority-high' : piorityValue === 'medium' ? 'priority-medium' : '';
    let completedClass = isChecked ? 'completed' : '';
    li.className = `todo-card ${priorityClass} ${completedClass}`;

    const dueText = formatDueDate(dueDate);

    li.innerHTML = `
        <label class="custom-checkbox">
            <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''}>
            <span class="checkmark"></span>
        </label>
        <div class="todo-content">
            ${dueText ? `<span class="todo-due">Due ${escapeHtml(dueText)}</span>` : ''}
            <span class="todo-title">${escapeHtml(name)}</span>
            <div class="todo-meta">
                ${labelValue ? `<span class="tag ${piorityValue === 'high' ? 'tag-high' : 'tag-medium'}">${escapeHtml(labelValue)}</span>` : ''}
                <span class="todo-time">${escapeHtml(timetocomplete || timeCreated)}</span>
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