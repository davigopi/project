document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const submitButton = taskForm.querySelector('button[type="submit"]');
    let currentTaskItem = null;

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentTaskItem) {
            updateTask(currentTaskItem, taskInput.value);
        } else {
            addTask(taskInput.value);
        }
        taskInput.value = '';
        submitButton.textContent = '➕';
        submitButton.classList.remove('edited-task');
        currentTaskItem = null;
    });

    function addTask(task) {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        const editButton = document.createElement('button');
        editButton.textContent = '✏️'; 
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => editTask(taskItem));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️'; 
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(taskItem));

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        taskItem.appendChild(buttonGroup);
        taskList.appendChild(taskItem);
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
    }

    function editTask(taskItem) {
        taskInput.value = taskItem.firstChild.textContent;
        submitButton.textContent = '✏️';
        submitButton.classList.add('edited-task');
        currentTaskItem = taskItem;
    }

    function updateTask(taskItem, newTask) {
        taskItem.firstChild.textContent = newTask;

    }
});
