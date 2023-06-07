let valueDisplays = document.querySelectorAll(".quantity");

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-max"));
  let counter = setInterval(() => {
    startValue += 1;
    valueDisplay.innerHTML = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, 5000/endValue);
});
