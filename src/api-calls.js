const API_KEY = "at_9mvHyuBDsjGFGRqUbQEUcvXsrVc8L";
const API = "https://geo.ipify.org/api/v2/country,city?apiKey=";
const mapContainer = document.getElementById("map");
let map = null;

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

            generateMap(data.location.lat, data.location.lng);
        };

        const url = ip ? `${API}${API_KEY}&ipAddress=${ip}` : `${API}${API_KEY}`;
        const response = await fetch(url);
        console.log(response);

        // Verificar si la respuesta es exitosa y tambien identifica que tipo de error ocurrio
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        updateUI(data);
        
    } catch (error) {
        console.dir(error);
        const errorMessageSelected = document.querySelector(".error-map");
        if (errorMessageSelected) errorMessageSelected.remove();

        userIpAddress.textContent = "No content available ❌";
        userLocation.textContent = "No content available ❌";
        userTimezone.textContent = "No content available ❌";
        userIsp.textContent = "No content available ❌";

        const main = document.querySelector("main");
        const errorMessage = document.createElement("p");

        // Mostrar un mensaje de error más específico
        if (error.message.includes("400") || error.message.includes("422")) {
            errorMessage.textContent = "Invalid IP address or domain ❌";
        } else if (error.message.includes("404")) {
            errorMessage.textContent = "IP address not found ❌";
        } else if (error.message.includes("Failed to fetch")) {
            errorMessage.textContent = "Network error. Please check your connection ❌";
        } else {
            errorMessage.textContent = "An unexpected error occurred ❌";
        }

        mapContainer.classList.add("hide");
        errorMessage.classList.add("error-map");
        main.appendChild(errorMessage);
    }
}

async function generateMap(lat, lgt) {
    mapContainer.classList.remove("hide");
    const errorMessage = document.querySelector(".error-map");
        if(errorMessage) {
            errorMessage.remove();
        }

    if (!map) {
        // Inicializar el mapa si no existe
        map = L.map('map').setView([lat, lgt], 13);
    } else {
        // Actualizar la vista del mapa existente
        map.setView([lat, lgt], 13);

        // Eliminar todas las capas existentes del mapa
        map.eachLayer((layer) => {
            map.removeLayer(layer);
        });
    }

    // Agregar una nueva capa de tileLayer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Agregar un nuevo marcador
    L.marker([lat, lgt]).addTo(map);
}

export { getIPDetails };