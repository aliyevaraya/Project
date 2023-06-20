const BASE_URL = "http://localhost:8080/products";

const name = document.querySelector("#name");
const price = document.querySelector("#price");
const photo = document.querySelector("#photo");
const type = document.querySelector("#type");
const title = document.querySelector(".title");
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const search = document.querySelector("#search");
const sortBtn = document.querySelector("#sort");
const submitBtn = document.querySelector(".submit");

let copyArr = [];
let filtered = [];
let defaultArr = [];
let prodId;
let status = false;
let base64;

async function drawTable(arr) {
  tbody.innerHTML = "";
  arr.forEach((prod) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
<td><img src="${prod.photo}"/></td>
<td>${prod.name}</td>
<td>${prod.type}</td>
<td>${prod.price}</td>
<td>
<a href="#"  class="btn text-success" onclick=editProd(${prod.id}) ><i class="fa-solid fa-pen-to-square fa-bounce"></i></a>
<a href="#" class="btn text-danger" onclick=delProd(${prod.id},this)><i class="fa-solid fa-trash-arrow-up fa-bounce"></i></a>
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

async function delProd(id, btn) {
  let result=confirm("are u sure?")
  if(result){
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest("tr").remove();
  }
}

async function editProd(id) {
  prodId = id;
  status = true;
  copyArr = copyArr.find((el) => el.id == id);
  name.value = copyArr.name;
  type.value = copyArr.type;
  price.value = copyArr.price;
  submitBtn.innerHTML = "Edit";
  title.innerHTML = "Edit Product";
}

const emptyInput = () => {
  name.value = "";
  type.value = "";
  price.value = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value && type.value && price.value && photo.value) {
    let obj = {
      name: name.value,
      type: type.value,
      price: price.value,
      photo: base64,
    };

    if (status) {
      axios.patch(`${BASE_URL}/${prodId}`, obj);
      emptyInput();
    } else {
      axios.post(BASE_URL, obj);
      emptyInput();
    }
  } else {
    alert("please fill all fields", "danger");
  }
});

search.addEventListener("input", async (e) => {
  filtered = copyArr;
  filtered = filtered.filter((el) =>
    el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  defaultArr = filtered;
});
getData();

sortBtn.addEventListener("change", () => {
  if (sortBtn.value == "asc") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  } else if (sortBtn.value == "dsc") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered = defaultArr;
  }
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