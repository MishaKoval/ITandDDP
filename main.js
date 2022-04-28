//var button = getElementById("AddBtn");
//const heading = document.getElementById("todoitem1");
//console.log(heading);
var colorchanger;
var defColor = "#5199ff";
window.addEventListener("load", startup, false);
function startup() {
  colorchanger = document.querySelector("#changeColor");
  colorchanger.value = "#4199ff";
  colorchanger.addEventListener("input", updateTodoColor, false);
  colorchanger.addEventListener("change", updateAll, false);
  //colorchanger.select();
}

function timeRefresh() {
  var timeNode = document.getElementById("nowTime");

  function getCurrentTimeString() {
    return new Date().toTimeString().replace(/ .*/, "");
  }

  setInterval(() => (timeNode.textContent = getCurrentTimeString()), 1000);
}

function dateRefresh() {
  var timeNode = document.getElementById("nowDate");
  timeNode.textContent = new Date().toDateString();
}

function updateTodoColor(event) {
  var elem = document.querySelector(".todo-item").parentNode;
  console.log(elem);
  if (elem) {
    elem.style.backgroundcolor = event.target.value;
  }
}

function updateAll(event) {
  document.querySelectorAll(".todo-item").forEach(function (p) {
    p.style.color = event.target.value;
  });
}

const todo = document.getElementById("todoitem");
/*function getTodo() {
  todo = 
  //todo = todo.cloneNode(true);
}*/

function changeColor() {
  //document.activeElement.parentNode.parentNode.style.color = new color(1, 1, 1);
}

function deleteTodoItem() {
  let parent = document.activeElement.parentNode;
  let ded = parent.parentNode;
  ded.removeChild(parent);
}

function addButtonClick() {
  //let todo = document.getElementById("todoitem");
  let newTodo = todo.cloneNode(true);
  let maincontainer = document.getElementById("newtodoitem");
  //newTodo = todo;
  maincontainer.before(newTodo);
  return;
}

function deleteButtonClick() {
  let parent = document.activeElement.parentNode;
  let ded = parent.parentNode;
  ded.removeChild(parent);
  //console.log(batua);
  //console.log(ded);
}
//button.onclick = addButtonClick;
