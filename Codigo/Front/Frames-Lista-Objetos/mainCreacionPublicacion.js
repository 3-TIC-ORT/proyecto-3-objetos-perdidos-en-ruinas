let publicacion = {}

//publicacion guarda todos los inputs que pone el creador.
// publicacion.creador tiene que ser el usuario q lo creó.

//La siguiente funcion lo que hace es guardar toda la info de los inputs y enviarla al back.

//Falta función de relleno de datos de la publicación que queres editar.
 
function getData () {
    let params = new URLSearchParams(document.location.search);
    if (params.get("editado")){
        JSON.parse(localStorage.getItem("publicaciones")).forEach((p)=>{
            if (p.id === JSON.parse(localStorage.getItem("publicacionId"))){
                publicacion = p;
                const form = document.querySelector(`form`)
                //falta que hacer con la imagen
                form.category.value = p.categoria;
                form.title.value = p.titulo;
                form.location.value = p.ubicacion;
                form.description.value = p.descripcion;
                form.placeLeft.value = p.dejado;
                form.time.value = p.hora;
                const foto = document.createElement("img")
                foto.src = p.imagen
                document.querySelector("body").appendChild(foto);
                localStorage.setItem("tipo", JSON.stringify(p.tipo));
                localStorage.setItem("userId", JSON.stringify(p.creador));
            }
        })
    }
}

getData();

const form = document.querySelector(`form`)
form.addEventListener(`submit`, (e) => {
    let params = new URLSearchParams(document.location.search);
    e.preventDefault();
    formulario = e.target;
    //Que haya imagen predeterminada
    //Hacer de que haya también la opción de no mandar imagen y que no se crashee
    publicacion.imagen = formulario.img.files[0];
    publicacion.tipoImg = formulario.img.files[0].type;
    publicacion.categoria = formulario.category.value;
    publicacion.titulo = formulario.title.value;
    publicacion.ubicacion = formulario.location.value;
    publicacion.descripcion = formulario.description.value;
    publicacion.dejado = formulario.placeLeft.value;
    publicacion.hora = formulario.time.value;
    publicacion.tipo = JSON.parse(localStorage.getItem("tipo"));
    let usuario = JSON.parse(localStorage.getItem("userId"));
    publicacion.creador = usuario;
    if (params.get("editado")) {
        postData("editarPublicacion", {publicacion: publicacion, JWT: JSON.parse(localStorage.getItem("JWT"))});
    } else {
        postData("crearPublicacion", {publicacion:publicacion, JWT: JSON.parse(localStorage.getItem("JWT"))}, (retorno) => {
            if (retorno === false) {
                alert("Debes estar logeado para poder crear una publicación")
            }
        });
    window.location.href = "indexObjsList.html";
    }
})
