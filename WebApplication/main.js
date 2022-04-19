//var button = getElementById("AddBtn");
function addButtonClick() {
  //console.log(100);
  let todo = document.getElementById("todoitem");
  let newTodo = todo.cloneNode(true);
  todo.after(newTodo);
  //let div = document.createElement("div");
  //div.className = "todo";
  //document.body.append(todo);
  //return;
}
//button.onclick = addButtonClick;
