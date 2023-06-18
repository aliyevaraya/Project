const tbody = document.querySelector("tbody");
const search = document.querySelector("#search");
const BASE_URL= "http://localhost:8080/contact"

let copyArr = [];
let filtered = [];

async function drawTable(arr) {
    tbody.innerHTML = "";
    arr.forEach((msg) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
  <td>${msg.fullName}</td>
  <td>${msg.email}</td>
  <td>${msg.subject}</td>
  <td>${msg.message}</td>
  <td>
  <a href="#" class="btn text-danger" onclick=delMessage(${msg.id},this)><i class="fa-solid fa-trash-arrow-up fa-bounce"></i></a>
  </td>
  `;
      tbody.append(tr);
    });
  }

  async function getData() {
    try {
      const res = await axios(BASE_URL);
      const data = res.data;
      copyArr = data;
      filtered = filtered.length || search.value ? filtered : data;
      drawTable(filtered);
    } catch (error) {
      console.log(error);
    }
  }

  getData();
  async function delMessage(id, btn) {
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest("tr").remove();
  }
  
  search.addEventListener("input", async (e) => {
    filtered = copyArr;
    filtered = filtered.filter((el) =>
      el.subject.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    defaultArr = filtered;
    getData();
  });