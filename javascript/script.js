// import { deafultGroups } from './index.data.js'

const listElement = document.getElementById("list");
const todoInputField = document.getElementById("todoInput");
const showHideCompleted = document.getElementById("showHideCompleted");
// >>>>
const categoryButtons = document.querySelectorAll(".category-button");
const addCategoryButton = document.getElementById("addCategory");
const categoriesContainer = document.getElementById("categoriesContainer");
let activeCategory = "All";

// >>>>
// use 'let' because need to change the variable later
let defaultHideCompleted = true; // A flag to set the default state to hide completed
let toDo = [];

// Show/hind text in button to be able clicked and toggle
showHideCompleted.addEventListener("click", function () {
  if (showHideCompleted.textContent == "show completed") {
    showHideCompleted.textContent = "hide completed";
    showCompleted();
  } else {
    showHideCompleted.textContent = "show completed";
    hideCompleted();
  }
});

// adjust input's textarea element height based on content text
todoInputField.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});
// >>>>
addCategoryButton.addEventListener("click", function () {
  const categoryName = prompt("Enter the new category name:");
  if (categoryName) {
    addCategory(categoryName);
  }
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const categoryName = this.dataset.category;
    showCategory(categoryName);
  });
});
// >>>>

todoInputField.addEventListener("keyup", function (event) {
  CreateNewTodo(event);
});
function CreateNewTodo(event) {
  if ((event.key === "Enter") & (todoInputField.value.trim() !== "")) {
    const item = {
      id: new Date().getTime(),
      text: "",
      complete: false,
      // >>>>
      category: activeCategory,
      // >>>>
    };

    // input's value assign for item object's text property
    item.text = todoInputField.value;
    todoInputField.value = "";
    toDo.unshift(item);
    const { itemElement } = CreateTodoElement(item);

    listElement.appendChild(itemElement);

    save();
    return { itemElement };
  }
}

function CreateTodoElement(item) {
  const itemElement = document.createElement("div");
  itemElement.classList.add("item");
  // >>>>
  itemElement.dataset.category = item.category;
  // >>>>
  const circle = document.createElement("div");
  circle.classList.add("circle");

  const inputElement = document.createElement("textarea");
  inputElement.type = "text";
  inputElement.value = item.text;
  inputElement.setAttribute("readonly", "");

  const removeButtonElement = document.createElement("button");
  removeButtonElement.classList.add("materialIcons", "removeButton");
  removeButtonElement.innerText = "remove";

  itemElement.append(circle);
  itemElement.append(inputElement);
  itemElement.append(removeButtonElement);

  if (item.complete) {
    itemElement.classList.add("complete");
  }

  // Event

  // test and commnet out after below 3 lines
  // inputElement.addEventListener("input", () => {
  //     item.text = inputElement.value;
  // })

  circle.addEventListener("click", () => {
    item.complete = !item.complete; // Toggle the complete property
    updateItemAppearance(item, itemElement, circle); // Update the item's appearance
    save();
  });

  // when click outside of item, item become non-editable mode
  inputElement.addEventListener("blur", () => {
    inputElement.setAttribute("readonly", "");
    console.log("blllllur");
    save();
  });
  let isEditMode = false;

  // click item to enter the edit mode
  inputElement.addEventListener("click", () => {
    if (!isEditMode) {
      inputElement.removeAttribute("readonly");
      inputElement.focus();

      isEditMode = true;
    }
  });

  // press enter to exiting the edit mode
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
      circle.classList.add("complete-circle");
    } else {
      itemElement.classList.remove("complete");
      circle.classList.remove("complete-circle");
    }

    if (defaultHideCompleted) {
      // If it's set to hide completed by default, hide the item. and then put the complete item to top of list
      updateListOrder(listElement);
      itemElement.classList.add("hidden");
    } else {
      // if it's not hidden, then just simple put the completed items to the top of the list
      updateListOrder(listElement);
    }
  }

  removeButtonElement.addEventListener("click", () => {
    handleRemoveButtonClick(item);
  });

  function handleRemoveButtonClick(item) {
    // Find the index of the item to be removed
    const itemIndex = toDo.findIndex((t) => t.id === item.id);
    if (itemIndex !== -1) {
      // Remove the item from the toDo array
      toDo.splice(itemIndex, 1);
      // Update the DOM
      itemElement.remove();
      save();
    }
  }

  // if complete is in show status, and list has any items that is complete. the item will be hidden
  if (defaultHideCompleted && itemElement.classList.contains("complete")) {
    // listItem.classList.add('hidden');
    itemElement.classList.add("hidden");
  }
  return { itemElement, inputElement, removeButtonElement };
}

// >>>>

