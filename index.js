const API_KEY = '79c3051753bd484224f6e48d81b7d901';

const searchTemperature = () => {
    const city = document.getElementById('city-name').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayTemperature(data))
        .catch(error => console.error('Error fetching data:', error));
}

const setInnerText = (id, text) => {
    const element = document.getElementById(id);
    if (element) {
        element.innerText = text;
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

const displayTemperature = temperature => {
    console.log(temperature);
    if (temperature && temperature.main && temperature.weather && temperature.weather.length > 0) {
        setInnerText('city', temperature.name);
        // Round the temperature before setting the inner text
        const roundedTemp = Math.round(temperature.main.temp);
        setInnerText('temp', roundedTemp);
        setInnerText('weather', temperature.weather[0].main);

        // Weather icon settings
        const iconCode = temperature.weather[0].icon;
        const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const imgIcon = document.getElementById('image-icon');
        if (imgIcon) {
            imgIcon.setAttribute('src', url);
        } else {
            console.error('Element with id "image-icon" not found');
        }
    } else {
        console.error('Invalid temperature data');
    }
}

// Event listener for search button
// document.getElementById('search-btn').addEventListener('click', searchTemperature);
document.getElementById('city-name').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchTemperature();
    }
});
