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

    listItem.querySelector('.circle').addEventListener('click', toggleComplete);
    todoList.appendChild(listItem);
}

function toggleComplete() {
    const circle = this;
    const listItem = circle.parentElement;
    listItem.classList.toggle('complete');
    listItem.querySelector('.circle').classList.toggle('complete');
    listItem.querySelector('.todo-text').classList.toggle('complete-text');
}