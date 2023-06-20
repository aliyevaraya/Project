const darkModeBtn= document.querySelector(".dark-mode")
const notFound= document.querySelector("#not-found")

localStorage.getItem("dark") && document.body.classList.add("dark");
darkModeBtn.addEventListener("click", () => {
  if (localStorage.getItem("dark")) {
    localStorage.removeItem("dark");
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("dark", "mode");
  }
});



let userData = JSON.parse(localStorage.getItem("User_Data"));
if(userData&& userData.isAdmin){
  dashboard.style.display="block"
  notFound.style.display="none"
}else{
  notFound.style.display="block"
  dashboard.style.display="none"
}