let API = "https://rickandmortyapi.com/api/character/"
const contenedor = document.querySelector('.container');
const boton = document.getElementById('boton');
boton.addEventListener('click', mostrarPersonajes)

const boton2 = document.getElementById('boton2');
boton2.addEventListener('click', atras)

let page = 0;



function mostrarPersonaje(results2){
    let contador = 0;
    let columnas = "";
    results2.forEach((p) => {
        contador++
        columnas += `
        <div class="col-md-3"> 
            <div class="card mb-5 bg-info" style="width: 17rem; height: 28rem; align-items: center; border: 3px aqua solid;  outline: 4px solid aquamarine;">
                <img pt-5 src="${p.image}" class="card-img-top border " alt="...">
                <div class="card-body" style="color: yellow;">
                    <h5 class="card-title">Nombre: ${p.name}</h5>
                    <p class="card-text">Genero: ${p.gender}</p>
                    <p class="card-text">Especie: ${p.species}</p>
                    <p class="card-text">Dimension: ${p.origin.name}</p>
                </div>
            </div>
        </div>
        `
        if (contador == 4) {
            var fila = document.createElement('div')
                fila.classList.add('row')
                fila.innerHTML = columnas
                contenedor.appendChild(fila)
                contador = 0;
                columnas = ""
        }

    });
}

async function mostrarPersonajes(){
    boton.innerText = "Siguiente"
    contenedor.innerHTML = ""
    let response = await fetch(`${API}?page=${page}`)
    let data = await response.json();
    if (page == 0 || page < data.info.pages) {
        page++
        let response = await fetch(`${API}?page=${page}`)
        let data = await response.json();
        let results = data.results
        mostrarPersonaje(results)
    } else if (page == data.info.pages) {
        contenedor.innerHTML = `
        <div class="alert alert-danger" role="alert">
            A llegado al final de las paginas
        </div>
        `
    }

}

async function atras(){
    if( page > 1){
        buscarPersonaje()
        contenedor.innerHTML = ""
        page--
        let response = await fetch(`${API}?page=${page}`)
        let data = await response.json();
        let results = data.results
        mostrarPersonaje(results)
    }
}

async function buscarPersonaje(){
    let value = document.getElementById('inputBuscar').value
    let response = await fetch(`${API}?name=${value}`)
    let data = await response.json();
    let results = data.results
    const personajeEncontrado = results
    contenedor.innerHTML = ""
    mostrarPersonaje(personajeEncontrado)
    document.getElementById('inputBuscar').value = ""
}
mostrarPersonajes()