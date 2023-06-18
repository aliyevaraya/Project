const BASE_URL = "http://localhost:8080/blogs";

const blogTitle = document.querySelector("#title");
const photo = document.querySelector("#photo");
const content = document.querySelector("#content");
const date = document.querySelector("#date");
const heading = document.querySelector(".title");
const form = document.querySelector("form");
const cards = document.querySelector("#blog-cards");
const submitBtn = document.querySelector(".submit");
const search = document.querySelector("#search");

let copyArr = [];
let filtered = [];
let base64;
async function drawTable(arr) {
  cards.innerHTML = "";
  arr.forEach((blog) => {
    cards.innerHTML += `
    <div class="card" style="width: 13rem">
    <img
      src="${blog.photo}"
      class="card-img-top"
      alt="..."
      style="width: 100%; height: 200px ;  object-fit: cover;
      object-position: 50% 50%;"
    />
    <div class="card-body">
      <h5 class="card-title">
        ${blog.title}
      </h5>
      <p class="card-text">
        ${blog.content.slice(0,50)}...
      </p>
      <p>${blog.date}</p>
      <a href="#" class="btn btn-danger" onclick=delCard(${blog.id},this)
        ><i class="fa-solid fa-trash-can"></i
      ></a>
      <a href="#" class="btn btn-success" onclick=editCard(${blog.id})
        ><i class="fa-solid fa-file-pen"></i
      ></a>
    </div>
  </div>
`;
  });
}

async function getData() {
  try {
    let res = await axios(BASE_URL);
    let data = res.data;
    copyArr = data;
    filtered = filtered.length || search.value ? filtered : data;
    drawTable(filtered);
  } catch (error) {
    console.log(error);
  }
}
getData();

async function delCard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest(".card").remove();
}

let blogId;
let status=false;

async function editCard(id) {
  blogId = id;
  status = true;
  filtered = filtered.find((el) => el.id == id);
  blogTitle.value = filtered.title;
  content.value = filtered.content;
  submitBtn.innerHTML = "Edit";
  heading.innerHTML = "Edit Blog";
}

const emptyInput = () => {
  blogTitle.value = "";
  content.value = "";
  date.value = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (blogTitle.value) {
    let obj = {
      title: blogTitle.value,
      content: content.value,
      date: date.value,
      photo: base64,
    };

    if (status) {
      axios.patch(`${BASE_URL}/${blogId}`, obj);
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
      el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    defaultArr = filtered;
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