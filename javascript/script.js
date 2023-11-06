document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const showHideCompleted = document.getElementById('showHideCompleted')

    // Show/hind text completed to be able clicked and 
    showHideCompleted.addEventListener('click', function(){
        if (showHideCompleted.textContent ===  "show completed"){
            showHideCompleted.textContent = "hide completed"; 
             showCompleted()
        
        }
            else {
            showHideCompleted.textContent = "show completed"; 
            hideCompleted()
        
        }
    }
    )



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
            <input class="todo-text" type=""text value="${text}" disable>
            
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
        updateListOrder(); 
    }



    // after toggle complete,  sort the list item 
    function updateListOrder(){
        const completedItems = document.querySelectorAll('.complete');
        completedItems.forEach(item => todoList.prepend(item))

    }
function hideCompleted(){
    const completedItems = document.querySelectorAll('.complete');
    completedItems.forEach(item => item.classList.add('hidden')); 
}

function showCompleted(){
    const completedItems = document.querySelectorAll('.complete');
    completedItems.forEach(item => item.classList.remove('hidden')); 
}


});




