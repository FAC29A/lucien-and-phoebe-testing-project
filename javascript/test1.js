


test("CreateNewTodo should add a new to-do item when Enter key is pressed and input is not empty", ()=> {

    const mockEvent = {
        key: "Enter"
    }

    todoInputField.value = "New To Do Item";

    const initialToDoLength = toDo.length;

    const {itemElement} = CreateNewTodo(mockEvent);
    

    equal(toDo.length, initialToDoLength +1, "a new item is added to the toDo list");
    equal(todoInputField.value, '', "the input field is cleared after adding a new item");
  
   itemElement.remove()

})

test("CreateTodoElement Converts Text Property to Input Element Value", ()=>{
    const item = {
        id: 123,
        text: "To Do Test",
        complete: false
    }
    
    const expected = item.text;
    const { inputElement } = CreateTodoElement(item);
    const resultText = inputElement.value;
    
    equal(expected,resultText,"CreateTodoElement Converts Text Property to Input Element Value");
    
    })

// Test for display to-dos



// Test for hide when mark as completed (not toggle)

test("updateItemAppearance adds the class 'hidden' to the item and hides completed item", () => {
    defaultHideCompleted = true;

    const item = {
        id: 123,
        text: "To Do Test",
        complete: true
    }
    const { itemElement } = CreateTodoElement(item);
    // itemElement.classList.add("item");

    const circle = document.createElement("div");
    circle.classList.add("circle");

    console.log("Before updateItemAppearance:", itemElement.classList);

    circle.click();

    console.log("After updateItemAppearance:", itemElement.classList);


    assert((itemElement.classList.contains("hidden")), "updateItemAppearance adds the class 'hidden' to the item and hides completed item");
     
})

// test("hideCompleted hides completed items", () => {
//     defaultHideCompleted = false;

//     const testContainer = document.createElement("div");

//     const testCase = document.createElement("div");
//     testCase.classList.add("complete");

//     testContainer.appendChild(testCase);

//     hideCompleted();

//     // assert(testCase.classList.contains("hidden"), "completed items are hidden");
//     equal(testCase.classList.contains("hidden"), true , "completed items are hidden");

// })

// test("showCompleted shows completed items", () => {
//     defaultHideCompleted = false;

//     const testContainer = document.createElement("div");

//     const testCase = document.createElement("div");
//     testCase.classList.add("complete");

//     testContainer.appendChild(testCase);

//     hideCompleted();

//     assert(!testCase.classList.contains("hidden"), "completed items are shown");
//     notEqual(testCase.classList.contains("hidden"), true , "completed items are shown");

// })

// Test for toggling between hide and show completed

test("toggleCompleted toggles between show and hide", () => {
    defaultHideCompleted = false;
  
    const showHideButton = document.createElement("button");
    showHideButton.textContent = "show completed";
  
    // Simulate two click events on the button - to hide and then show
    showHideButton.click();

    showHideButton.click();
  
    assert(!defaultHideCompleted, "toggleCompleted toggles between show and hide");
  });
  




test("remove an item from the list on click remove button", () =>{
    function handleRemoveButtonClick(item) {
         // Find the item element associated with the item
        const itemElement = document.querySelector(`[data-id="${item.id}"]`);
    
        if (itemElement) {
             // Remove the item element from the DOM
            itemElement.remove();
    
           // Remove the item from the toDo array
            toDo = toDo.filter(t => t.id !== item.id);
    
            save();
        }
    }
    
    const item = {
        id: 123,
        text: "text to be removed",
        complete: false
    }

    const { itemElement, inputElement, removeButtonElement } = CreateTodoElement(item);


    listElement.contains(itemElement)

    // Simulate the click on the remove button with the associated item
    handleRemoveButtonClick(item);

    // Verify that the item is removed
    assert(!listElement.contains(itemElement), "Item should be removed from the DOM");
    assert(!toDo.some(t => t.id === item.id), "Item should be removed from the toDo array");
});





test("update list order function to arrange completed items to the top of list", () => {
    // Create a sample list in your actual application
    const testListElement = document.createElement('div');
    testListElement.id = 'list';

    // Append some items to the list
    testListElement.innerHTML = `
        <p class="complete">complete 1</p>
        <p>incomplete 1</p>
        <p class="complete">complete 2</p>
    `;

    // Log the order before the update
    const beforeOrder = Array.from(testListElement.querySelectorAll('.complete')).map(item => item.textContent);
    console.log('Before update:', beforeOrder);

    // Call the updateListOrder function with the specific listElement
    updateListOrder(testListElement);

    // Log the order after the update
    const afterOrder = Array.from(testListElement.querySelectorAll('.complete')).map(item => item.textContent);
    console.log('After update:', afterOrder);

    // Assert the order of elements in the real list
    equal(afterOrder[0], 'complete 1', "First item should be 'complete 1'");
    equal(afterOrder[1], 'complete 2', "Second item should be 'complete 2'");
});

