//URL de la API
const API_URL = "https://retoolapi.dev/1kaZ1d/data";

//Funcion que manda a traer el JSON
async function obtenerPersonas(){
    //Respuesta del servidor
    const res = await fetch(API_URL);

    //Pasamos a JSON la respuesta del servidor
    const data = await res.json();

    //Enviamos el JSON que nos manda la API a la funcion que crea la tabla en HTML
    mostrarDatos(data)
}

//La funcion lleva un parametro "datos" que representa al JSOn
function mostrarDatos(datos) {
  //Se llama al tbody dentro del elemento con id "tabla"
  const tabla = document.querySelector("#tabla tbody");

  //Para inyectar codigo HTML usamos innerHTML
  tabla.innerHTML = ''; //Vaciamos el contenido de la tabla

  datos.forEach((persona) => {
    tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.Nombre}</td>
                <td>${persona.Apellido}</td>
                <td>${persona.Edad}</td>
                <td>${persona.Email}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
  });
}

//LLamada inicial para que se carguen los datos que vienen del servidor
obtenerPersonas();