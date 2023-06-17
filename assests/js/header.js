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
let dropdown = document.querySelector(".mobile-dropdown");
let dropdownToggle = document.querySelector(".mobilebar-toggle");

dropdownToggle.addEventListener("click", () => {
  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  } else {
    dropdown.classList.add("show");
  }
});

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
const logInBtn = document.querySelector(".login-link");
const register = document.querySelector(".register-link");
const closePopUp = document.querySelector(".icon-close");
const openPopUp = document.querySelector(".btnLogin-popup");

register.addEventListener("click", () => {
  popUp.classList.add("active");
  emptyInput()
});
logInBtn.addEventListener("click", () => {
  popUp.classList.remove("active");
  emptyRgInput()
});
closePopUp.addEventListener("click", () => {
  popUp.style.display = "none";
});
openPopUp.addEventListener("click", () => {
  popUp.style.display = "flex";
});
// REGISTER FORM
const rgForm = document.querySelector("#rgForm");
const userName = document.querySelector("#userName");
const rgEmail = document.querySelector("#reg-email");
const rgPw = document.querySelector("#reg-pw");
const signUp = document.querySelector(".register-btn");
const agree = document.querySelector("#agree");
signUp.disabled = true;

userName.addEventListener("input", () => {
  checkAnyInput();
});
rgEmail.addEventListener("input", () => {
  checkAnyInput();
});
rgPw.addEventListener("input", () => {
  checkAnyInput();
});

function checkAnyInput() {
  if (userName.value && rgEmail.value && rgPw.value) {
    signUp.removeAttribute("disabled");
  } else {
    signUp.setAttribute("disabled", "");
  }
}

function emptyRgInput() {
  userName.value = "";
  rgEmail.value = "";
  rgPw.value = "";
  agree.checked=false
}

let usersData = JSON.parse(localStorage.getItem("UsersData")) || [];
rgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userObj = {
    name: userName.value,
    email: rgEmail.value,
    password: rgPw.value,
  };
  emptyRgInput()
  usersData.push(userObj);
  localStorage.setItem("UsersData", JSON.stringify(usersData));
  popUp.classList.remove("active");
});

// LOGIN FORM
const logInForm= document.querySelector("#login-form")
const email = document.querySelector("#email");
const pw = document.querySelector("#pw");
const remember = document.querySelector("#remember");
const logIn = document.querySelector(".login-btn");
logIn.disabled = true;

email.addEventListener("input", () => {
  checkLogInput();
});
pw.addEventListener("input", () => {
  checkLogInput();
});

function checkLogInput() {
  if (email.value && pw.value) {
    logIn.removeAttribute("disabled");
  } else {
    logIn.setAttribute("disabled", "");
  }
}
const emptyInput = ()=>{
  email.value=''
  pw.value=''
  remember.checked=false
}

logInForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  let user=usersData.find(user=>user.email==email.value && user.password==pw.value)
  if(user){
   alert(`welcome ${user.name}`)
   popUp.style.display = "none";
  }else{
    alert("wrong email or password")
  }
  emptyInput()
})



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
