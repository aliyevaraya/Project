// function getPageList(totalPages, page, maxLength) {
//   function range(start, end) {
//     return Array.from(Array(end - start + 1), (_, i) => i + start);
//   }

//   var sideWidth = maxLength < 9 ? 1 : 2;
//   var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
//   var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

//   if (totalPages <= maxLength) {
//     return range(1, totalPages);
//   }

//   if (page <= maxLength - sideWidth - 1 - rightWidth) {
//     return range(1, maxLength - sideWidth - 1).concat(
//       0,
//       range(totalPages - sideWidth + 1, totalPages)
//     );
//   }

//   if (page >= totalPages - sideWidth - 1 - rightWidth) {
//     return range(1, sideWidth).concat(
//       0,
//       range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
//     );
//   }

//   return range(1, sideWidth).concat(
//     0,
//     range(page - leftWidth, page + rightWidth),
//     0,
//     range(totalPages - sideWidth + 1, totalPages)
//   );
// }

// $(function () {
//   var numberOfItems = $(".card-content .prod").length;
//   var limitPerPage = 6;
//   var totalPages = Math.ceil(numberOfItems / limitPerPage);
//   var paginationSize = 1;
//   var currentPage;

//   function showPage(whichPage) {
//     if (whichPage < 1 || whichPage > totalPages) return false;

//     currentPage = whichPage;

//     $(".card-content .prod")
//       .hide()
//       .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
//       .show();

//     $(".pagination li").slice(1, -1).remove();

//     $(".previous-page").toggleClass("disable", currentPage === 1);
//     $(".next-page").toggleClass("disable", currentPage === totalPages);
//     return true;
//   }

//   $(".pagination").append(
//     $("<li>")
//       .addClass("page-item")
//       .addClass("previous-page")
//       .append(
//         $("<a>")
//           .addClass("page-link")
//           .attr({ href: "javascript:void(0)" })
//           .text("<")
//       ),
//     $("<li>")
//       .addClass("page-item")
//       .addClass("next-page")
//       .append(
//         $("<a>")
//           .addClass("page-link")
//           .attr({ href: "javascript:void(0)" })
//           .text(">")
//       )
//   );

//   $(".card-content").show();
//   showPage(1);

//   $(document).on(
//     "click",
//     ".pagination li.current-page:not(.active)",
//     function () {
//       return showPage(+$(this).text());
//     }
//   );

//   $(".next-page").on("click", function () {
//     return showPage(currentPage + 1);
//   });

//   $(".previous-page").on("click", function () {
//     return showPage(currentPage - 1);
//   });
// });

//////////

const prods = document.querySelector(".prods");
const PRODUCTS_URL = "http://localhost:8080/products";
const FAV_URL = "http://localhost:8080/favorites";

let copyArr = [];

function drawCards(arr) {
  prods.innerHTML = "";
  arr.forEach((el) => {
    prods.innerHTML += `
    <div class="col-md-6 col-sm-12 col-lg-4 col-md-6">
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

let favs = JSON.parse(localStorage.getItem("Favorites")) || [];
let fav;
async function addFav(id) {
  fav = copyArr.find((product) => product.id == id);
  let check = favs.find(prod=>prod.id==fav.id);
  if (check) {
    alert("Product already added to Favorites");
  } else {
    favs.push(fav);
    localStorage.setItem("Favorites", JSON.stringify(favs));
    getCard()
  }
}

let myCart = JSON.parse(localStorage.getItem("My Cart")) || [];
let prod;
async function addCart(id) {
  prod = copyArr.find((prod) => prod.id == id);
  console.log(prod);
  let check = myCart.find(item=>item.id==prod.id);
  if (!check) {
    myCart.push(prod);
    localStorage.setItem("My Cart", JSON.stringify(myCart));
    getCard()
  }else alert("Product already added to cart")
}
