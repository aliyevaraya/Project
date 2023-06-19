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
const logOut = document.querySelector(".logOut");

register.addEventListener("click", () => {
  popUp.classList.add("active");
  emptyInput();
});
logInBtn.addEventListener("click", () => {
  popUp.classList.remove("active");
  emptyRgInput();
});
closePopUp.addEventListener("click", () => {
  popUp.style.display = "none";
});
openPopUp.addEventListener("click", () => {
  popUp.style.display = "flex";
});

// REGISTER FORM
const USERS_URL = "http://localhost:8080/users";

const rgForm = document.querySelector("#rgForm");
const userName = document.querySelector("#userName");
const rgEmail = document.querySelector("#reg-email");
const rgPw = document.querySelector("#reg-pw");
const signUp = document.querySelector(".register-btn");
const agree = document.querySelector("#agree");

function emptyRgInput() {
  userName.value = "";
  rgEmail.value = "";
  rgPw.value = "";
  agree.checked = false;
}

rgForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userObj = {
    username: userName.value,
    email: rgEmail.value,
    password: rgPw.value,
    isAdmin: false,
  };
  let res=await axios(USERS_URL)
  let users=res.data
  console.log(users);
  let check=users.find(user=>user.email==userObj.email)
  console.log(check);
  if(!check){
    await axios.post(USERS_URL, userObj);
    emptyRgInput();
    popUp.classList.remove("active");
  }else alert('this email already used')
});

const setError = (element, message) => {
  const inputBox = element.parentElement;
  const errorDisplay = inputBox.querySelector(".error");
  errorDisplay.innerText = message;
  inputBox.classList.add("error");
  inputBox.classList.remove("success");
};

const setSuccess = (element) => {
  const inputBox = element.parentElement;
  const errorDisplay = inputBox.querySelector(".error");
  errorDisplay.innerText = "";
  inputBox.classList.add("success");
  inputBox.classList.remove("error");
};

const validateInputs = () => {
  userName.addEventListener("input", (e) => {
    if (e.target.value === "") {
      setError(userName, "Username is required");
    } else if (e.target.value.length < 3) {
      setError(userName, "Username must be at least 4 character.");
    } else {
      setSuccess(userName);
    }
  });

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  rgEmail.addEventListener("input", (e) => {
    if (e.target.value === "") {
      setError(rgEmail, "Email is required");
    } else if (!isValidEmail(e.target.value)) {
      setError(rgEmail, "Provide a valid email address");
    } else {
      setSuccess(rgEmail);
    }
  });

  rgPw.addEventListener("input", (e) => {
    if (e.target.value === "") {
      setError(rgPw, "Password is required");
    } else if (e.target.value.length < 8) {
      setError(rgPw, "Password must be at least 8 character.");
    } else {
      setSuccess(rgPw);
    }
  });
};
validateInputs();

// LOGIN FORM
const logInForm = document.querySelector("#login-form");
const email = document.querySelector("#email");
const pw = document.querySelector("#pw");
const remember = document.querySelector("#remember");
const logIn = document.querySelector(".login-btn");

const emptyInput = () => {
  email.value = "";
  pw.value = "";
  remember.checked = false;
};
let userData = JSON.parse(localStorage.getItem("User_Data"));

logInForm.addEventListener("submit", async (e) => {
  let res = await axios(USERS_URL);
  let usersData = res.data;
  e.preventDefault();
  let user = usersData.find(
    (user) => user.email == email.value && user.password == pw.value
  );
  if (user) {
    popUp.style.display = "none";
    userData.push(user);
    localStorage.setItem("User_Data",JSON.stringify(userData))
    alert(`welcome ${user.username}`);
  } else {
    alert("wrong email or password");
  }
  emptyInput();
});

logOut.addEventListener("click", () => {
  localStorage.clear("User_Data", JSON.stringify(userData));
});

// usersData.find(user=>user.email==="raya@gmail.com" && user.password==12121212)
// user.style.display="block"

// BASKET SIDEBAR
const openBasket = document.querySelector(".basket");
const closeBasket = document.querySelector(".close-cart");
const myBasket = document.querySelector("#my-cart");
const ul = document.querySelector(".my-cart");

openBasket.addEventListener("click", () => {
  myBasket.style.right = 0;
});
closeBasket.addEventListener("click", () => {
  myBasket.style.right = "-100%";
});

let inCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
let numberOf = document.querySelector(".number");
numberOf.innerHTML = inCart.length;

function getMyCart() {
  let inCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
  ul.innerHTML = "";
  if (inCart.length == 0) {
    ul.innerHTML = "You cart is empty";
  } else {
    inCart.slice(0, 3).forEach((prod) => {
      ul.innerHTML += `
    <li class="incart">
              <div class="cart-info">
                <div class="img">
                  <img src="${prod.photo}" alt="" />
                </div>
                <div class="info">
                  <p class="prod-name">${prod.name}</p>
                  <p class="prod-type">${prod.type}</p>
                  <span class="prod-price">$${prod.price}.00</span>
                </div>
              </div>
              <button onclick=removerProd(${prod.id})><i class="fa-solid fa-xmark remove-prod"></i></button>
            </li>
    `;
    });
  }
}

window.onload = function () {
  getMyCart();
};
function removerProd(id) {
  let inCart = JSON.parse(localStorage.getItem("My_Cart")) || [];
  inCart = inCart.filter((prod) => prod.id != id);
  localStorage.setItem("My_Cart", JSON.stringify(inCart));
  numberOf.innerHTML -= 1;
  getMyCart();
}
