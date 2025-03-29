const API_KEY = "at_9mvHyuBDsjGFGRqUbQEUcvXsrVc8L";
const API = "https://geo.ipify.org/api/v2/country,city?apiKey=";

async function getIPDetails(ip) {
    const userIpAddress = document.getElementById("ip-address-value");
    const userLocation = document.getElementById("location-value");
    const userTimezone = document.getElementById("timezone-value");
    const userIsp = document.getElementById("isp-value");
    try {
        const updateUI = (data) => {
            console.log(data);
            userIpAddress.textContent = data.ip;
            userLocation.textContent = `${data.location.city}, ${data.location.region}`;
            userTimezone.textContent = data.location.timezone;
            userIsp.textContent = data.isp === "" ? "No content available" : data.isp;

            generateMap(data.location.lat, data.location.lng)
        };

        const url = ip ? `${API}${API_KEY}&ipAddress=${ip}` : `${API}${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        updateUI(data);
        
    } catch (error) {
        console.error(error);
        userIpAddress.textContent = "Enter a valid address ❌";
        userLocation.textContent = "Enter a valid address ❌";
        userTimezone.textContent = "Enter a valid address ❌";
        userIsp.textContent = "Enter a valid address ❌";
        const mapContainer = document.getElementById("map");
        mapContainer.innerText = "Enter a valid address ❌";
        mapContainer.classList.add("error-map-container");
    }
}

async function generateMap(lat, lgt) {
    // const mapContainer = document.getElementById("map");
    // mapContainer.innerHTML = "";
    const map = L.map('map').setView([lat, lgt], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker = L.marker([lat, lgt]).addTo(map);
    
}

export { getIPDetails };