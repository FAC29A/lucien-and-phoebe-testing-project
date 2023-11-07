
    

    // todoInput is textarea element  of input 
    const toDo = [];

    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const showHideCompleted = document.getElementById('showHideCompleted')

    let defaultHideCompleted = true; // A flag to set the default state to hide completed



    // // Show/hind text in button to be able clicked and toggle
    // showHideCompleted.addEventListener('click', function(){
    //     if (showHideCompleted.textContent == "show completed"){
    //         showHideCompleted.textContent = "hide completed"; 
    //          showCompleted(); 

    //     }
    //         else {
    //         showHideCompleted.textContent = "show completed"; 
    //         hideCompleted()
        
    //     }
    // }
    // )
    // todoInput.addEventListener('input', function(){
    //     this.style.height = auto; 
    //     this.style.height = this.scrollHeight + 'px'; 
    // })


    // event listner press enter once finish the input will push the item to list and create a new line of  input 
    todoInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && todoInput.value.trim() !== '') {

            const toDoValue = todoInput.value;
            createNewToDo(toDoValue);

            todoInput.value = '';
        }
    });


    function addToDoItem(item) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.complete;

        if (item.complete) {
            itemElement.classList.add("complete");
        }

        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = item.text;
        inputElement.setAttribute("disabled","");

        const actionElement = document.createElement("div");
        actionElement.classList.add("actions");

        const editButtonElement = document.createElement("button");
        editButtonElement.classList.add("materialIcons");
        editButtonElement.innerText = "edit";

        const removeButtonElement = document.createElement("button");
        removeButtonElement.classList.add("materialIcons","removeButton");
        removeButtonElement.innerText = "removeCircle";

        actionElement.append(editButtonElement);
        actionElement.append(removeButtonElement);
        itemElement.append(checkbox);
        itemElement.append(inputElement);
        itemElement.append(actionElement);

        checkbox.addEventListener("change", () => {
            item.complete = checkbox.checked;
            if (item.complete) {
                itemElement.classList.add("complete");
            }
            else {
                itemElement.classList.remove("complete");
            }
            save();
        })

        inputElement.addEventListener("input", () => {
            item.text = inputElement.value;
        })

        inputElement.addEventListener("blur", () => {
            inputElement.setAttribute("disabled","");
            save();
        })

        editButtonElement.addEventListener("click", () => {
            inputElement.removeAttribute("disabled");
            inputElement.focus();
        })

        removeButtonElement.addEventListener("click", () => {
            toDo = toDo.filter(t => t.id != item.id);
            itemElement.remove();
            save();
        })

        return { itemElement,inputElement,editButtonElement,removeButtonElement };



        // const listItem = document.createElement('li');
        // listItem.innerHTML = `
        //     <div class="circle"></div>
        //     <textarea class="todo-text"  disable>${text}</textarea>
        // `;

        // // if complete is in show status, and list has any items that is complete. the item will be hidden
        // if (defaultHideCompleted && listItem.classList.contains('complete')) {
        //     listItem.classList.add('hidden');
        // }
        // // if the items has any items that is complete. the item will move to the top of list, otherwise any uncomplete new item will be add from buttom of list  
        // if (listItem.classList.contains('complete')) {
        //     todoList.prepend(listItem); // Move completed items to the top
        // } else {
        //     todoList.appendChild(listItem);
        // }
        // // evenlistener to click circle on the list and toggle completed
        // listItem.querySelector('.circle').addEventListener('click', toggleComplete);
    }

    function createNewToDo (toDoValue) {
        const item = {
            id : new Date().getTime(),
            text : "",
            complete : false
        }

        toDo.unshift(item);

        const { itemElement, inputElement } = addToDoItem(item);

    }

    function displayToDos() {
        load();

        for (let i=0; i<toDo.length;i++) {
            const item = toDo[i];

            const itemElement = addToDoItem(item);

            todoList.append(itemElement);
        }
    }

    displayToDos();

    function save() {
        const save = JSON.stringify(toDo);
        localStorage.setItem("my_to_dos", save);
    }

    function load() {
        const data = localStorage.getItem("my_to_dos");

        if (data) {
            toDo = JSON.parse(data);
        }
    }


//     function toggleComplete() {
//         const circle = this;
//         const listItem = circle.parentElement;
//         listItem.classList.toggle('complete');
//         listItem.querySelector('.circle').classList.toggle('complete-circle');
//         listItem.querySelector('.todo-text').classList.toggle('complete-text');
//         if (defaultHideCompleted) {
//             // If it's set to hide completed by default, hide the item. and then put the complete item to top of list 
//             updateListOrder(); 
//             listItem.classList.add('hidden');
            
//         }else {
//             // if it's not hidden, then just simple put the completed items to the top of the list 
//             updateListOrder(); 
//         }
//     }



//     // after toggle complete,  sort the list item 
//     function updateListOrder(){
//         const completedItems = document.querySelectorAll('.complete');
//         completedItems.forEach(item => todoList.prepend(item))
//     }
// function hideCompleted(){
//         defaultHideCompleted = true; // Set the flag to hide completed items
//         const completedItems = document.querySelectorAll('.complete');
//         completedItems.forEach(item => item.classList.add('hidden'));
// }

// function showCompleted(){
//         defaultHideCompleted = false; // Set the flag to show completed items
//         const completedItems = document.querySelectorAll('.complete');
//         completedItems.forEach(item => item.classList.remove('hidden'));
//         updateListOrder(); // Move completed items to the top
// }







