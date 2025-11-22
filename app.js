// Task Class
class Task {
  id;
  description;
  date;
  time;

  constructor(id, description, date, time) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.time = time;
  }
}

// Empty Array call to function
const taskList = renderArray();

// call to generate function before render
generateNewNote();

// function of creating new task
function newTask(event) {
  event.preventDefault();
  const form = event.target;
  const description = form.description.value;
  const date = form.date.value;
  const time = form.time.value;
  const id = taskList.length == 0 ? 1 : taskList[taskList.length - 1].id + 1;
  const taskObj = new Task(id, description, date, time);
  taskList.push(taskObj);
  localStorage.setItem("tasklist", JSON.stringify(taskList));
  form.reset();

  generateNewNote();
}
console.log(taskList);
// function to render array from localstorage and convert to class
function renderArray() {
  const taskList = [];
  const localGet = JSON.parse(localStorage.getItem("tasklist")) || [];
  for (let i = 0; i < localGet.length; i++) {
    const local = localGet[i];
    const taskNewObj = new Task(
      local.id,
      local.description,
      local.date,
      local.time
    );
    taskList.push(taskNewObj);
  }
  return taskList || [];
}

// function to create new task note
function generateNewNote() {
  // intizalizing parent div & p for note content
  const notes = document.querySelector("#notes");
  notes.innerHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    const contentContainer = document.createElement("div");
    contentContainer.setAttribute("class", "note_design");
    const list = taskList[i];

    const noteFirstP = document.createElement("p");
    noteFirstP.innerText = list.description;
    noteFirstP.setAttribute("class", "content_para");

    const noteSecondP = document.createElement("p");
    noteSecondP.innerText = list.date;
    noteSecondP.setAttribute("class", "datepara");

    const noteThirdP = document.createElement("p");
    noteThirdP.innerText = list.time;
    noteThirdP.setAttribute("class", "timepara");

    let x = document.createElement("img");
    x.setAttribute("src", "images/cancel.png");
    x.setAttribute("class", "cancel");
    x.setAttribute("onclick", "removeNote(" + list.id + ")");

    contentContainer.append(x, noteFirstP, noteSecondP, noteThirdP);
    notes.append(contentContainer);
  }
}

function removeNote(listid) {
  const index = taskList.findIndex((item) => item.id == listid);
  taskList.splice(index, 1);
  localStorage.setItem("tasklist", JSON.stringify(taskList));
  generateNewNote(); // update the list of the cards
}

// in order to find last id in the array you need to check arr length - 1
