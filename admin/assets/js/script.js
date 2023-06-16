const ctx = document.getElementById("barchart").getContext("2d");
const barchart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Vodka", "Whiskey", "Gin", "Rum", "Tequila", "Others"],
    datasets: [
      {
        label: "Products statics",
        data: [2, 19, 13, 25, 2, 13],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
const PRODUCT_URL = "http://localhost:8080/products";
const BLOG_URL = "http://localhost:8080/blogs";
const TEAM_URL = "http://localhost:8080/team";

async function getCounts() {
    const res = await axios(PRODUCT_URL);
    const data = res.data;
    const res2 = await axios(TEAM_URL);
    const data2 = res2.data;
    const res3 = await axios(BLOG_URL);
    const data3 = res3.data;
  const cards = document.querySelector(".cards");
  cards.innerHTML = `
<div class="dash-card our-team">
    <h1><a href="./our-team.html">OurTeam</a> </h1>
    <span class="data-count">${data.length}</span>
</div>
<div class="dash-card products">
    <h1><a href="./product.html">Our Products</a></h1>
    <span class="data-count">${data2.length}</span>
</div>
<div class="dash-card blogs">
    <h1><a href="./blog.html">Recent Blogs</a></h1>
    <span class="data-count">${data3.length}</span>
</div>
`;
}
getCounts()