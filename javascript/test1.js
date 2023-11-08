
// Lucien trial to use TDD method to build function 

test("text input is converted to text key in element", ()=>{
const item = {
    id: 123,
    text: "To Do Test",
    complete: false
}

const expected = item.text;
const { inputElement } = CreateTodoElement(item);
const resultText = inputElement.value;

equal(expected,resultText,"text input is converted to text key in element");

})

