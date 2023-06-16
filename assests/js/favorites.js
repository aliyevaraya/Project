let favs = JSON.parse(localStorage.getItem("Favorites"));
const cards = document.querySelector(".favs");

function drawFav() {
  cards.innerHTML = "";
  favs.forEach((fav) => {
    cards.innerHTML += `
    <div class="card fav" style="width: 15rem">
    <img src="${fav.photo}" class="card-img-top fav-img" alt="product"/>
    <div class="card-body fav-content">
      <h5 class="card-title">${fav.name}</h5>
      <h6>${fav.type}</h6>
      <p class="price">$${fav.price}</p>
      <a href="#" onclick=delFav(${fav.id},this) class="btn remove">Remove Fav</a>
    </div>
  </div>
        `;
  });
}
drawFav()
function delFav(id, btn) {
  favs = favs.filter((user) => user.id != id);
  localStorage.setItem("Favorites", JSON.stringify(favs));
  btn.closest(".fav").remove();
  drawFav();
}
