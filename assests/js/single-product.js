const descContent = document.querySelector(".desc-content");
const manfContent = document.querySelector(".manf-content");
const reviewContent = document.querySelector(".review-content");
const desc = document.querySelector(".desc");
const manf = document.querySelector(".manf");
const review = document.querySelector(".review");

manfContent.style.display = "none";
reviewContent.style.display = "none";

function showDescContent(btn) {
  descContent.style.display = "block";
  btn.classList.add("active-btn");
  manf.classList.remove("active-btn");
  review.classList.remove("active-btn");
  manfContent.style.display = "none";
  reviewContent.style.display = "none";
  console.log(descContent);
}
function showManfContent(btn) {
  manfContent.style.display = "block";
  manfContent.style.opacity = 1;
  btn.classList.add("active-btn");
  desc.classList.remove("active-btn");
  review.classList.remove("active-btn");
  descContent.style.display = "none";
  reviewContent.style.display = "none";
  console.log(manfContent);
}
function showReviewContent(btn) {
  reviewContent.style.display = "flex";
  reviewContent.style.opacity = 1;
  btn.classList.add("active-btn");
  manf.classList.remove("active-btn");
  desc.classList.remove("active-btn");
  manfContent.style.display = "none";
  descContent.style.display = "none";
  console.log(reviewContent);
}
