// La función create post lo que hace es repasar por toda la lista de publicaciones, y mostrar todas las que haya en el html.


function CreatePost(postList) {
    for(i = 0; i < postList; i++) {
        let nuevoBox = document.createElement("div");
        nuevoBox.id = "nuevoBox" + i;
        nuevoBox.classList.add("post");
        let nuevoUp = document.createElement("div");
        nuevoUp.id = "nuevoUp" + i;
        nuevoUp.classList.add("up");
        let Uptxt = document.createElement("h1");
        let nuevoDown = document.createElement("div");
        nuevoDown.id = "nuevoDown" + i;
        nuevoDown.classList.add("down");
        let Downtxt = document.createElement("h3");
        nuevoUP.style.backgroundImage = postList[i].imagen;
        Downtxt.textContent = postList[i].titulo;
        document.getElementById("ObjectsList").appendChild(nuevoBox);
        document.getElementById("nuevoBox" + i).appendChild(nuevoUp);
        document.getElementById("nuevoBox" + i).appendChild(nuevoDown);
        document.getElementById("nuevoUp" + i).appendChild(Uptxt);
        document.getElementById("nuevoDown" + i).appendChild(Downtxt);
        
    } 
}
console.log(JSON.parse(localStorage.getItem("Dupla")))
postData("cargarPublicaciones", JSON.parse(localStorage.getItem("Dupla")), CreatePost);


function Add() {
    console.log("add"); 
    window.location.href =  "Post-Creation-Edit.html";
 }document.getElementById("create").addEventListener("click", Add)

function Edit() {
    window.location.href = "Post-Creation-Edit.html";
}

function Enter() {
    window.location.href = "Creacion-publicacion.html";
}
