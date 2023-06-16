const BASE_URL = " http://localhost:8080/team";
const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const job = document.querySelector("#job");
const photo = document.querySelector("#photo");
const title = document.querySelector(".title");
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const submitBtn = document.querySelector(".submit");
const notification = document.querySelector("#notif");
const search = document.querySelector("#search");
let copyArr=[]
let filtered=[]

function drawTable(arr) {
  tbody.innerHTML = "";
  arr.forEach((element) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><img src="./${element.photo}" alt="" /></td>
        <td>${element.name} ${element.surname}</td>
        <td>${element.job}</td>
        <td>
          <a href="#"  class="btn text-success" onclick=editWorker(${element.id}) ><i class="fa-solid fa-pen-to-square fa-bounce"></i></a>
          <a href="#" class="btn text-danger" onclick=delWorker(${element.id},this)><i class="fa-solid fa-trash-arrow-up fa-bounce"></i></a>
        </td>
        `;
    tbody.append(tr);
  });
}

function showAlert(massage, className) {
  notification.innerHTML = massage;
  notification.className = `alert alert-${className}`;
  notification.removeAttribute("hidden");
  setTimeout(() => {
    notification.setAttribute("hidden", "");
  }, 9000);
}

let status = false;
let userId;

async function getData() {
  try {
    let res = await axios(`${BASE_URL}`);
    let data = res.data;
    copyArr=data
    filtered = filtered.length || search.value ? filtered : data;
    drawTable(filtered);
  } catch (error) {
    console.log(error);
  }
}
getData();

async function delWorker(id) {
try {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest("tr").remove();
  showAlert(`user succesfully deleted`, `danger`);
} catch (error) {
  console.log(error);
}

}

async function editWorker(id) {
  workerId = id;
  status = true;
  filtered = copyArr.find((el) => el.id == id);
  name.value = filtered.name;
  surname.value = filtered.surname;
  job.value = filtered.job;
  submitBtn.innerHTML = "Edit";
  title.innerHTML="Edit Worker"
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value && surname.value && job.value && photo.value) {
    let obj = {
      name: name.value,
      surname: surname.value,
      job: job.value,
      photo: `./assets/images/${photo.value.split("\\")[2]}`
    };

    if (status) {
      axios.patch(`${BASE_URL}/${workerId}`, obj);
      showAlert(`New product succesfully added`, `success`);
    } else {
      axios.post(BASE_URL, obj);
      showAlert(`Product succesfully undated`, `primary`);
    }
  } else {
    showAlert("please fill all fields", "danger");
  }
});

search.addEventListener("input", async (e) => {
  filtered = copyArr;
  filtered = filtered.filter((el) =>
    el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  getData();
});