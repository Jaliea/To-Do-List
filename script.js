const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must name your task!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    reorderTasks()
}

inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        reorderTasks()
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        reorderTasks()
    }
}, false);

function reorderTasks() {
    const items = Array.from(listContainer.children);
    // Sort items: checked tasks will go to the end
    items.sort((a, b) => {
        if (a.classList.contains("checked") && !b.classList.contains("checked")) return 1;
        if (!a.classList.contains("checked") && b.classList.contains("checked")) return -1;
        return 0;
    });
    // Clear the list and append sorted items
    listContainer.innerHTML = "";
    items.forEach(item => listContainer.appendChild(item));

    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();