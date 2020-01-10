let data = [];
loadAll();

function loadAll() {
  let main = document.getElementById("list-container");
  let str = ``;
  axios.get("http://localhost:3007/projects").then((response) => {
    data = response.data;
    for (let i = 0; i < data.length; i++) {
      str += `<div class="list" id=${data[i].id}  onclick="showAlert()">
      <div class="task-number">${data[i].name}</div>
      <div class="task-content">${data[i].description}</div>
      <div class="task-endDate">${data[i].endTime}</div>
      <div class="status status-${data[i].status}">${data[i].status}</div>
      <div class="buttons-box"><input type="button" value="删除" class="button"></input></div>
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
  let all = document.getElementById("all-counter");
  let active = document.getElementById("active-counter");
  let pending = document.getElementById("pending-counter");
  let complete = document.getElementById("complete-counter");
  let [allCount, activeCount, pendingCount, completeCount] = [0, 0, 0 ,0];
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
  let statusArr = [
    {status: active,
     count: activeCount},
    {status: pending,
     count: pendingCount},
    {status: complete,
    count: completeCount},
  ]
  for (let i = 0; i < statusArr.length; i++) {
    statusArr[i].status.innerHTML = `<p class="counter-number">${statusArr[i].count}</p>
    <p class="counter-percentage">${(allCount !== 0) ? `${Math.round(statusArr[i].count / allCount * 100)}%` : ""}</p>`;
  }
}
