document.addEventListener('DOMContentLoaded', e => {
    fetch("https://raw.githubusercontent.com/yoelysfigueredopadron/JSON/main/bebidas.json")
        // fetch("../files/bebidas.json")
        .then(object => object.json())
        .then(jsonObject => renderizarProductos(jsonObject))
    // .then(jsonObject => console.log(jsonObject)) // Mostramos en consola los datos obtenidos a través de Fetch API en el response que convertimos en un objeto JSON con el método json()
});

function renderizarProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');
    const cantColumn = 4;

    // console.log(productos)

    //Filas
    for (let i = 0; i < productos.length / cantColumn; i++) {
        let fila = "";

        //Columnas
        let indiceInicial = i * cantColumn;
        let htmlProducto = ""

        for (let j = indiceInicial; j < productos.length && j < indiceInicial + cantColumn; j++) {


            htmlProducto = `<div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                    <img src="../img/${productos[j].img}" alt="${productos[j].titulo}" class="card.ing-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title">${productos[j].titulo}</h5>
                        <p class="card-text">$${productos[j].precioRebajado}</p>
                        <a href="#" class="btn btn-primary" data-id="${productos[j].dataId}">Agregar Al Carrito</a>
                    </div>
                </div> <!--.card-->
            </div>`

            fila += htmlProducto;

        } //Fin FOR Columnas

        let htmlRow = `<div class="row g-3"> ${fila} </div>`

        listaProductos.innerHTML += htmlRow;

    } // Fin FOR Filas

}