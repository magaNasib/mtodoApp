let formTodo = document.querySelector("#todoForm");
let inputTodo = document.querySelector("#todoInput");
let todosDiv = document.querySelector("#todos");
let listUl = document.querySelector("#list-ul");
let btnDlAll = document.querySelector("#btn-del-all");
let filterDiv = document.querySelector(".filterDiv");
let todoFilterInput = document.querySelector("#todoFilter");
let todoInfo = document.querySelector("#todoInfo");

events();
function events() {
  window.addEventListener("DOMContentLoaded", function () {
    bringToList();

    checkBtn();
  });
  formTodo.addEventListener("submit", addToStorage);
  btnDlAll.addEventListener("click", deleteAllData);
  listUl.addEventListener("click", delOneElement);
  todoFilter.addEventListener("keyup", tdofilterFunc);
}
function checkBtn() {
  if (
    JSON.parse(localStorage.getItem("todoArrayStorage")) === null ||
    JSON.parse(localStorage.getItem("todoArrayStorage")).length == 0
  ) {
    btnDlAll.style.display = "none";
    filterDiv.style.display = "none";
    filterDiv.children[0].value = "";
  } else {
    btnDlAll.style.display = "block";
    filterDiv.style.display = "block";
  }
}
function tdofilterFunc() {
  const text = todoFilterInput.value.toLowerCase();
  let litodos = document.querySelectorAll(".litodo");
  litodos.forEach(function (eachli) {
    const textLi = eachli.children[0].textContent.toLowerCase();
    if (textLi.indexOf(text) == -1) {
      eachli.style.display = "none";
    } else eachli.style.display = "flex";
  });
}

function delOneElement(a) {
  if (a.target.tagName.toLowerCase() === "a") {
    var indexofelement = Array.prototype.indexOf.call(
      listUl.children,
      a.target.parentElement
    );
    const arr = getArrayFromStorage();
    arr.splice(indexofelement, 1);
    spanFill("warning", "Todo silindi");
    setArrayToStorage(arr);
    bringToList();
    checkBtn();
  }
}
function spanFill(a, b) {
  todoInfo.style.display = "block";
  todoInfo.className = a;
  todoInfo.textContent = b;
  setTimeout(function () {
    todoInfo.style.display = "none";
  }, 1000);
}

function getArrayFromStorage() {
  let todoArray;
  if (localStorage.getItem("todoArrayStorage") === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(localStorage.getItem("todoArrayStorage"));
  }
  return todoArray;
}
function setArrayToStorage(arr) {
  localStorage.setItem("todoArrayStorage", JSON.stringify(arr));
}
function addToStorage(e) {
  const valueofInput = inputTodo.value.trim();
  if (valueofInput !== "") {
    let todoArray = getArrayFromStorage();

    todoArray.push(valueofInput);
    localStorage.setItem("todoArrayStorage", JSON.stringify(todoArray));

    inputTodo.value = "";
    listUl.innerHTML = "";
    spanFill("success", "Todo elave olundu");
    bringToList();
    checkBtn();
    e.preventDefault();
  }
}
function elementCreating(c) {
  const li = document.createElement("li");
  li.className = "litodo";
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(c));
  const link = document.createElement("a");
  link.innerHTML = "x";
  li.appendChild(p);
  li.appendChild(link);
  listUl.appendChild(li);
}

function bringToList() {
  listUl.innerHTML = "";
  var arrayFromStorage = JSON.parse(localStorage.getItem("todoArrayStorage"));
  if (arrayFromStorage !== null) {
    for (i = 0; i < arrayFromStorage.length; i++) {
      elementCreating(arrayFromStorage[i]);
    }
  } else {
    listUl.innerHTML = "";
  }
  checkBtn();
}
function deleteAllData() {
  localStorage.clear();
  spanFill("warning", "Todolar silindi");
  bringToList();
  checkBtn();
}
