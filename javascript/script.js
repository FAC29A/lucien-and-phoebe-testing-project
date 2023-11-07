
    const listElement = document.getElementById("list");
    const createBtnElement = document.getElementById("create");

    
    
    let toDo = [];

    createBtnElement.addEventListener('click', CreateNewTodo);

    function CreateNewTodo () {
        const item = {
            id: new Date().getTime(),
            text: "",
            complete: false
        }
        toDo.unshift(item);

        const { itemElement, inputElement } = CreateTodoElement(item);

        listElement.prepend(itemElement);

        inputElement.removeAttribute("disabled");
        inputElement.focus();

        Save();
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

            listElement.append(itemElement);
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








