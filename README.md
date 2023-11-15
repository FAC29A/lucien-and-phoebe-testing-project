# To-Do List Testing Project

This project is a To-Do List web application designed for testing purposes. It includes basic functionality for adding, removing, and marking tasks as completed. The focus of this readme is on the testing aspects of the project.

## Project Structure

The project consists of an HTML file (`index.html`) and three JavaScript files (`script.js`, `test-helpers.js`, and `test1.js`). The HTML file defines the structure of the To-Do List, while the JavaScript files contain the application logic and testing functions.

### HTML Structure

The HTML file defines the basic structure of the To-Do List web application. It includes elements for the list of tasks, input for adding new tasks, and buttons for showing/hiding completed tasks.

### JavaScript Files

#### `script.js`

- Manages the application logic, such as adding, removing, and marking tasks as complete.
- Includes functions for updating the appearance of tasks and handling user interactions.

#### `test-helpers.js`

- Contains test helper functions and test cases for the To-Do List application.
- Tests cover functions like `CreateNewTodo`, `CreateTodoElement`, and `updateItemAppearance`.

#### `test1.js`

- Contains additional test cases for the To-Do List application.
- Tests cover functionalities related to creating new to-do items, converting text properties, updating item appearances, and toggling completed items.

## Testing

The project uses a simple testing framework with functions like `test`, `assert`, `equal`, and `notEqual` to verify the correctness of various functionalities.

### Sample Tests

1. **CreateNewTodo Function:**
   - Ensures that a new to-do item is added when the Enter key is pressed and the input is not empty.
   - Verifies that the input field is cleared after adding a new item.

2. **CreateTodoElement Function:**
   - Checks if the `CreateTodoElement` function correctly converts the `text` property of a task to the value of the input element.

3. **UpdateItemAppearance Function:**
   - Tests if the `updateItemAppearance` function adds the class 'hidden' to the item and hides completed items when the `defaultHideCompleted` flag is set to true.

4. **Toggle Completed:**
   - Verifies that toggling between showing and hiding completed items works as expected.

5. **Additional Tests (test1.js):**
   - Check `test1.js` for more test cases related to creating, converting, and updating to-do items.

## How to Run Tests

To run the tests, open the `index.html` file in a web browser and check the console for pass/fail messages. The testing framework outputs messages indicating whether each test passed or failed.

Feel free to add more tests as the project evolves, and make sure to update this readme accordingly. Happy testing!
