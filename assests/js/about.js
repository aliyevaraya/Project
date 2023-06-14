// COUNT
let a = 0;
$(window).scroll(function () {
  let oTop = $("#statics").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".count").each(function () {
      let $this = $(this);
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.text() },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.ceil(this.Counter));
          },
        }
      );
    });
    a = 1;
  }
});

// CARDS
const blogs = document.querySelector(".blogs");
const BLOG_URL = "http://localhost:8080/blogs";

let copyArr = [];

function drawCards(arr) {
  blogs.innerHTML = "";
  arr.forEach((el) => {
    blogs.innerHTML += `
    <div class="col-md-6 col-sm-12 mb-5">
    <div class="blog">
    <div class="blog-img">
    <img src="${el.photo}" alt="" />
  </div>
  <div class="blog-content">
    <div class="date">
      <i class="fa-solid fa-calendar-days"></i>
      <span>${el.date}</span>
    </div>
    <h3>${el.title}</h3>
    <p>
     ${el.content.slice(0, 70)}...
    </p>
    <a href="./blog.html"
      >Continue<i class="fa-solid fa-right-long arrow"></i
    ></a>
  </div>
  </div>
  </div>
    `;
  });
}

async function getCard() {
  const res = await axios(BLOG_URL);
  const data = res.data;
  copyArr = data;
  console.log(copyArr);
  drawCards(copyArr);
}
getCard();
