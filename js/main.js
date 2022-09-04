const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const form = document.querySelector("form");
const todolist = document.querySelector(".todoList");
const clearAll = document.querySelector(".clear_all");
const totalTask = document.querySelector(".total span");
const remainingTask = document.querySelector(".remaining span");
const doneTask = document.querySelector(".done span");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputValue = inputBox.value;

  if (!inputValue) {
    alert("Please add task");
    return;
  }

  let listItem = document.createElement("div");
  listItem.classList.add("list_item");

  let inputCheck = document.createElement("input");
  inputBox.classList.add("check-input");
  inputCheck.type = "checkbox";

  let taskInput = document.createElement("input");
  taskInput.classList.add("task-input");
  taskInput.type = "text";
  taskInput.value = inputValue;
  taskInput.setAttribute("readonly", "readonly");
  inputBox.value = "";

  let icon = document.createElement("div");
  icon.classList.add("icon");


  icon.innerHTML = `
    <span class="edit"><i class="fa-solid fa-pen"></i></span>
    <span class="close"><i class="fa-solid fa-trash-can"></i></span>
    `;

  listItem.append(inputCheck, taskInput, icon);
  todolist.append(listItem);

  remainingTaskCount();
  completeTaskCount();

  inputCheck.addEventListener("click", function () {
    checkboxFunc();
  });

  icon.children[0].addEventListener("click", function () {
    editTask();
  });

  function editTask() {
    if (taskInput.readOnly == true) {
      taskInput.removeAttribute("readonly");
      taskInput.focus();
      icon.children[0].innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
      inputCheck.removeAttribute("checked");
    } else {
      taskInput.setAttribute("readonly", "readonly");
      icon.children[0].innerHTML = `<i class="fa-solid fa-pen"></i>`;
    }
  }

  function checkboxFunc() {
 
    if (inputCheck.checked === true) {
      inputCheck.setAttribute("checked", "checked");
      taskInput.style.textDecoration = "line-through";
      taskInput.style.opacity = "0.6";
      completeTaskCount();
      remainingTaskCount();
    } else {
      inputCheck.removeAttribute("checked");
      taskInput.style.textDecoration = "none";
      taskInput.style.opacity = "1";
      completeTaskCount();
      remainingTaskCount();
    }
  }

  icon.children[1].addEventListener("click", function () {
    removeTask();
    totalTask.innerText = todolist.childElementCount;
    completeTaskCount();
    remainingTaskCount();
  });

  clearAll.addEventListener("click", function () {
    
    removeTask();
    completeTaskCount();
    totalTask.innerText = todolist.childElementCount;
    remainingTaskCount();
  });


  function removeTask() {
    todolist.removeChild(listItem);
  }

  function completeTaskCount() {
    let checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    doneTask.innerHTML = checkboxes.length;
  }

  function remainingTaskCount() {
    let notcheck = document.querySelectorAll(
      'input[type="checkbox"]:not(:checked)'
    );
    remainingTask.innerHTML = notcheck.length;
    console.log(notcheck.length)
  }

  totalTask.innerText = todolist.childElementCount;

});
