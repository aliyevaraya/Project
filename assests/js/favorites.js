const FAV_URL = "http://localhost:8080/favorites";
const cards = document.querySelector(".favs");

 function drawFav(arr) {
  cards.innerHTML = "";
  arr.forEach((el) => {
    cards.innerHTML += `
    <div class="card fav" style="width: 15rem">
    <img src="${el.photo}" class="card-img-top fav-img" alt="product"/>
    <div class="card-body fav-content">
      <h5 class="card-title">${el.name}</h5>
      <h6>${el.type}</h6>
      <p class="price">$${el.price}</p>
      <a href="#" onclick=delFav(${el.id},this) class="btn remove">Remove Fav</a>
    </div>
  </div>
        `;
  });
}

async function getFav() {
try {
    let res = await axios(FAV_URL);
    let data = await res.data;
    drawFav(data);
} catch (error) {
    console.log(error);
}
}
getFav()

async function delFav(id, btn) {
  await axios.delete(`${FAV_URL}/${id}`);
  btn.closest(".fav").remove();
}
