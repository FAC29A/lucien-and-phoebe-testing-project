// Deafult Groups
import { deafultGroups } from "./index.data.js";

let defaultHideCompleted = true; // A flag to set the default state to hide completed
let groups = [];

// Function to find a group by ID
function findGroupById(groupId) {
  return groups.find((g) => g.id == groupId);
}

//Display Mobile menu
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".sidebar");

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Don't test below
const mobileMenu = () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
};

menu.addEventListener("click", mobileMenu);
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Don't test above

// Unique Id Counters
let groupId = 1;
let taskId = 1;

function generateUniqueTaskID() {
  const uniqueTaskID = `task-${taskId}`;
  taskId++;
  return uniqueTaskID;
}

function generateUniqueGroupID() {
  const uniqueGroupID = `group-${groupId}`;
  groupId++;
  return uniqueGroupID;
}
let showHideCompleted = document.querySelector("#showHideCompleted");
// Show/hind button change text
showHideCompleted.addEventListener("click", function () {
  if (showHideCompleted.textContent == "show completed") {
    showHideCompleted.textContent = "hide completed";
    showCompleted();
  } else {
    showHideCompleted.textContent = "show completed";
    hideCompleted();
  }
});

// Function to handle the 'Enter' key in addTaskFields
function handleAddTaskFieldEnter(event, group) {
  if (event.key === "Enter") {
    const inputField = event.target;
    const taskText = inputField.value.trim();

    const item = {
      id: generateUniqueTaskID(),
      text: taskText,
      complete: false,
      category: group,
    };

    if (taskText && group)
      // Create and add the task
      createTaskUsingTemplate(item, group);

    // Clear the input field after adding the task
    inputField.value = "";
    save();
  }
}

// Remove Task
function deleteTask(event) {
  const task = event.target;
  if (task.value.length === 0) {
    task.parentElement.remove();
  }
}

// Create task
export function createTaskUsingTemplate(item, group) {
  const containerElement = document.querySelector(group);
  const taskList = containerElement.querySelector(".listToDo");

  const template = document.querySelector("#taskTemplate");
  const domFragment = template.content.cloneNode(true);
  const field = domFragment.querySelector(".taskText");
  const taskItem = domFragment.querySelector(".taskItem");

  field.value = item.text;
  taskItem.id = item.id;

  // Completed circle
  const taskCircle = domFragment.querySelector(".taskCircle");
  if (item.complete) {
    taskItem.classList.add("complete");
  }
  taskCircle.addEventListener("click", (event) => {
    circleToggledItemAppareance(
      event,
      item,
      taskItem,
      taskCircle,
      containerElement,
    );
  });

  // remove Task
  const deleteTaskButton = domFragment.querySelector(".deleteTaskButton");
  deleteTaskButton.addEventListener("click", () => {
    handleTaskDeleteButton(item, taskItem, containerElement);
  });

  taskList.appendChild(domFragment);
  // Update the groups array
  const currentGroup = findGroupById(containerElement.id);
  currentGroup.tasks.push(item);

  // if complete is in show status, and list has any items that is complete. the item will be hidden
  if (defaultHideCompleted && taskItem.classList.contains("complete")) {
    taskItem.classList.add("hidden");
  }
}

function circleToggledItemAppareance(
  event,
  item,
  taskItem,
  taskCircle,
  containerElement,
) {
  item.complete = !item.complete; // Toggle the complete property
  if (item.complete) {
    taskItem.classList.add("complete");
    taskCircle.classList.add("complete-circle");
  } else {
    taskItem.classList.remove("complete");
    taskCircle.classList.remove("complete-circle");
  }

  // Find the group's task list

  const taskList = containerElement.querySelector(".listToDo");

  if (defaultHideCompleted) {
    // If it's set to hide completed by default, hide the item.
    taskItem.classList.add("hidden");
  }

  // Move the taskItem to the top of the task list within its group
  taskList.insertBefore(taskItem, taskList.firstChild);

  save();
}

function hideCompleted() {
  defaultHideCompleted = true; // Set the flag to hide completed items
  const completedItems = document.querySelectorAll(".complete");
  completedItems.forEach((item) => item.classList.add("hidden"));
}
function showCompleted() {
  defaultHideCompleted = false; // Set the flag to show completed items
  const completedItems = document.querySelectorAll(".complete");
  completedItems.forEach((item) => item.classList.remove("hidden"));
  // updateListOrder(); // Move completed items to the top
}

