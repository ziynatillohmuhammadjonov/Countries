const cardsContainer = document.querySelector(".cards-container");
const spinner = document.querySelector(".spinner");
const modeBtn = document.querySelector(".dark-mode-btn");
const api = "https://restcountries.com/v3.1/all";

if (localStorage.getItem("mode")) {
  document.body.classList.add("dark-mode");
}

const request = new XMLHttpRequest();

request.addEventListener("readystatechange", () => {
  if (request.readyState == 4 && request.status == 200) {
    spinner.classList.add("hidden");
    JSON.parse(request.responseText).forEach((item) => {
      getCounter(item);
    });
  }
});

request.open("GET", api);
request.send();

function getCounter(obj) {
  const {
    name: { common },
    flags: { svg },
    capital,
    population,
    region,
  } = obj;
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="card">
                    <img src="${svg}" class="card-img" />
                    <div class="card-body">
                        <h5 class="card-title">${common}</h5>
                        <p><b>Population: ${population}</b></p>
                        <p><b>Region: ${region}</b></p>
                        <p>
                            <b>Capital: ${capital ? capital : "No CAPITAL"}</b>
                        </p>
                    </div>
  `;
  cardsContainer.appendChild(div);
}
modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("mode", document.body.classList.contains("dark-mode"));
});
