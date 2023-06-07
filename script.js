const box_container = document.getElementById("box-container");
const exampleModal = document.getElementById("exampleModal");
const dropdown_menu = document.getElementById("dropdown-menu");
const search_input = document.getElementById("search-input");
const btn_search = document.getElementById("btn-search");
console.log(dropdown_menu.childNodes);
exampleModal.className = "modal fade";
exampleModal.setAttribute("tabindex", "-1");
exampleModal.setAttribute("aria-labelledby", "exampleModalLabel");
exampleModal.setAttribute("aria-hidden", "true");
const endpoints = {
  allSearch: "https://restcountries.com/v3.1/all",
  asiaSearch: "https://restcountries.com/v3.1/region/asia",
  africaSearch: "https://restcountries.com/v3.1/region/africa",
  europeSearch: "https://restcountries.com/v3.1/region/europe",
  americasSearch: "https://restcountries.com/v3.1/region/america",
  nameSearch: `https://restcountries.com/v3.1/name/${search_input.value}`,
};
const loadingHTML = `<div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div>`;
const errorHTML = `<div class='card text-danger border-danger p-3 shadow-sm'>Error in Fetch</div>`;

const getRequest = async (url) => {
  const generalResponse = await axios.get(url);
  return generalResponse.data;
};
const render = async (element, endpoint, uiEditor) => {
  try {
    element.innerHTML = loadingHTML;
    const data = await getRequest(endpoint);
    console.log(data);
    element.innerHTML = "";
    uiEditor(data);
  } catch (error) {
    console.log(error);
    element.className = "my-5";
    element.innerHTML = errorHTML;
  }
};
const init = () => {
  render(box_container, endpoints.allSearch, (data) => {
    data.map((country) => {
      console.log(country);
      console.log(country.capital);
      console.log(country.name.common);
      console.log(country.flags.svg);
      console.log(country.languages);
      console.log(country.currencies);
      /* console.log(
        Object.values(country.languages).toString().split(",").join(", ")
      ); */
      box_container.innerHTML += `
	    <div class="card p-2 shadow-sm bg-body-secondary">
		  <img src="${
        country.flags.png ? country.flags.png : country.flags.svg
      }" class="img-fluid object-fit-cover h-75" alt="Flag Here">
		  <div class="card-body">
		  <h5 class="my-2 w-100">Commonly: ${
        country.name.common ? country.name.common : "No Data"
      }</h5>
      <p class="my-2 w-100">Officially: ${country.name.official} ${
        country.flag ? country.flag : "No data"
      }</p>
		  <p class="my-2 w-100">Capital: ${
        country.capital ? country.capital : "No data"
      }</p>
      <p class="my-2 w-100">Region: ${
        country.region ? country.region : "No data"
      }</p>
      <p class="my-2 w-100">Subregion: ${
        country.subregion ? country.subregion : "No data"
      }</p>
      <p class="my-2 w-100">Map Route: <a class="my-2 w-100 text-decoration-none" target="_blank" href="${
        country.maps.googleMaps
          ? country.maps.googleMaps
          : country.maps.openStreetMaps
      }">Address</a><p/>
      <button onclick="displayModal()" class="btn btn-outline-info w-100 text-center mt-2" id="btn_info_more" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      More Info
      <i class="fa-solid fa-infinity"></i>
      </button>
		</div>
		<div/>
	  `;
      exampleModal.innerHTML = `
        <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Commonly: ${country.name.common}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h class="my-2 fs-6 fw-normal">Officially: ${country.name.official}</h>
            <p class="my-2 fs-6 fw-normal">Continent: ${country.continents[0]}</p>
            <p class="my-2 fs-6 fw-normal">Currencies: ${country.currencies}</p>
            <p class="my-2 fs-6 fw-normal">Languages: ${country.languages}</p>
            <p class="my-2 fs-6 fw-normal">FIFA: ${country.fifa}${country.flag}</p>
            <p class="my-2 fs-6 fw-normal">Population: ${country.population}</p>
            <p class="my-2 fs-6 fw-normal">Area: ${country.area}</p>
            <p class="my-2 fs-6 fw-normal">Timezones: ${country.timezones}</p>
            <p class="my-2 fs-6 fw-normal">Capital: ${country.capital}</p>
            <p class="my-2 fs-6 fw-normal">Independent: ${country.independent}</p>
            <p class="my-2 fs-6 fw-normal">Start Of Weekdays: ${country.startOfWeek}</p>
            <p class="my-2 fs-6 fw-normal">Status: ${country.status}</p>
            <p class="my-2 fs-6 fw-normal">Borders: ${country.borders}</p>
            <p class="my-2 fs-6 fw-normal">Land Locked: ${country.landlocked}</p>
            <p class="my-2 fs-6 fw-normal">Car Side: ${country.car.side}</p>
            <p class="my-2 fs-6 fw-normal">Car Signs: ${country.car.signs}</p>
            <p class="my-2 fs-6 fw-normal">Region: ${country.region}</p>
            <p class="my-2 fs-6 fw-normal">Subregion: ${country.subregion}</p>
            
          </div>
          <div class="modal-footer">
            <button
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
        `;
    });
  });
};