function showCategory(categoryName) {
  activeCategory = categoryName; // Update the active category
  const items = document.querySelectorAll(".item");

  // ****** change the logic of hidden div
  items.forEach((item) => {
    if (categoryName === "All") {
      // Show items of all categories
      item.classList.remove("hidden");
    } else {
      if (item.dataset.category === categoryName) {
        // Show items of the selected category
        item.classList.remove("hidden");
      } else {
        // Hide items of other categories
        item.classList.add("hidden");
      }
    }
  });

  // Hide or show the input containers based on the selected category
  const categoryInputs = document.querySelectorAll(".category-input");
  categoryInputs.forEach((input) => {
    if (categoryName === "All") {
      input.parentNode.classList.add("hidden");
    } else {
      if (input.dataset.category === categoryName) {
        input.parentNode.classList.remove("hidden");
      } else {
        input.parentNode.classList.add("hidden");
      }
    }
  });

  // Hide or show the dividers and subheadings based on the selected category
  const dividers = document.querySelectorAll("hr");
  const subheaders = document.querySelectorAll(".subheader");
  dividers.forEach((divider) => {
    if (
      divider.previousElementSibling &&
      divider.previousElementSibling.classList.contains("subheader")
    ) {
      // Show dividers only after subheadings
      if (categoryName === "All") {
        divider.classList.remove("hidden");
      } else {
        divider.classList.add("hidden");
      }
    }
  });
  subheaders.forEach((subheader) => {
    if (categoryName === "All") {
      subheader.classList.remove("hidden");
    } else {
      if (subheader.innerText === categoryName) {
        subheader.classList.remove("hidden");
      } else {
        subheader.classList.add("hidden");
      }
    }
  });
}

function addCategory(categoryName) {
  const categoryButton = document.createElement("button");
  categoryButton.classList.add("category-button");
  categoryButton.dataset.category = categoryName;
  categoryButton.innerText = categoryName;
  categoryButton.addEventListener("click", function () {
    showCategory(categoryName);
  });

  categoriesContainer.appendChild(categoryButton);
}

function getCurrentCategory() {
  const activeCategoryButton = document.querySelector(
    ".category-button.active",
  );
  return activeCategoryButton ? activeCategoryButton.dataset.category : "All";
}
// >>>>

function displayToDos() {
  load();
  // >>>>
  const categoriesSet = new Set();
  toDo.forEach((item) => {
    categoriesSet.add(item.category);
  });

  const categories = Array.from(categoriesSet);

  categories.forEach((category) => {
    // Create a container for each category
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    listElement.appendChild(categoryContainer);

    // Add a subheader for the category
    const subheader = document.createElement("div");
    subheader.classList.add("subheader");
    subheader.innerText = category;
    categoryContainer.appendChild(subheader);

    // Add items for the category
    const items = toDo.filter((item) => item.category === category);

    items.forEach((item) => {
      const { itemElement } = CreateTodoElement(item);
      categoryContainer.appendChild(itemElement);
    });

    // Add an input entry below the category
    const categoryInput = document.createElement("div");
    categoryInput.classList.add("input-container");
    categoryInput.innerHTML = `
            <div class="circle"></div>
            <textarea type="text" class="category-input" data-category="${category}" placeholder="Add a to-do item for ${category}..."></textarea>
        `;
    categoryContainer.appendChild(categoryInput);

    // Add an event listener for "Enter" key press on the textarea
    const textarea = categoryInput.querySelector(".category-input");
    textarea.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const newItemText = textarea.value.trim();
        if (newItemText !== "") {
          const newItem = {
            id: new Date().getTime(),
            text: newItemText,
            complete: false,
            category: category,
          };

          const { itemElement } = CreateTodoElement(newItem);
          categoryContainer.insertBefore(itemElement, categoryInput); // Insert new item before the input
          textarea.value = ""; // Clear the textarea
          save(); // Save to local storage
        }
      }
    });
  });
}

// >>>>
// <<<<<

//     for (let i=0; i<toDo.length;i++) {
//         const item = toDo[i];

//         const {itemElement} = CreateTodoElement(item);

//         listElement.appendChild(itemElement);
//     }
// }
// <<<<<

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
function updateListOrder(targetListElement) {
  // Update the order
  const completedItems = document.querySelectorAll(".complete");
  completedItems.forEach((item) => targetListElement.prepend(item));
}

// This toggles between hiding and showing completed - does not hide them in the first place

function hideCompleted() {
  defaultHideCompleted = true; // Set the flag to hide completed items
  const completedItems = document.querySelectorAll(".complete");
  completedItems.forEach((item) => item.classList.add("hidden"));
}
function showCompleted() {
  defaultHideCompleted = false; // Set the flag to show completed items
  const completedItems = document.querySelectorAll(".complete");
  completedItems.forEach((item) => item.classList.remove("hidden"));
  updateListOrder(); // Move completed items to the top
}
// >>>>
// Modify updateListOrder function to consider categories
function updateListOrder(targetListElement) {
  const completedItems = document.querySelectorAll(".complete");
  completedItems.forEach((item) => {
    if (item.dataset.category === getCurrentCategory()) {
      targetListElement.prepend(item);
    }
  });
}
// >>>>
