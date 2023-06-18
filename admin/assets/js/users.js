const BASE_URL = " http://localhost:8080/users";
const tbody = document.querySelector("tbody");
const search = document.querySelector("#search");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const isAdmin = document.querySelector("#isAdmin");
const title = document.querySelector(".title");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit");

let copyArr = [];
let filtered = [];
let status = false;
let userId;

function drawData(arr) {
  tbody.innerHTML = "";
  arr.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.isAdmin}</td>
          <td>
            <a href="#" class="btn text-danger" onclick=delUser(${user.id},this)><i class="fa-solid fa-trash-arrow-up fa-bounce"></i></a>
            <a href="#"  class="btn text-success" onclick=editUser(${user.id}) ><i class="fa-solid fa-pen-to-square fa-bounce"></i></a>
            </td>
          `;
    tbody.append(tr);
  });
}

async function getData() {
  try {
    let res = await axios(`${BASE_URL}`);
    let data = res.data;
    copyArr = data;
    filtered = filtered.length || search.value ? filtered : data;
    drawData(filtered);
  } catch (error) {
    console.log(error);
  }
}
getData();

async function delUser(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest("tr").remove();
  } catch (error) {
    console.log(error);
  }
}
async function editUser(id) {
    userId = id;
    status = true;
    filtered = copyArr.find((user) => user.id == id);
    userName.value = filtered.username;
    email.value = filtered.email;
    password.value = filtered.password;
    isAdmin.value=filtered.isAdmin
    submitBtn.innerHTML = "Edit";
    title.innerHTML = "Edit User";
  }

  const emptyInput = () => {
    userName.innerHTML = "";
    email.innerHTML = "";
    password.innerHTML = "";
    isAdmin.innerHTML = "";
  };
  form.addEventListener("submit", async(e) => {
    e.preventDefault();
    if (userName.value && email.value && password.value && isAdmin.value) {
      let obj = {
        userName: userName.value,
        email: email.value,
        password: password.value,
        isAdmin: isAdmin.value,
      };
  
      if (status) {
        await axios.patch(`${BASE_URL}/${userId}`, obj);
        emptyInput();
      } else {
       await axios.post(BASE_URL, obj);
        emptyInput();
      }
    } else {
      alert("please fill all fields");
    }
  });
search.addEventListener("input", async (e) => {
  filtered = copyArr;
  filtered = filtered.filter((el) =>
    el.username.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  getData();
});
