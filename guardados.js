document.addEventListener("DOMContentLoaded", () => {
    cargarCartasGuardadas();
});

function cargarCartasGuardadas() {
    const contenedor = document.getElementById("cartas");

    contenedor.innerHTML = "";

    let datosLocalStorage = localStorage.getItem("cartasGuardadas");

    if (datosLocalStorage === null) {
        contenedor.innerHTML = "<p>No hay cartas guardadas.</p>";
        return;
    }

    let listaGuardados = JSON.parse(datosLocalStorage);

    if (listaGuardados.length === 0) {
        contenedor.innerHTML = "<p>No hay cartas guardadas.</p>";
        return;
    }

    listaGuardados.forEach(cartaObjeto => {
        const cartaString = JSON.stringify(cartaObjeto);
        const nuevaCarta = Carta.createFromJsonString(cartaString);


        const htmlCarta = nuevaCarta.createHtmlElement();

        const boton = htmlCarta.querySelector(".btn-guardar");
        if (boton) boton.remove();

        contenedor.appendChild(htmlCarta);
    });
}