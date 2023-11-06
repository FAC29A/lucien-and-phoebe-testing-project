document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const showHideCompleted = document.getElementById('showHideCompleted')

    let defaultHideCompleted = true; // A flag to set the default state to hide completed

  

    // Show/hind text in button to be able clicked and toggle
    showHideCompleted.addEventListener('click', function(){
        if (showHideCompleted.textContent == "show completed"){
            showHideCompleted.textContent = "hide completed"; 
             showCompleted()
        
        }
            else {
            showHideCompleted.textContent = "show completed"; 
            hideCompleted()
        
        }
    }
    )

    // event listner press enter once finish the input will push the item to list and create a new line of  input 
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

        // if complete is in show status, and list has any items that is complete. the item will be hidden
        if (defaultHideCompleted && listItem.classList.contains('complete')) {
            listItem.classList.add('hidden');
        }
        // if the items has any items that is complete. the item will move to the top of list, otherwise any uncomplete new item will be add from buttom of list  
        if (listItem.classList.contains('complete')) {
            todoList.prepend(listItem); // Move completed items to the top
        } else {
            todoList.appendChild(listItem);
        }
        // evenlistener to click circle on the list and toggle completed
        listItem.querySelector('.circle').addEventListener('click', toggleComplete);
    }

    


    function toggleComplete() {
        const circle = this;
        const listItem = circle.parentElement;
        listItem.classList.toggle('complete');
        listItem.querySelector('.circle').classList.toggle('complete-circle');
        listItem.querySelector('.todo-text').classList.toggle('complete-text');
        if (defaultHideCompleted) {
            // If it's set to hide completed by default, hide the item
            listItem.classList.add('hidden');
            updateListOrder(); 
        }else {
            updateListOrder(); 
        }
        
        
        
        // updateListOrder(); 
    }



    // after toggle complete,  sort the list item 
    function updateListOrder(){
        const completedItems = document.querySelectorAll('.complete');
        completedItems.forEach(item => todoList.prepend(item))
    }
function hideCompleted(){
        defaultHideCompleted = true; // Set the flag to hide completed items
        const completedItems = document.querySelectorAll('.complete');
        completedItems.forEach(item => item.classList.add('hidden'));
}

function showCompleted(){
        defaultHideCompleted = false; // Set the flag to show completed items
        const completedItems = document.querySelectorAll('.complete');
        completedItems.forEach(item => item.classList.remove('hidden'));
}


});




