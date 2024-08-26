document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const taskList = document.getElementById("taskList");
    const addBtn = document.getElementById("addBtn");
    const userInput = document.getElementById("task");

    // Load task from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToList);

    addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (userInput.value.trim()) {
            const task = {
                text: userInput.value,
                done: false
            };
            tasks.push(task);
            addTaskToList(task);
            saveTasks();
            userInput.value = "";
        }
    });

    function addTaskToList(task) {
        const listItem = document.createElement("li");

        // Task text element
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.done) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        // Checkbox mark as done
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.addEventListener("change", () => {
            task.done = checkbox.checked;
            if (task.done) {
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "gray";
            } else {
                taskText.style.textDecoration = "none";
                taskText.style.color = "black";
            }
            saveTasks();
        });

        // Remove btn
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove");

        removeBtn.addEventListener("click", () => {
            taskList.removeChild(listItem);
            tasks.splice(tasks.indexOf(task), 1);
            saveTasks();
        });

        // Edit btns
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");

        editBtn.addEventListener("click", () => {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = task.text;
            listItem.insertBefore(editInput, taskText);
            listItem.removeChild(taskText);

            editBtn.textContent = "Save";
            editBtn.classList.remove("edit");
            editBtn.classList.add("save");

            editBtn.addEventListener("click", () => {
                task.text = editInput.value;
                taskText.textContent = task.text;
                listItem.insertBefore(taskText, editInput);
                listItem.removeChild(editInput);
                editBtn.textContent = "Edit";
                editBtn.classList.remove("save");
                editBtn.classList.add("edit");
                saveTasks();
            }, { once: true });
        });

        // change position of items 
        const upBtn = document.createElement("button");
        upBtn.textContent = "↑";
        upBtn.addEventListener("click", () => {
            const index = tasks.indexOf(task);
            if (index > 0) {
                [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
                taskList.insertBefore(listItem, listItem.previousElementSibling);
                saveTasks();
            }
        });

        const downBtn = document.createElement("button");
        downBtn.textContent = "↓";
        downBtn.addEventListener("click", () => {
            const index = tasks.indexOf(task);
            if (index < tasks.length - 1) {
                [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
                taskList.insertBefore(listItem.nextElementSibling, listItem);
                saveTasks();
            }
        });

        // Append all elements 
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(editBtn);
        listItem.appendChild(upBtn);
        listItem.appendChild(downBtn);
        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Search functionlity
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search tasks...";
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const listItems = taskList.getElementsByTagName("li");
        Array.from(listItems).forEach((item) => {
            const text = item.querySelector("span").textContent.toLowerCase();
            item.style.display = text.includes(filter) ? "" : "none";
        });
    });

    taskList.parentNode.insertBefore(searchInput, taskList);
});

