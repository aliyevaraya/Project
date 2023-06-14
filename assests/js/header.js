// BURGER-MENU
const menuIcon = document.querySelector(".menu");
const burgerMenu = document.querySelector(".burger-menu");
const closeIcon = document.querySelector(".burger-menu-close");
const headerNav = document.querySelector(".header-nav");
menuIcon.addEventListener("click", () => {
  burgerMenu.classList.add("show-burger");
});
closeIcon.addEventListener("click", () => {
  burgerMenu.classList.remove("show-burger");
});
let dropdown = document.querySelector('.mobile-dropdown');
let dropdownToggle = document.querySelector(".mobilebar-toggle");

dropdownToggle.addEventListener('click', () => {
	if (dropdown.classList.contains('show')) {
		dropdown.classList.remove('show');
	} else {
		dropdown.classList.add('show');
	}
})


// HEADER FIXED SCROLL
const nav = document.querySelector(".header-nav");
function scrollFunc() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    nav.classList.add("fixed-nav");
  } else {
    nav.classList.remove("fixed-nav");
  }
}
window.onscroll = function () {
  scrollFunc();
};

// LOGIN-SIGNUP
const popUp = document.querySelector(".popup");
const logIn = document.querySelector(".login-link");
const register = document.querySelector(".register-link");
const closePopUp = document.querySelector(".icon-close");
const openPopUp = document.querySelector(".btnLogin-popup");

register.addEventListener("click", () => {
  console.log("hi");
  popUp.classList.add("active");
});
logIn.addEventListener("click", () => {
  popUp.classList.remove("active");
});
closePopUp.addEventListener("click", () => {
  popUp.style.opacity = 0;
});
openPopUp.addEventListener("click", () => {
  popUp.style.opacity = 1;
});

// BASKET SIDEBAR
const openBasket = document.querySelector(".basket");
const closeBasket = document.querySelector(".close-cart");
const myBasket = document.querySelector("#my-cart");

openBasket.addEventListener("click", () => {
  myBasket.style.right = 0;
});
closeBasket.addEventListener("click", () => {
  myBasket.style.right = "-100%";
});
