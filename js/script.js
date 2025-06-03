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

const modal = document.getElementById("modal-agregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAbrirModal")//+ para abrir
const btnCerrar = document.getElementById("btnCerrarModal")//X para cerrar

btnAgregar.addEventListener("click", () => {
    modal.showModal();//Abrir el modal al hacer clic en el boton
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
} )

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e =>{
    e.preventDefault(); //"e" representa "submit" -Evita que el formulario se envie de golpe

    //Captura los valores del formulario
    const Nombre = document.getElementById("nombre").value.trim();
    const Apellido = document.getElementById("apellido").value.trim();
    const Edad = document.getElementById("edad").value.trim();
    const Email = document.getElementById("email").value.trim();

    if(!Nombre || !Apellido||!Edad||!Email){
        alert("Complete todos los campos");
        return; //Evitar que el formuario se envie
    }

    //Llamar a la API para enviar el usuario
    const respuesta = await fetch(API_URL,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({Nombre,Apellido,Edad,Email})
    });
    
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario y cerrar el modal
        document.getElementById("frmAgregar").reset();
        modal.close();
        //Recargar tabla
        obtenerPersonas();
    }
    else{
        alert("Hubo un error al agregar");
    }

});

