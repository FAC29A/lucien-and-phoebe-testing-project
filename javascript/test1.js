
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

test("CreateNewTodo should add a new to-do item when Enter key is pressed and input is not empty", ()=> {
    // command to press enter key
    // expected result
    // actual result
    // equal function

    const mockEvent = {
        key: "Enter"
    }

    todoInputField.value = "New To Do Item";

    const initialToDoLength = toDo.length;

    CreateNewTodo(mockEvent);

    equal(toDo.length, initialToDoLength +1, "a new item is added to the toDo list");
    equal(todoInputField.value, '', "the input field is cleared after adding a new item");

})