function handleTaskDeleteButton(item, taskItem, containerElement) {
  // Find the index of the item to be removed
  const currentGroup = findGroupById(containerElement.id);
  const groupArray = currentGroup.tasks;

  console.log(groupArray);
  const itemIndex = groupArray.findIndex((t) => t.id === item.id);
  if (itemIndex !== -1) {
    // Remove the item from the toDo array
    groupArray.splice(itemIndex, 1);
    // Update the DOM
    taskItem.remove();
    save();
  }
}

// Add group
function createGroupUsingTemplate(groupName) {
  const containerElement = document.querySelector(".groupsContainer");
  const template = document.querySelector("#groupTemplate");
  const domFragment = template.content.cloneNode(true);

  // Define the group title
  const groupTitle = domFragment.querySelector(".groupTitle");
  const uniqueId = generateUniqueGroupID();

  // // Promise that resolves when the group title has text
  // const groupNamePromise = new Promise((resolve) => {
  //   groupTitle.addEventListener("input", function inputHandler() {
  //     // Remove the event listener after input is detected
  //     groupTitle.removeEventListener("input", inputHandler);
  //     resolve(groupTitle.value.trim());
  //   });
  // });

  if (groupName) {
    groupTitle.value = groupName;
    groupTitle.setAttribute("tabindex", uniqueId.toString());
  }

  // Delete Button
  const deleteButton = domFragment.querySelector(".deleteGroupButton");
  deleteButton.addEventListener("click", () => deleteGroup(uniqueId));

  // Assign an ID
  domFragment.querySelector(".tasksContainer").id = uniqueId;
  domFragment.querySelector(".addTaskField").id = `addTaskField-${uniqueId}`;
  const field = domFragment.querySelector(".addTaskField");
  field.addEventListener("keypress", (event) =>
    handleAddTaskFieldEnter(event, `#${uniqueId}`),
  );

  // Find the addTaskField and addTaskButton inside the domFragment
  const addTaskField = domFragment.querySelector(".addTaskField");
  const addTaskButton = domFragment.querySelector(".addTaskButton");

  containerElement.appendChild(domFragment);

  // After appending, set the focus on the group title
  // Using requestAnimationFrame to ensure the focus occurs after any reflows or repaints
  requestAnimationFrame(() => {
    groupTitle.focus();
  });

  // Update the groups array
  groups.push({
    id: uniqueId,
    name: groupName || "",
    tasks: [],
  });

  createFolder(groupTitle, uniqueId);
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Don't test below

// Delete Group
function deleteGroup(groupId) {
  const groupElement = document.getElementById(groupId);
  if (groupElement) {
    groupElement.remove(); // Removes the whole group container
  } else {
    console.error(`No element found with ID ${groupId}`);
  }
}

function createFolder(groupTitle, uniqueId) {
  const sideBarContainer = document.querySelector("#sidebar");
  const template = document.querySelector("#folderTemplate");
  const domFragment = template.content.cloneNode(true);

  //  set folder ID
  const folderContainer = domFragment.querySelector(".folderContainer");
  folderContainer.classList.add(uniqueId);

  //  set folder title
  const folderTitle = domFragment.querySelector(".folderTitle");
  folderTitle.innerText = groupTitle.value;

  sideBarContainer.appendChild(domFragment);
}

// Create initial default groups
window.addEventListener("load", (event) => {
  deafultGroups.forEach((element) => {
    createGroupUsingTemplate(element.groupName);
  });
});

// Add new group button
const newGroupButton = document.getElementById("createGroupButton");
newGroupButton.addEventListener("click", (event) => {
  createGroupUsingTemplate();
});

//Enter works like "tab"
function focusNextElement(element) {
  // Get all focusable elements
  const focusableElements = Array.from(
    document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  );

  const index = focusableElements.indexOf(element);

  if (index > -1) {
    // Focus the next focusable element; if there's no next element, focus the first one
    const nextElement = focusableElements[index + 1] || focusableElements[0];
    nextElement.focus();
  }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Don't test above
