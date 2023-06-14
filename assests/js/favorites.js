const BASE_URL = "http://localhost:8080/favs";
const cards = document.querySelector(".we-care-contents");

 function drawFav(arr) {
  cards.innerHTML = "";
  arr.forEach((el) => {
    cards.innerHTML += `
        <div class="col-lg-4 mb-3">
        <div class="we-care-content">
          <img src="${el.photo}" alt="" />
          <div class="we-care-content-text mt-3">
            <h5>${el.title}</h5>
            <p>
              ${el.content}
            </p>
            <span class="price d-inline-block mb-2">${el.price}$</span>
            </div>
            <button class="btn btn-danger" onclick=delFav(${el.id},this)>Remove from Fav</button>
          </div>
        </div>
      </div>
        `;
  });
}

async function getFav() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  drawFav(data);
}
getFav()

async function delFav(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest(".we-care-content").remove();
}
