const countriesContainer = document.querySelector(".countries-container");
const filterbyregion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themechanger = document.querySelector('.theme-changer')
const changing = document.querySelector('.changing')
const icon = document.querySelector('#light')

let allCountries 

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {

      allCountries = data
      // console.log(country)

      const countryCard = document.createElement("a");

      countryCard.classList.add("country-card");

      countryCard.href = `http://127.0.0.1:5501/rest-countries-api-with-color-theme-switcher-master/country.html?name=${country.name.common}`

      const cardHTML = `
        <img src=${country.flags.svg} alt="flag" />
          <div class="card-text">
            <h4 class="card-title">${country.name.common} </h4>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.continents}</p>
            <p><b>Capital: </b>${country.capital}</p>
          </div>
        `

      countryCard.innerHTML = cardHTML;

      countriesContainer.append(countryCard);

    });
  });


  filterbyregion.addEventListener('change', (e) => {

  fetch(`https://restcountries.com/v3.1/region/${filterbyregion.value}`)
  .then((res) => res.json())
  .then((data) => {
    countriesContainer.innerHTML = ' ';
    data.forEach((country) => {

      // console.log(country)

      const countryCard = document.createElement("a");

      countryCard.classList.add("country-card");

      countryCard.href = `http://127.0.0.1:5501/rest-countries-api-with-color-theme-switcher-master/country.html?name=${country.name.common}`

      const cardHTML = `
        <img src=${country.flags.svg} alt="flag" />
          <div class="card-text">
            <h4 class="card-title">${country.name.common} </h4>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.continents}</p>
            <p><b>Capital: </b>${country.capital}</p>
          </div>
        `

      countryCard.innerHTML = cardHTML;

      countriesContainer.append(countryCard);

    });
  });
  })


  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
  
    // Filter countries based on search input
    const filteredCountries = allCountries.filter((country) => 
      country.name.common.toLowerCase().includes(searchTerm)
    );
  
    countriesContainer.innerHTML = '';
  
    // Render the filtered countries
    filteredCountries.forEach((country) => {

      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
  
      countryCard.href = `http://127.0.0.1:5501/rest-countries-api-with-color-theme-switcher-master/country.html?name=${country.name.common}`;
  
      const cardHTML = `
        <img src=${country.flags.svg} alt="flag" />
          <div class="card-text">
            <h4 class="card-title">${country.name.common}</h4>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.continents}</p>
            <p><b>Capital: </b>${country.capital}</p>
          </div>
      `;
  
      countryCard.innerHTML = cardHTML;
  
      countriesContainer.append(countryCard);
    });
  });


  themechanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
  })

  themechanger.addEventListener('click', () => {
    if(changing.innerText === 'Dark Mode'){
      changing.innerText = 'Light Mode'
      icon.id = 'light'
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      
    }else{
      changing.innerText = 'Dark Mode'
      icon.id = 'dark'
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  })
  