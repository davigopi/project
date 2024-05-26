function adicionarTarefa() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const newTaskItem = document.createElement('li');
        newTaskItem.classList.add('task-item');
        const taskDiv = document.createElement('div');
        newTaskItem.textContent = taskText;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = function() {
            if (checkbox.checked) {
                newTaskItem.classList.add('completed');
            } else {
                newTaskItem.classList.remove('completed');
            }
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            taskList.removeChild(newTaskItem);
        };

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(deleteButton);
        newTaskItem.appendChild(taskDiv);
        taskList.appendChild(newTaskItem);

        taskInput.value = '';
    } else {
        alert('Por favor, insira uma tarefa válida.');
    }
}
