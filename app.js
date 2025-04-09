const apiKey = '0623ce694598d9475ea128381b6ce4c6';
function getWeather() {
        const city = document.getElementById('cityInput').value;
        if (city === '') {
        alert('Please enter the name of the city.');
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('weatherCard').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    fetch(url)
        .then(response => response.json()) 
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').textContent = `City: ${data.name}`;
                document.getElementById('temperature').textContent = `Temp: ${data.main.temp}°C`;
                document.getElementById('condition').textContent = `Condition: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `Wind: ${data.wind.speed} km/h`;
                document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                document.getElementById('loadingMessage').style.display = 'none';
                document.getElementById('weatherCard').style.display = 'block';
            } else {
                document.getElementById('loadingMessage').style.display = 'none';
                document.getElementById('errorMessage').style.display = 'block';
            }
        })
        .catch(() => {
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('errorMessage').style.display = 'block';
        });
}
document.getElementById('searchButton').addEventListener('click', getWeather);
document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});