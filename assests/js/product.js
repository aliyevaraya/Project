//////////

const prods = document.querySelector(".prods");
const PRODUCTS_URL = "http://localhost:8080/products";
const FAV_URL = "http://localhost:8080/favorites";

let copyArr = [];

function drawCards(arr) {
  prods.innerHTML = "";
  arr.forEach((el) => {
    prods.innerHTML += `
    <div class="col-md-6 col-sm-12 col-lg-4 col-md-6 carrd">
    <div class="prod">
      <div class="img">
        <div class="opacity">
          <div class="opacity-icons">
            <a href="#" onclick=addCart(${el.id})><i class="icon fa-solid fa-bag-shopping"></i></a>
            <a href="#" onclick=addFav(${el.id})><i class="icon fa-regular fa-heart"></i></a>
           <a href="./detail.html?id=${el.id}"><i class="icon fa-regular fa-eye"></i></a>
          </div>
        </div>
        <img src="${el.photo}" alt="" />
      </div>
      <div class="detail">
        <span class="add-info">Sale</span>
        <span>${el.type}</span>
        <h4>${el.name}</h4>
        <div class="prices">
          <span class="price">$${el.price}</span>
        </div>
      </div>
    </div>
  </div>
    `;
  });
}

async function getCard() {
  try {
    const res = await axios(PRODUCTS_URL);
    const data = res.data;
    copyArr = data;
    drawCards(copyArr);
  } catch (error) {
    console.log(error);
  }
}
getCard();

// function getMyCart() {
//   ul.innerHTML = "";
//   if(inCart.length==0){
//     ul.innerHTML='You cart is empty'
//   }
//  else{
//   inCart.slice(0, 3).forEach((prod) => {
//     ul.innerHTML += `
//     <li class="incart">
//               <div class="cart-info">
//                 <div class="img">
//                   <img src="${prod.photo}" alt="" />
//                 </div>
//                 <div class="info">
//                   <p class="prod-name">${prod.name}</p>
//                   <p class="prod-type">${prod.type}</p>
//                   <span class="prod-price">$${prod.price}.00</span>
//                 </div>
//               </div>
//               <a href="#" onclick=removerProd(${prod.id})><i class="fa-solid fa-xmark remove-prod"></i></a>
//             </li>
//     `;
//   });
//  }
// }

let favs = JSON.parse(localStorage.getItem("Favorites")) || [];
let fav;
async function addFav(id) {
  fav = copyArr.find((product) => product.id == id);
  let check = favs.find((prod) => prod.id == fav.id);
  if (check) {
    alert("Product already added to Favorites");
  } else {
    favs.push(fav);
    localStorage.setItem("Favorites", JSON.stringify(favs));
    getCard();
  }
}

let myCart = JSON.parse(localStorage.getItem("My Cart")) || [];
let quantity = document.querySelector(".number");
quantity.innerHTML = myCart.length;
let prod;

async function addCart(id) {
  let myCart = JSON.parse(localStorage.getItem("My Cart")) || [];
  prod = copyArr.find((prod) => prod.id == id);
  console.log(copyArr);
  console.log(prod);
  let check = myCart.find((item) => item.id == prod.id);
  if (!check) {
    myCart.push(prod);
    localStorage.setItem("My Cart", JSON.stringify(myCart));
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
    getMyCart();
  } else alert("Product already added to cart");
}
