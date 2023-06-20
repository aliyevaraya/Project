const tbody = document.querySelector("tbody");
const subTotal = document.querySelector(".subtotal");
const allTotal = document.querySelector(".all");

let myCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
let numberOfProd = document.querySelector(".number");
numberOfProd.innerHTML = myCart.length;

function getTableCart() {
  tbody.innerHTML = "";
  myCart.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox" class="checkbox" id="id${item.id}" onclick=check(this) 
        /></td>
        <td>
          <img src="${item.photo}" alt=""/>
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
            oninput=countOfProd(${item.price},this)
            value="1"
            min="1"
            max="50"
          />
        </td>
        <td class="price ">$<span class="total">${item.total}</span></td>
        <td><i class="fa-solid fa-xmark" onclick=deleteProd(${item.id})></i></td>
        `;
    tbody.append(tr);
  });
}
getTableCart();

function countOfProd(price, input) {
  totalPrice = input.value * price;
  input.closest("tr").querySelector(".total").innerText = totalPrice;
  let checkbox = input.closest("tr").querySelector(".checkbox");
  input.value = Number(input.value) + 0;
  console.log(totalPrice);
  if (checkbox.checked) {
    subTotal.innerText = Number(subTotal.innerText) + +price;
    allTotal.innerText = Number(allTotal.innerText) + +price;
  }
}
function check(checkbox) {
  let totalPrice =checkbox.closest("tr").querySelector(".total").innerText 
  if (checkbox.checked) {
    subTotal.innerText = Number(subTotal.innerText) + +totalPrice;
    allTotal.innerText = Number(allTotal.innerText) + +totalPrice;
  } else {
    subTotal.innerText = Number(subTotal.innerText) - +totalPrice;
    allTotal.innerText = Number(allTotal.innerText) - +totalPrice;
  }
}

function deleteProd(id) {
  myCart = myCart.filter((prod) => prod.id != id);
  localStorage.setItem("My_Cart", JSON.stringify(myCart));
  numberOfProd.innerHTML -= 1;
  getTableCart();
}
