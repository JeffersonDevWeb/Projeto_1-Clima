function getUserPosition() {
  let url;
  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
	url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=507000f132f9fbbfa35484aa33e9c83c&lang=pt_br`;

	fetchApi(url)
  })
}

function fetchApi(url) {
	let main = document.querySelector('main')
	let details = document.querySelector('.detalhes')


	fetch(url)
		.then((data) => {
			return data.json()
		})
		.then((data) => {
			console.log(data)

			main.innerHTML = `
				<div class='dados'>
            		<h2 class="temp">${(data.main.temp).toFixed(0)}ºC</h2>
					<p class="description">${data.weather[0].description}</p>
            		<h2 class="feels-like">sensasação térmica: ${(data.main.feels_like).toFixed(0)}ºC</h2>
				</div>

				<h1 class="city">${data.name}</h1>

            	<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="" class="icon">`


			details.innerHTML = `
				<p class='title_details main first'>Umidade: <span>${data.main.humidity}%</span></p>
				<p class='title_details main'>Mínima: <span>${(data.main.temp_min).toFixed(0)}°C</span></p>
				<p class='title_details main'>Maxíma: <span>${(data.main.temp_max).toFixed(0)}°C</span></p>
				<p class='title_details main'>Visibilidade: <span>${(data.visibility/1000)} KM</span></p>
				
				<p class='title_details wind first'>Velocidade do vento: <span>${data.wind.speed} M/S</span></p>
				<p class='title_details wind'>Direção do Vento: <span>${data.wind.deg}ºC</span></p>
				<p class='title_details wind'>Pressão atmosférica: <span>${data.main.pressure}hP</span></p>
				<p class='title_details wind'>Nublagem: <span>${data.clouds.all}%</span></p>
				`
				
		})
		.catch((err) => {
			main.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
		  })
}

getUserPosition();
