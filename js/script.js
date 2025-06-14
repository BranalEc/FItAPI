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
                    <button onclick="AbrirModalEditar(${persona.id}, '${persona.Nombre}','${persona.Apellido}', '${persona.Email}','${persona.Edad}')">Editar</button>
                    <button onClick="EliminarPersona(${persona.id})">Eliminar</button>
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

//Funcion para borrar registros
async function EliminarPersona(id) {
    const confirmacion = confirm("De veritas quieres borrar este registro?") 

    //Validamos si el usuario dijo que si desea borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`,{method: "DELETE"});

        //Recargamos la tabla para ver la eliminacion
        obtenerPersonas();
    }
}

//Proceso para editar un registro
const modalEditar = document.getElementById("modal-editar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerrar Modal de editar
});

function AbrirModalEditar(id,nombre,apellido,email,edad){
    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("emailEditar").value = email;
    document.getElementById("edadEditar").value = edad;

    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", 
    async e=>{
        e.preventDefault(); //Evita que el formulario se envie

        const id = document.getElementById("idEditar").value.trim();
        const Nombre = document.getElementById("nombreEditar").value.trim();
        const Apellido = document.getElementById("apellidoEditar").value.trim();
        const Email = document.getElementById("emailEditar").value.trim();
        const Edad = document.getElementById("edadEditar").value.trim();

        if( !id|| !Nombre || !Apellido||!Edad||!Email){
            alert("Complete todos los campos");
            return; //Evitar que el formuario se envie
        }

        const respuesta = await fetch(`${API_URL}/${id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({Edad,Email,Nombre,Apellido})
        })

        if(respuesta.ok){
            alert("El registro fue editado correctamente");
    
            //Limpiar el formulario y cerrar el modal
            document.getElementById("frmEditar").reset();
            modal.close();
            //Recargar tabla
            obtenerPersonas();
        }
        else{
            alert("Hubo un error al editar");
        }
    }
);
