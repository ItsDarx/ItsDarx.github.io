//Función que me aplica el estilo a la opciòn seleccionada y quita la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links  a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    link.className = "seleccionado";

    //Hacemos desaparecer el menu una vez que se ha seleccionado una opcion
    //en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

//función que muestra el menu responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

//detecto el scrolling para aplicar la animación del la barra de habilidades
window.onscroll = function() { efectoHabilidades() };

//funcion que aplica la animación de la barra de habilidades
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        document.getElementById("html").classList.add("barra-progreso1");
        document.getElementById("js").classList.add("barra-progreso2");
        document.getElementById("bd").classList.add("barra-progreso3");
        document.getElementById("ps").classList.add("barra-progreso4");
    }

}

//Funcion para hacer una busqueda

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("buscador");
  const listaArticulos = document.getElementById("listaArticulos");

  searchInput.addEventListener("input", function() {
    if (searchInput.value.trim() === "") {
      listaArticulos.style.display = "none"; // Ocultar la lista si el campo de búsqueda está vacío
    } else {
      listaArticulos.style.display = "block"; // Mostrar la lista si el campo de búsqueda contiene texto
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("buscador");
  const listaArticulos = document.getElementById("listaArticulos");

  document.getElementById("searchButton").addEventListener("click", function() {
    performSearch();
  });

  searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") {
      // Mostrar mensaje de que el campo de búsqueda está vacío
      alert("Por favor ingrese un lugar a buscar");
      listaArticulos.style.display = "none"; // Ocultar la lista
    } else {
      // Buscar si el término de búsqueda coincide con algún elemento de la lista
      const found = Array.from(listaArticulos.getElementsByTagName("a")).some(
        a => a.textContent.toLowerCase() === searchTerm.toLowerCase()
      );
      if (found) {
        // Mostrar mensaje de que el lugar fue encontrado
      } else {
        // Mostrar mensaje de que el lugar no existe
        alert("Lo sentimos el lugar ingresado es incorrecto");
      }
      listaArticulos.style.display = "block"; // Mostrar la lista después de la búsqueda
    }
  }
});

document.addEventListener("keyup", e=>{

  if (e.target.matches("#buscador")){

      if (e.key ==="Escape")e.target.value = ""

      document.querySelectorAll(".articulo").forEach(fruta =>{

          fruta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?fruta.classList.remove("filtro")
            :fruta.classList.add("filtro")
      })
  }
})

//Funcion para navegar y dar estilo a un mapa
mapboxgl.accessToken = 'pk.eyJ1IjoibWp2YWxlbnp1ZWxhIiwiYSI6ImNrb2Fmdm9zZDBpM28ybnFtYTQ2Z2MwMnYifQ.ZY3jTw0-6tjUSOOJXJHsdw'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.082412,4.639386],
    zoom: 9
});

document
.getElementById('listing-group')
.addEventListener('change', function(e)
{
var handler = e.target.id;
if(e.target.checked){
    map[handler].enable();
} else {
    map[handler].disable();
}
});

var customData = {
    'features': [
    {
        'type': 'Feature',
        'properties': {
            'title': 'Parque la Florida'
        },
    'geometry': {
        'coordinates': [-74.14476235609635,4.730750597247051],
        'type': 'Point'
        }
    },
    {
        'type': 'Feature',
        'properties': {
            'title': 'Parque del Café'
        },
    'geometry': {
        'coordinates': [-75.77064810284882,4.540568666186622],
        'type': 'Point'
        }
    },
    {
        'type': 'Feature',
        'properties': {
            'title': 'Parque Arqueologico San Agustin'
        },
    'geometry': {
        'coordinates': [-76.29526180284667,1.8879367358700043],
        'type': 'Point'
        }
    }
    ],
    'type': 'FeatureCollection'
};
 
function forwardGeocoder(query) {
    var matchingFeatures = [];
    for (var i = 0; i < customData.features.length; i++) {
        var feature = customData.features[i];
        // Handle queries with different capitalization
        // than the source data by calling toLowerCase().
        if (
            feature.properties.title
                .toLowerCase()
                .search(query.toLowerCase()) !== -1
        ) {
            // Add a tree emoji as a prefix for custom
            // data results using carmen geojson format:
            // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
            feature['place_name'] = '🌲 ' + feature.properties.title;
            feature['center'] = feature.geometry.coordinates;
            feature['place_type'] = ['park'];
            matchingFeatures.push(feature);
            }
    }
    return matchingFeatures;
}
 
// Controlador para el mapa
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: forwardGeocoder,
        zoom: 14,
        placeholder: 'Ingrese un lugar a buscar',
        mapboxgl: mapboxgl
    })
);