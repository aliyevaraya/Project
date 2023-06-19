const tbody = document.querySelector("tbody");

let myCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
let numberOfProd = document.querySelector(".number");
numberOfProd.innerHTML = myCart.length;

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
            oninput=countOfProd(${item.id},${item.price},${item.total},this)
            value="1"
            min="1"
            max="50"
          />
        </td>
        <td class="price total">$${item.total}</td>
        <td><i class="fa-solid fa-xmark" onclick=deleteProd(${item.id})></i></td>
        `;
    tbody.append(tr);
  });
}
getTableCart();

function countOfProd(id, price, total, input) {
  let myCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
  cart = myCart.find((item) => item.id == id);
  total = input.value * price;
  cart.total = total;
  input.value = Number(input.value) + 0;
  console.log(input.value);
  console.log(price);
  console.log(cart.total);
  // localStorage.setItem("My_Cart", JSON.stringify(myCart));
}
// getTableCart();

function deleteProd(id) {
  myCart = myCart.filter((prod) => prod.id != id);
  localStorage.setItem("My_Cart", JSON.stringify(myCart));
  numberOfProd.innerHTML -= 1;
  getTableCart();
}
