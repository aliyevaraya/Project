const nav = document.querySelector('.header-nav')

function scrollFunc() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        nav.classList.add("fixed-nav")
    } else {
        nav.classList.remove("fixed-nav")

    }
}

window.onscroll = function () { scrollFunc() }


let valueDisplay = document.querySelector(".quantity");


  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-max"));
  let counter = setInterval(() => {
    startValue += 1;
    valueDisplay.innerHTML = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, 50);