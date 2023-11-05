document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    todoInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && todoInput.value.trim() !== '') {
            addTodoItem(todoInput.value);
            todoInput.value = '';
        }
    });

    function addTodoItem(text) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="circle"></div>
            <span class="todo-text">${text}</span>
        `;
        todoList.appendChild(listItem);
        listItem.querySelector('.circle').addEventListener('click', toggleComplete);
    }

    function toggleComplete() {
        const circle = this;
        const listItem = circle.parentElement;
        listItem.classList.toggle('complete');
        listItem.querySelector('.circle').classList.toggle('complete-circle');
        listItem.querySelector('.todo-text').classList.toggle('complete-text');
    }

    // write a function - "completed item automatic push to the top of list"
    // write a function - "the completed items can be toggle to hide or show"
    // write a fucntion - "the completed items to move to the top  "
});