// Task Class
class Task {
  description;
  date;
  time;

  constructor(description, date, time) {
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

  const taskObj = new Task(description, date, time);
  taskList.push(taskObj);
  localStorage.setItem("tasklist", JSON.stringify(taskList));
  form.reset();

  generateNewNote();
}

// function to render array from localstorage and convert to class
function renderArray() {
  const taskList = [];
  const localGet = JSON.parse(localStorage.getItem("tasklist"));
  for (let i = 0; i < localGet.length; i++) {
    const local = localGet[i];
    const taskNewObj = new Task(local.description, local.date, local.time);
    taskList.push(taskNewObj);
  }
  return taskList || [];
}

// function to create new task note
function generateNewNote() {
  const notes = document.querySelector("#notes");
  notes.innerHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    const list = taskList[i];

    const noteFirstP = document.createElement("p");
    noteFirstP.innerText = list.description;
    noteFirstP.setAttribute("class", "descriptionpara");

    const noteSecondP = document.createElement("p");
    noteSecondP.innerText = list.date;
    noteSecondP.setAttribute("class", "datepara");

    const noteThirdP = document.createElement("p");
    noteThirdP.innerText = list.time;
    noteThirdP.setAttribute("class", "timepara");

    notes.append(noteFirstP, noteSecondP, noteThirdP);
  }
}
