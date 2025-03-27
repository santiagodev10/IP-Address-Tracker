const API_KEY = "at_9mvHyuBDsjGFGRqUbQEUcvXsrVc8L";
const API = "https://geo.ipify.org/api/v2/country,city?apiKey=";

async function getIPDetails(ip) {
    try {
        const userIpAddress = document.getElementById("ip-address-value");
        const userLocation = document.getElementById("location-value");
        const userTimezone = document.getElementById("timezone-value");
        const userIsp = document.getElementById("isp-value");

        const updateUI = (data) => {
            console.log(data);
            userIpAddress.textContent = data.ip;
            userLocation.textContent = `${data.location.city}, ${data.location.region}`;
            userTimezone.textContent = data.location.timezone;
            userIsp.textContent = data.isp === "" ? "No content available" : data.isp;
        };

        const url = ip ? `${API}${API_KEY}&ipAddress=${ip}` : `${API}${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        updateUI(data);
        
    } catch (error) {
        console.error(error);
    }
}

getIPDetails("172.6.34.57");