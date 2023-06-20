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
      <a href="#" onclick=addCart(${fav.id},this) class="btn btn-success mt-2">Add Cart</a>
    </div>
  </div>
        `;
  });
}
drawFav();
function delFav(id, btn) {
  favs = favs.filter((user) => user.id != id);
  localStorage.setItem("Favorites", JSON.stringify(favs));
  btn.closest(".fav").remove();
  drawFav();
}
const PRODUCTS_URL = "http://localhost:8080/products";
let myCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
let quantity = document.querySelector(".number");
quantity.innerHTML = myCart.length;

async function getCard() {
  try {
    const res = await axios(PRODUCTS_URL);
    const data = res.data;
    copyArr = data;
  } catch (error) {
    console.log(error);
  }
}
getCard();

function getMyCart() {
  let inCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
  ul.innerHTML = "";
  if (inCart.length == 0) {
    ul.innerHTML = "You cart is empty";
  } else {
    inCart.slice(0, 3).forEach((prod) => {
      ul.innerHTML += `
    <li class="incart">
              <div class="cart-info">
                <div class="img">
                  <img src="${prod.photo}" alt="" />
                </div>
                <div class="info">
                  <p class="prod-name">${prod.name}</p>
                  <p class="prod-type">${prod.type}</p>
                  <span class="prod-price">$${prod.price}.00</span>
                </div>
              </div>
              <button onclick=removerProd(${prod.id})><i class="fa-solid fa-xmark remove-prod"></i></button>
            </li>
    `;
    });
  }
}

async function addCart(id) {
  let myCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
  prod = copyArr.find((prod) => prod.id == id);
  let check = myCart.find((item) => item.id == prod.id);
  if (!check) {
    myCart.push(prod);
    localStorage.setItem("My_Cart", JSON.stringify(myCart));
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
    getMyCart();
  } else {
    prod.quantity += 1;
  }
}
