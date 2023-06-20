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

let copyArr = [];
let filtered = [];
let status = false;
let workerId;
let base64;

function drawTable(arr) {
  tbody.innerHTML = "";
  arr.forEach((element) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><img src="${element.photo}" alt="" /></td>
        <td style="text-transform:uppercase">${element.name} ${element.surname}</td>
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

async function getData() {
  try {
    let res = await axios(`${BASE_URL}`);
    let data = res.data;
    copyArr = data;
    filtered = filtered.length || search.value ? filtered : data;
    drawTable(filtered);
  } catch (error) {
    console.log(error);
  }
}
getData();

async function delWorker(id) {
let result=confirm("Are you sure?")
if(result){
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest("tr").remove();
    showAlert(`user succesfully deleted`, `danger`);
  } catch (error) {
    console.log(error);
  }
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
  title.innerHTML = "Edit Worker";
}

const emptyInput = () => {
  name.value = "";
  surname.value = "";
  job.value = "";
};

form.addEventListener("submit", async(e) => {
  e.preventDefault();
  if (name.value && surname.value && job.value && photo.value) {
    let obj = {
      name: name.value,
      surname: surname.value,
      job: job.value,
      photo: base64,
    };

    if (status) {
      await axios.patch(`${BASE_URL}/${workerId}`, obj);
      emptyInput();
      showAlert(`New product succesfully added`, `success`);
    } else {
     await axios.post(BASE_URL, obj);
      emptyInput();
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
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  base64 = await convertBase64(file);
};

photo.addEventListener("change", (e) => {
  uploadImage(e);
});
