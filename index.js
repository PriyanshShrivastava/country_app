const request = new XMLHttpRequest();
const submitBtnEl = document.getElementById("submit-btn");
const inputValueEL = document.querySelector("input");
const containerEl = document.getElementById("container");
const cardContainerEl = document.getElementById("card-container");
const resetBtn = document.getElementById("reset");
let html = ``;
function updateUI(data) {
  html = `
     
          <div
            class="flex rounded-sm border-b-2 border-white "
            id="upper-container"
          >
            <img src="${
              data.flag
            }" alt="Country_Flag" class="w-fullmx-auto rounded-lg"/>
          </div>
          <div
            class="flex flex-col bg-white p-8 items-start space-y-4 rounded-bl-lg rounded-br-lg"
            id="lower-container"
          >
            <h3 class="text-xl font-semibold bg-white"> ${data.name}</h3>
            <h4 class="text-sm font-semibold"> ${data.region}</h4>
            <p class="text-lg">
              <span>👫</span> ${(+data.population / 1000000).toFixed(
                1
              )} M people
            </p>
            <p class="text-lg"><span>🗣️</span> ${data.languages[0].name}</p>
            <p class="text-lg">
              <span>💰</span> ${data.currencies[0].name}
            </p>
          </div>
          
         `;

  cardContainerEl.innerHTML = html;
  resetBtn.style.display = "block";
  inputValueEL.value = ``;
}
submitBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  request.open(
    "GET",
    `https://restcountries.com/v2/name/${inputValueEL.value}`
  );
  const resp = request.send();

  request.addEventListener("load", function (err) {
    const { status } = JSON.parse(this.responseText);

    if (status == 404) {
      console.log("hello");
      cardContainerEl.innerHTML = `<h1 class="text-3xl text-white text-semibold p-6 mx-auto"> <span class="text-red-300 line-through">${inputValueEL.value}</span> is not a country, are you dumb? <span class="text-4xl">🙎</span> </h1>`;
      inputValueEL.value = ``;
      resetBtn.style.display = "block";
    } else {
      const [data] = JSON.parse(this.responseText);

      console.log(data);

      updateUI(data);
    }
  });
});

resetBtn.addEventListener("click", function () {
  cardContainerEl.innerHTML = ``;
  resetBtn.style.display = "none";
});
