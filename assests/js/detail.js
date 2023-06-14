let id = new URLSearchParams(window.location.search).get("id");
console.log(id);
const PRODUCTS_URL = "http://localhost:8080/products";
const card = document.querySelector(".product-details");

async function drawDetail() {
try {
    const res= await  axios(`${PRODUCTS_URL}/${id}`)
const data= res.data
    card.innerHTML = `
    <div class="col-lg-8 col-md-10">
    <div class="detail">
      <div class="detail-img">
        <img src="${data.photo}" alt="" />
      </div>
      <div class="detail-info">
      <h2>${data.name}</h2>
      <h5>${data.type}</h5>
        <h4>$${data.price}</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          eligendi cupiditate harum maxime eveniet quibusdam eius, at,
          unde ullam vel rerum magni libero nobis neque enim?
          Dignissimos soluta quaerat ad!
        </p>
      </div>
    </div>
  </div>
  `;
} catch (error) {
    console.log(error);
}
  }
drawDetail();