loadAll();

function loadAll() {
  let main = document.getElementById("list-container");
  let str = ``;
  axios.get("http://localhost:3007/projects").then((response) => {
    let data = response.data;
    for (let i = 0; i < data.length; i++) {
      str += `<div class="list" id=${data[i].id}  onclick="showAlert()">
      <div class="task-number">${data[i].name}</div>
      <div class="task-content">${data[i].description}</div>
      <div class="task-endDate">${data[i].endTime}</div>
      <div class="status status-${data[i].status}">${data[i].status}</div>
      <div class="buttons-box"><input type="button" value="delete" class="button"></input></div>
      </div>`;
    }
    main.innerHTML += str;
    countNumber(data);
  }).catch((error) => console.log(error));
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
      } else if (event.target.value === "取消") {
        alert.style.display = "none";
        bg.style.display = "none";
      }
    }
  }
}
function deletelistItem(id) {
    document.getElementById(id).remove();
    axios.delete(`http://localhost:3007/projects/${id}`).then((response) => {
      console.log(response.status, response.data);
    })
}

function countNumber(array) {
  let all = document.getElementById("all-counter");
  let active = document.getElementById("active-counter");
  let pending = document.getElementById("pending-counter");
  let complete = document.getElementById("complete-counter");
  let allCount = 0;
  let activeCount = 0;
  let pendingCount = 0;
  let completeCount = 0;
  for (let i = 0 ; i < array.length; i++) {
    if (array[i].status === "CLOSED") {
      completeCount++;
    } else if (array[i].status === "PENDING") {
      pendingCount++;
    } else if (array[i].status === "ACTIVE") {
      activeCount++;
    }
    allCount++;
  }
  all.innerHTML = allCount;
  active.innerHTML = activeCount;
  pending.innerHTML = pendingCount;
  complete.innerHTML = completeCount;
}
