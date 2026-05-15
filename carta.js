class Carta {
    constructor(code, value, suit, imagen) {
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        const datos = JSON.parse(json);
        return new Carta(
            datos.code,
            datos.value,
            datos.suit,
            datos.imagen,
        );
    }

    createHtmlElement() {
        const div = document.createElement("div");
        div.className = "carta-container";

        div.innerHTML = `
            <img src="${this.imagen}" alt="${this.code}" style="cursor:pointer">
            <h5>${this.value} of ${this.suit}</h5>
            <p>Código: ${this.code}</p>
            <button class="btn-guardar">guardar</button>
        `;

        const img = div.querySelector("img");
        img.onclick = () => {
            window.open(this.imagen, "_blank");
        };

        const botonGuardar = div.querySelector(".btn-guardar");
        botonGuardar.onclick = () => {
            Carta.guardarCarta(this);
        };

        return div;

    }

    static guardarCarta(carta){
        let datosLocalStorage = localStorage.getItem("cartasGuardadas");

        let listaGuardados;
        if (datosLocalStorage === null) {
            listaGuardados = [];
        } else {
            listaGuardados = JSON.parse(datosLocalStorage); 
        }
        
        const yaExiste = listaGuardados.some(item => item.code === carta.code);

        if (!yaExiste) {
            listaGuardados.push(carta);

            localStorage.setItem("cartasGuardadas", JSON.stringify(listaGuardados));
            console.log(`Carta ${carta.code} guardada con éxito.`);
        } else {
            console.log(`La carta ${carta.code} ya se encuentra guardada.`);
        }
    }
}