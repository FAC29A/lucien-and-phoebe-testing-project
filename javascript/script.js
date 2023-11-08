
    const listElement = document.getElementById("list");

    // this is actually the to do input     change the variable name later 
    const createBtnElement = document.getElementById('todoInput');

    let defaultHideCompleted = true; // A flag to set the default state to hide completed

    // Show/hind text in button to be able clicked and toggle
    showHideCompleted.addEventListener('click', function(){
        if (showHideCompleted.textContent == "show completed"){
            showHideCompleted.textContent = "hide completed"; 
             showCompleted(); 
        }
            else {
            showHideCompleted.textContent = "show completed"; 
            hideCompleted(); 
        }
    }
    )

     // adjust input's textarea element height based on content text
     createBtnElement.addEventListener('input', function(){
        this.style.height = "auto"; 
        this.style.height = this.scrollHeight + 'px'; 
    })

    
    let toDo = [];

    createBtnElement.addEventListener('keyup', function(event){ CreateNewTodo(event)});

    function CreateNewTodo (event) {
        if(event.key ==="Enter" & createBtnElement.value.trim() !== "" ){
            const item = {
                id: new Date().getTime(),
                text: "",
                complete: false
            }

        // input's value assign foor item object's text property
        item.text = createBtnElement.value
        createBtnElement.value = '';

        toDo.unshift(item);

        const { itemElement, inputElement } = CreateTodoElement(item);
    
        // listElement.prepend(itemElement);
        
        // console.log(inputElement)

        // if the items has any items that is complete. the item will move to the top of list, otherwise any uncomplete new item will be add from buttom of list  
        if (itemElement.classList.contains('complete')) {
            listElement.prepend(itemElement); // Move completed items to the top
        } else {
            listElement.appendChild(itemElement);
        }
    
        save();

        }

}

    


    function CreateTodoElement(item) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        // const checkbox = document.createElement("input");
        // checkbox.type = "checkbox";
        // checkbox.checked = item.complete;

        // if (item.complete) {
        //     itemElement.classList.add("complete");
        // }

        const circle = document.createElement("div");
        circle.classList.add("circle");

        

        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = item.text;
        inputElement.setAttribute("readonly","");

        const actionElement = document.createElement("div");
        actionElement.classList.add("actions");

        

        const removeButtonElement = document.createElement("button");
        removeButtonElement.classList.add("materialIcons","removeButton");
        removeButtonElement.innerText = "remove";

       
        actionElement.append(removeButtonElement);

        // itemElement.append(checkbox);
        itemElement.append(circle);
        itemElement.append(inputElement);
        itemElement.append(actionElement);

        if (item.complete) {
            itemElement.classList.add("complete");
        }

        
        // Event

        // checkbox.addEventListener("change", () => {
        //     item.complete = checkbox.checked;
        //     if (item.complete) {
        //         itemElement.classList.add("complete");
        //     }
        //     else {
        //         itemElement.classList.remove("complete");
        //     }
        //     save();
        // })


        // test and commnet out after below 3 lines
        inputElement.addEventListener("input", () => {
            item.text = inputElement.value;
        })

        circle.addEventListener("click", () => {
            item.complete = !item.complete; // Toggle the complete property
            updateItemAppearance(item, itemElement, circle); // Update the item's appearance
            save();
        });



        inputElement.addEventListener("blur", () => {
            inputElement.setAttribute("readonly","");
            console.log("blllllur")
            save();
        })
        let isEditMode = false;

        inputElement.addEventListener("click", () => {
            if (!isEditMode) {
                inputElement.removeAttribute("readonly");
                inputElement.focus();
                console.log("ediiiiiit");
                isEditMode = true;
            }
        });
        
        inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && isEditMode) {
                inputElement.setAttribute("readonly", "");
                console.log("enteeeeer");
                inputElement.blur();
                isEditMode = false;
            }
        });

       function updateItemAppearance(item, itemElement, circle) {
    if (item.complete) {
        itemElement.classList.add("complete");
        circle.classList.add("complete-circle")

    } else {
        itemElement.classList.remove("complete");
        circle.classList.remove("complete-circle")
    }


    if (defaultHideCompleted) {
        // If it's set to hide completed by default, hide the item. and then put the complete item to top of list 
        updateListOrder(); 
        itemElement.classList.add('hidden');
        
    }else {
        // if it's not hidden, then just simple put the completed items to the top of the list 
        updateListOrder(); 
    }
}



        removeButtonElement.addEventListener("click", () => {
            toDo = toDo.filter(t => t.id != item.id);

            itemElement.remove();
            console.log("remooooove"); 
            save();
        })

        // if complete is in show status, and list has any items that is complete. the item will be hidden
        if (defaultHideCompleted && itemElement.classList.contains('complete')) {
            listItem.classList.add('hidden');
        }


       


        

        return { itemElement,inputElement,removeButtonElement };


        
       
    }

  

    function displayToDos() {
        load();

        for (let i=0; i<toDo.length;i++) {
            const item = toDo[i];

            const {itemElement} = CreateTodoElement(item);

            listElement.appendChild(itemElement);
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


     // after toggle complete,  sort the list item 
     function updateListOrder(){
        const completedItems = document.querySelectorAll('.complete');
        completedItems.forEach(item => listElement.prepend(item))
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
        updateListOrder(); // Move completed items to the top
}







