const countryContainer = document.querySelector('.countries-container')
const singleCountry = document.querySelector('.country')
const backButton = document.querySelector('.back-btn')

const showCountries = countries => {
	console.log(countries)
	countryContainer.classList.remove('d-none')
	countries.forEach(country => {
		const {flag, name, population, region, capital} = country
		countryContainer.innerHTML += `
		<div class="card">
			<img src="${flag}" alt="${name}" class="img-fluid" />
			<div class="card-body">
				<h5 class="card-title">${name}</h5>
				<p class="card-text small">
					<strong>Population:</strong> ${population}<br>
					<strong>Region:</strong> ${region}<br>
					<strong>Capital:</strong> ${capital}
				</p>
			</div>
			<a href="#${name}" class="stretched-link"></a>
		</div>
		`
	})
}

const showSingleCountry = country => {
	console.log(country)
	const { flag, name, population, region, subregion, capital, borders, nativeName, languages, topLevelDomain, currencies } = country[0]
	singleCountry.innerHTML += `
		<button class="back-btn">Back</button>
		<div class="row">
			<div class="col-4">
				<img src="${flag}" alt="${name}">
			</div>
			<div class="offset-2 col">
				<h3>${name}</h3>
				<div class="row">
					<div class="col">
						<p><strong>Native Name:</strong> ${nativeName}<br>
						<strong>Population:</strong> ${population}<br>
						<strong>Region:</strong> ${region}<br>
						<strong>Sub Region:</strong> ${subregion}<br>
						<strong>Captial:</strong> ${capital}</p>
					</div>
					<div class="col">
						<p><strong>Top Level Domain:</strong> ${topLevelDomain}<br>
						<strong>Currencies:</strong> ${currencies}<br>
						<strong>Language:</strong> ${languages}</p>
					</div>
				</div>
				<strong>Border Countries:</strong> ${ borders.map(border => (`<button>${border}</button>`)) }
			</div>
		</div>
	`
	singleCountry.classList.remove('d-none')
}

fetch('https://restcountries.eu/rest/v2/all')
	.then(response => response.json())
	.then(data => showCountries(data))

window.addEventListener('hashchange', () => {
	const currentCountry = window.location.hash.split('#').pop()
	countryContainer.classList.add('d-none')
	fetch(`https://restcountries.eu/rest/v2/name/${currentCountry}`)
		.then(response => response.json())
		.then(data => showSingleCountry(data))
})

const handleClick = e => {
	const el = e.target

	if (el.tagName !== 'BUTTON') {
		return
	}
	if (el.classList.contains('back-btn')) {
		countryContainer.classList.remove('d-none')
		singleCountry.classList.add('d-none')
	}
}

document.addEventListener('click', handleClick)