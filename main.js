const urlBase = "https://deckofcardsapi.com/api/deck/new/draw/?count=6";

let historialPaginas = []; 
let indicePagina = 0;

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

            historialPaginas.push(listaCartasAPI);

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

            document.getElementById("siguiente").onclick = paginaSiguiente;
            document.getElementById("anterior").onclick = paginaAnterior;
        }) 
        .catch(error => {
            console.error("Error al cargar las cartas de la API:", error);
        });
}

function paginaSiguiente() {
    const contenedor = document.getElementById("cartas");

    contenedor.innerHTML = "";
    indicePagina++;

    if (historialPaginas[indicePagina]) {
        renderizarPaginaDesdeHistorial(historialPaginas[indicePagina]);
    } else {
        fetch(urlBase)
            .then(respuesta => respuesta.json())
            .then(data => {
                historialPaginas.push(data.cards);
                renderizarPaginaDesdeHistorial(data.cards);
            })
            .catch(error => console.error("Error al cargar página siguiente:", error));
    }
}

function paginaAnterior() {
    if (indicePagina > 0) {
        const contenedor = document.getElementById("cartas");

        contenedor.innerHTML = "";
        indicePagina--;

        const cartasAnteriores = historialPaginas[indicePagina];
        renderizarPaginaDesdeHistorial(cartasAnteriores);
    }
}

function renderizarPaginaDesdeHistorial(listaCartas) {
    const contenedor = document.getElementById("cartas");
    
    listaCartas.forEach(cartaAPI => {
        const nuevaCarta = new Carta(
            cartaAPI.code,
            cartaAPI.value,
            cartaAPI.suit,
            cartaAPI.image
        );
        contenedor.appendChild(nuevaCarta.createHtmlElement());
    });
}