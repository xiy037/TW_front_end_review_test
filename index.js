let data = [];
let resultArr = [];
let mode = "all";
loadAll();

function loadAll() {
  axios.get("http://localhost:3007/projects").then((response) => {
    data = response.data;
    listFormattedContent(data);
    countNumber(data);
  }).catch((error) => console.log(error));
}

function listFormattedContent(array) {
  let main = document.getElementById("list-container");
  main.innerHTML = "";
  let str = ``;
  for (let i = 0; i < array.length; i++) {
    str += `<div class="list" id=${array[i].id}  onclick="showAlert()">
    <div class="task-number">${array[i].name}</div>
    <div class="task-content">${array[i].description}</div>
    <div class="task-endDate">${array[i].endTime}</div>
    <div class="status status-${array[i].status}">${array[i].status}</div>
    <div class="buttons-box"><input type="button" value="删除" class="button"></input></div>
    </div>`;
  }
  main.innerHTML += str;
}

function showAlert() {
  if (event.target.type === "button") {
    let alert = document.getElementById("alert");
    alert.style.display = "block";
    let bg = document.getElementById("filter");
    bg.style.display = "block";
    let id = event.currentTarget.id;
    alert.onclick = () => {
      if (event.target.value === "确定") {
        deletelistItem(id);
        alert.style.display = "none";
        bg.style.display = "none";
      } else if (event.target.value === "取消" || event.target.id === "icon-close") {
        alert.style.display = "none";
        bg.style.display = "none";
      }
    }
  }
}
function deletelistItem(id) {
    document.getElementById(id).remove();
    axios.delete(`http://localhost:3007/projects/${id}`).catch((error) => console.log(error));
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].id != id) {
        newData.push(data[i]);
      }
    }
    data = newData;
    countNumber(data);
}

function countNumber(array) {
  const statusObj = array.reduce((prev, curr) => {
    prev.all++;
    if (curr.status in prev) {
      prev[curr.status]++;
    } else {
      prev[curr.status] = 1;
    }
    return prev;
  }, {all: 0})
  for (x in statusObj) {
    let node = document.getElementById(`${x}-counter`);
    node.innerHTML = `<p class="counter-number">${statusObj[x]}</p>
    <p class="counter-percentage">${(statusObj.all !== 0) ? `${Math.round(statusObj[x] / statusObj.all * 100)}%` : ""}</p>`;
  }
}


function showSortedDate() {
  const selectedNodes = document.querySelectorAll(".sort-selected")
  selectedNodes.forEach((element) => {element.classList.remove("sort-selected");});
  event.target.classList.add("sort-selected");
  if (mode === "all") {
    sortDate(event, data);
    listFormattedContent(data);
  } else if (mode === "search") {
    sortDate(event, resultArr);
    listFormattedContent(resultArr);
  }
}

function sortDate(event, array) {
    array.sort((o1, o2) => {
      if (event.target.id === "down") {
        return (o1.endTime > o2.endTime) ? -1 : 1;
      } 
      return (o1.endTime > o2.endTime) ? 1 : -1;
    });
}


function searchProject() {
  if (event.keyCode === 13 || event.target.id === "search") {
    let input = document.getElementById("search-input").value;
    let regInput = new RegExp(input, "ig"); //case-insensitive
    resultArr = data.filter((element) => element.name.match(regInput));
    listFormattedContent(resultArr);
    mode = "search";
  }
}