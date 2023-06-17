const tbody =document.querySelector("tbody")

let myCart = JSON.parse(localStorage.getItem("My Cart"))||[];
console.log(myCart);

function getMyCart() {
    tbody.innerHTML=''
    myCart.forEach(item => {
        const tr= document.createElement("tr")
        tr.innerHTML=`
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
            value="1"
            min="1"
            max="50"
          />
        </td>
        <td class="price total">$${item.price}</td>
        <td><i class="fa-solid fa-xmark"></i></td>
        `
        tbody.append(tr)
      
    });
}
getMyCart()

const totalNumber=document.querySelector(".input-number")
const totalPrice=document.querySelector(".total")
const price=document.querySelector(".price")
totalNumber.addEventListener("input",(e)=>{
totalPrice.innerHTML=`$${e.target.value*price.innerHTML.slice(1)}`
})