
    const listElement = document.getElementById("list");

    // this is actually the to do input     change the variable name later 
    const createBtnElement = document.getElementById('todoInput');

    
    
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
    
        listElement.prepend(itemElement);
        
    
        // inputElement.removeAttribute("disabled");
        // inputElement.focus();
        console.log(inputElement)
    
        save();

        }

}

    


    function CreateTodoElement(item) {
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
        inputElement.setAttribute("readonly","");

        const actionElement = document.createElement("div");
        actionElement.classList.add("actions");

        

        const removeButtonElement = document.createElement("button");
        removeButtonElement.classList.add("materialIcons","removeButton");
        removeButtonElement.innerText = "removeCircle";

       
        actionElement.append(removeButtonElement);

        itemElement.append(checkbox);
        itemElement.append(inputElement);
        itemElement.append(actionElement);

        // Event

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
        // test and commnet out after below 3 lines
        inputElement.addEventListener("input", () => {
            item.text = inputElement.value;
        })

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

       

        removeButtonElement.addEventListener("click", () => {
            toDo = toDo.filter(t => t.id != item.id);

            itemElement.remove();
            console.log("remooooove"); 
            save();
        })

        return { itemElement,inputElement,removeButtonElement };



       
    }

    // function createNewToDo (toDoValue) {
    //     const item = {
    //         id : new Date().getTime(),
    //         text : "",
    //         complete : false
    //     }

    //     toDo.unshift(item);

    //     const { itemElement, inputElement } = addToDoItem(item);

    // }

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








