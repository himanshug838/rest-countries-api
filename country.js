const countryName = new URLSearchParams(location.search).get("name");
const flagImage = document.querySelector('.country-details img')
const countryHeading = document.querySelector('.country-details h1')
const population = document.querySelector('.Population')
const nativeName = document.querySelector('.Native');
const region = document.querySelector('.Region')
const subRegion = document.querySelector('.subRegion')
const capital = document.querySelector('.Capital')
const topLevelDomain = document.querySelector('.topDomain')
const currencies = document.querySelector('.Currencies')
const languages = document.querySelector('.Languages')
const borderCountries = document.querySelector('.border-countries')

const themechanger = document.querySelector('.theme-changer')



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {

    console.log(country)

    flagImage.src = country.flags.svg;
    countryHeading.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')

    if(country.name.nativeName){
        console.log(Object.values(country.name.nativeName)[0].common)
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }else{
        nativeName.innerText = country.name.common
    }

    region.innerText = country.region

    if(country.subRegion){
        subRegion.innerText = country.subRegion
    }else{
        subRegion.innerText = country.region
    }

    capital.innerText = country.capital[0]

    topLevelDomain.innerText = country.tld.join(', ')
    

    if(country.currencies){
        currencies.innerText = Object.values(country.currencies).map((currency) => 
        currency.name).join(', ')
    }

    if(languages){
        languages.innerText = Object.values(country.languages).join(', ')
    }

    if(country.borders) {
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                console.log(borderCountry)

                //creating an anchor tag 
                const borderCountryTag = document.createElement('a')
                //setting the innertext in the anchor tag
                borderCountryTag.innerText = borderCountry.name.common
                //adding the href(link) to the anchor tag
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                //appending the anchor tag to the parent element
                borderCountries.append(borderCountryTag)

            })
        })

    }

  });


  themechanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
  })