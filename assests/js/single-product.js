const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");
  });
});

let id = new URLSearchParams(window.location.search).get("id");
const PRODUCTS_URL = "http://localhost:8080/products";
const row = document.querySelector(".prod-detail");

function getMyCart() {
  let myCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
  ul.innerHTML = "";
  if (myCart.length == 0) {
    ul.innerHTML = "You cart is empty";
  } else {
    myCart.slice(0, 3).forEach((prod) => {
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

async function drawDetail() {
  try {
    const res = await axios(`${PRODUCTS_URL}/${id}`);
    const data = res.data;
    row.innerHTML = `
      <div class="col-md-5 prod-img">
      <img src="${data.photo}" alt="" />
    </div>
    <div class="col-md-7 prod-info">
      <h2>${data.name}</h2>
      <div class="score">
        <div class="stars">
          <span class="stars-num">5.0</span>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div>
          <span>100</span>
          <span class="text">Rating</span>
        </div>
        <div>
          <span>500</span>
          <span class="text">Sold</span>
        </div>
      </div>
      <h3>$${data.price}</h3>
      <p>
        A small river named Duden flows by their place and supplies it
        with the necessary regelialia. It is a paradisematic country, in
        which roasted parts of sentences fly into your mouth.
      </p>
      <p>
        On her way she met a copy. The copy warned the Little Blind Text,
        that where it came from it would have been rewritten a thousand
        times and everything that was left from its origin would be the
        word "and" and the Little Blind Text should turn around and return
        to its own, safe country. But nothing the copy said could convince
        her and so it didn't take long until a few insidious Copy Writers
        ambushed her, made her drunk with Longe and Parole and dragged her
        into their agency, where they abused her for their.
      </p>
      <div class="order-count">
        <button class="minus"><i class="fa-solid fa-minus"></i></button>
        <input type="number" value="${data.quantity}" min="1"/>
        <button class="plus"><i class="fa-solid fa-plus"></i></button>
      </div>
      <p class="pieces">80 pieces available</p>
      <div class="btns">
        <a href="#" class="add-cart" onclick="addToMyCart(${data.id},${data.quantity})">Add to Cart</a>
        <a href="./cart.html" class="buy">Buy now</a>
      </div>
    </div>
    `;
  } catch (error) {
    console.log(error);
  }
}
drawDetail();

let myCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
let basketNumber = document.querySelector(".number");
basketNumber.innerHTML = myCart.length;

async function addToMyCart(id) {
  let myCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
  const res = await axios(`${PRODUCTS_URL}/${id}`);
  const data = res.data;
  let check = myCart.find((item) => item.id == data.id);
  if (!check) {
    myCart.push(data);
    localStorage.setItem("My_Cart", JSON.stringify(myCart));
    basketNumber.innerHTML = Number(basketNumber.innerHTML) + 1;
    getMyCart();
  } else alert("Product already added to cart");
}
