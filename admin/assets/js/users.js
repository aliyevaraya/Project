const BASE_URL = " http://localhost:8080/users";
const tbody = document.querySelector("tbody");
const search = document.querySelector("#search");
const isAdmin = document.querySelector("#isAdmin");
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
          <td>
          <button class="btn" onclick=editAdmin(${user.id},${user.isAdmin},this)>${user.isAdmin}</button>
          </td>     
           <td>
            <a href="#" class="btn text-danger" onclick=delUser(${user.id},this)><i class="fa-solid fa-trash-arrow-up fa-bounce"></i></a>
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

async function editAdmin(id,isAdmin, btn) {
  if (isAdmin) {
    let obj={
      isAdmin: false
    }
  await axios.patch(`${BASE_URL}/${id}`,obj)
  }else {
    let obj={
      isAdmin: true
    }
  await axios.patch(`${BASE_URL}/${id}`,obj)

  }
  console.log(isAdmin);

  // console.log(user);
  // getData()
}

async function delUser(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest("tr").remove();
  } catch (error) {
    console.log(error);
  }
}


search.addEventListener("input", async (e) => {
  filtered = copyArr;
  filtered = filtered.filter((el) =>
    el.username.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  getData();
});
