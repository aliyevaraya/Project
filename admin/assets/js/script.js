const PRODUCT_URL = "http://localhost:8080/products";
const BLOG_URL = "http://localhost:8080/blogs";
const TEAM_URL = "http://localhost:8080/team";
const USERS_URL = "http://localhost:8080/users";
const CONTACT_URL = "http://localhost:8080/contact";


async function getCounts() {
    const res = await axios(PRODUCT_URL);
    const data = res.data;
    const res2 = await axios(TEAM_URL);
    const data2 = res2.data;
    const res3 = await axios(BLOG_URL);
    const data3 = res3.data;
    const res4 = await axios(CONTACT_URL);
    const data4 = res4.data;
    const res5 = await axios(USERS_URL);
    const data5 = res5.data;
  const cards = document.querySelector(".cards");
  cards.innerHTML = `
<div class="dash-card our-team">
    <h1><a href="./our-team.html">OurTeam</a> </h1>
    <span class="data-count">${data2.length}</span>
</div>
<div class="dash-card products">
    <h1><a href="./product.html">Our Products</a></h1>
    <span class="data-count">${data.length}</span>
</div>
<div class="dash-card blogs">
    <h1><a href="./blog.html">Recent Blogs</a></h1>
    <span class="data-count">${data3.length}</span>
</div>
<div class="dash-card contact">
<h1><a href="./contact.html">Contact</a></h1>
<span class="data-count">${data4.length}</span>
</div>
<div class="dash-card users">
<h1><a href="./users.html">Users</a></h1>
<span class="data-count">${data5.length}</span>
</div>
`;
const ctx = document.getElementById("barchart").getContext("2d");
const barchart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Blogs", "Contact", "Users", "Team", "Product"],
    datasets: [
      {
        label: "data statics",
        data: [data3.length, data4.length, data5.length, data2.length, data.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
}
getCounts()

