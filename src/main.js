import { getIPDetails } from "./api-calls.js";
getIPDetails();

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento predeterminado (envío del formulario)
        searchButton.click(); // Simula un clic en el botón
    }
})

searchButton.addEventListener("click", (ip) => {
    ip = searchInput.value;
    getIPDetails(ip);
    //AQUI VA EL LLAMADO A LA FUNCION QUE GENERA EL MAPA EN LA UBICACION INDICADA
});