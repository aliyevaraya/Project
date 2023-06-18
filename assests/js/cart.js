const tbody = document.querySelector("tbody");

let myCart = JSON.parse(localStorage.getItem("My Cart")) || [];

function getTableCart() {
  tbody.innerHTML = "";
  myCart.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox" class="check" /></td>
        <td>
          <img src="${item.photo}" alt="" srcset="" />
        </td>
        <td>
          <div class="product">
            <h4>${item.name}</h4>
            <p>Fugiat voluptates quasi nemo, ipsa perferendis</p>
          </div>
        </td>
        <td class="price">$${item.price}</td>
        <td>
          <input
            type="number"
            class="input-number"
            oninput=onInput(${item.id},${item.price},this)
            value="1"
            min="1"
            max="50"
          />
        </td>
        <td class="price total">$${item.price}</td>
        <td><i class="fa-solid fa-xmark" onclick=deleteProd(${item.id})></i></td>
        `;
    tbody.append(tr);
});
}

function onInput(id,price,input) {
    cart=myCart.find(item=>item.id==id)

}
window.onload = function () {
    getTableCart();
  };

function deleteProd(id) {
  myCart = myCart.filter((prod) => prod.id != id);
  localStorage.setItem("My Cart", JSON.stringify(myCart));
  getTableCart()
}
