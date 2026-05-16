document.addEventListener("DOMContentLoaded", () => {
    cargarCartasGuardadas();

    const botonOrdenar = document.getElementById("ordenar-code");
    if (botonOrdenar) {
        botonOrdenar.onclick = ordenarPorId;
    }
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

function ordenarPorId() {
    let datosLocalStorage = localStorage.getItem("cartasGuardadas");

    let listaGuardados = JSON.parse(datosLocalStorage);
    if (listaGuardados.length === 0) return;

    listaGuardados.sort((cartaA, cartaB) => {
        if (cartaA.code > cartaB.code) return 1;
        if (cartaA.code < cartaB.code) return -1;
        return 0;
    });

    localStorage.setItem("cartasGuardadas", JSON.stringify(listaGuardados));

    cargarCartasGuardadas();
}
