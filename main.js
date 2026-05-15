const urlBase = "https://deckofcardsapi.com/api/deck/new/draw/?count=6";

let historialCartas = []; 
let paginaActual = 0;

document.addEventListener("DOMContentLoaded", () => {
    cargarCartasIniciales();
});

function cargarCartasIniciales() {
    const contenedor = document.getElementById("cartas");

    contenedor.innerHTML = "";

    fetch(urlBase)
        .then(respuesta => respuesta.json())
        .then(data => {
            const listaCartasAPI = data.cards;

            listaCartasAPI.forEach(cartaAPI => {
                const nuevaCarta = new Carta(
                    cartaAPI.code,
                    cartaAPI.value,
                    cartaAPI.suit,
                    cartaAPI.image
                );

                const htmlCarta = nuevaCarta.createHtmlElement();
                contenedor.appendChild(htmlCarta);
            });
        })
        .catch(error => {
            console.error("Error al cargar las cartas de la API:", error);
        });
}