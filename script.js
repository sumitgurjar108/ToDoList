const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
});

const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const userInput = document.getElementById("task");
userInput.focus();
const heading = document.querySelector('h1');
heading.style.color = "#333";

// Add new task to the list when 'Add' button is clicked
addBtn.addEventListener("click", () => {
    const listItem = document.createElement("li");

    // Task text element
    const taskText = document.createElement("span");
    taskText.textContent = userInput.value;

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");

    // Append task text and buttons to list item
    listItem.appendChild(taskText);
    listItem.appendChild(editBtn);
    listItem.appendChild(removeBtn);
    taskList.appendChild(listItem);
    userInput.value = "";

    // Remove task when "Remove" button is clicked
    removeBtn.addEventListener("click", () => {
        taskList.removeChild(listItem);
    });

    // Edit task when "Edit" button is clicked
    editBtn.addEventListener("click", () => {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText.textContent;
        listItem.insertBefore(editInput, taskText);
        listItem.removeChild(taskText);

        // Change "Edit" button to "Save"
        editBtn.textContent = "Save";
        editBtn.classList.remove("edit");
        editBtn.classList.add("save");

        editBtn.addEventListener("click", () => {
            taskText.textContent = editInput.value;
            listItem.insertBefore(taskText, editInput);
            listItem.removeChild(editInput);
            editBtn.textContent = "Edit";
            editBtn.classList.remove("save");
            editBtn.classList.add("edit");
        });
    });
});
