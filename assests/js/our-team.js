
const team = document.querySelector(".members");
const TEAM_URL = "http://localhost:8080/team";

let copyArr = [];

function drawCards(arr) {
    team.innerHTML = "";
  arr.forEach((el) => {
    team.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-4 mb-4">
    <div class="team-member">
      <div class="team-member-img">
        <div class="img">
          <img src="${el.photo}"/>
        </div>
        <div class="hover">
          <div class="social-icons">
            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div class="team-member-info">
        <h5>${el.name} ${el.surname}</h5>
        <p>${el.job}</p>
      </div>
    </div>
  </div>
    `;
  });
}

async function getCard() {
try {
  const res = await axios(TEAM_URL);
  const data = res.data;
  copyArr = data;
  drawCards(copyArr);
} catch (error) {
  console.log(error);
}
}
getCard();
