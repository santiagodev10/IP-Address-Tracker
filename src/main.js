import { getIPDetails } from "./api-calls.js";
getIPDetails();

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchButton.click();
    }
})

searchButton.addEventListener("click", (ip) => {
    ip = searchInput.value;
    getIPDetails(ip);
});