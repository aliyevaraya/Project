const descContent = document.querySelector(".desc-content");
const manfContent = document.querySelector(".manf-content");
const reviewContent = document.querySelector(".review-content");
const desc = document.querySelector(".desc");
const manf = document.querySelector(".manf");
const review = document.querySelector(".review");

manfContent.style.display = "none";
reviewContent.style.display = "none";

function showDescContent(btn) {
  descContent.style.display = "block";
  btn.classList.add("active-btn");
  manf.classList.remove("active-btn");
  review.classList.remove("active-btn");
  manfContent.style.display = "none";
  reviewContent.style.display = "none";
}
function showManfContent(btn) {
  manfContent.style.display = "block";
  manfContent.style.opacity = 1;
  btn.classList.add("active-btn");
  desc.classList.remove("active-btn");
  review.classList.remove("active-btn");
  descContent.style.display = "none";
  reviewContent.style.display = "none";
}
function showReviewContent(btn) {
  reviewContent.style.display = "flex";
  reviewContent.style.opacity = 1;
  btn.classList.add("active-btn");
  manf.classList.remove("active-btn");
  desc.classList.remove("active-btn");
  manfContent.style.display = "none";
  descContent.style.display = "none";
}

let id = new URLSearchParams(window.location.search).get("id");
const PRODUCTS_URL = "http://localhost:8080/products";
const row = document.querySelector(".prod-detail");


async function drawDetail() {
  try {
      const res= await  axios(`${PRODUCTS_URL}/${id}`)
  const data= res.data
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
        <input type="number" value="1" />
        <button class="plus"><i class="fa-solid fa-plus"></i></button>
      </div>
      <p class="pieces">80 pieces available</p>
      <div class="btns">
        <a href="#" class="add-cart" onclick="addToMyCart()">Add to Cart</a>
        <a href="./cart.html" class="buy">Buy now</a>
      </div>
    </div>
    `;
  } catch (error) {
      console.log(error);
  }
    }
  drawDetail();