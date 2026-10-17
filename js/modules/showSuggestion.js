export function showSuggestionScreen() {
    const taskName = localStorage.getItem('selectedTask') || '';

    // Header: the task name that was saved when the AI button was clicked
    document.querySelector('.topbar__task').textContent = taskName;

    // Remove the whole AI message (summary, steps and tip)
    document.querySelector('.message').remove();
}