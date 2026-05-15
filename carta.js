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
        `;

        return div;
    }
}