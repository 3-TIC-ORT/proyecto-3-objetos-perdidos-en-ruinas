import { onEvent, startServer } from "soquetic";
import fs from 'fs';


let usuarioLogged;
// Funciones



function register(user){
    let lista = JSON.parse(fs.readFileSync("Codigo/data/users.json", 'utf-8'));
    if(user.name.length > 32){
        console.log("Su usuario no puede tener más de 32 caracteres")
        return false;
    } else{
    for(let i = 0; i < lista.length; i++){
        if(user.name == lista[i].name){
            return false;
        }
    } 
    if(user.password.length > 32 || user.password.length < 8 || user.password.match(/[a-z]/) == null && user.password.includes("ñ") === false || user.password.match(/[A-Z]/) == null && user.password.includes("Ñ") === false || user.password.match(/[0-9]/) == null){
        return false;
    }
    user.id = lista.length;
    lista.push({...user});
    fs.writeFileSync("Codigo/data/users.json", JSON.stringify(lista, null, 2));
    usuarioLogged = user.id;
    return true;
    }
}

function login(user){
    let usuarios = JSON.parse(fs.readFileSync("users.json", 'utf-8'));
    for(let i = 0; i < usuarios.length; i++){
        if(user.name === usuarios[i].name){
            user.id = usuarios[i].id
        }
    }
    if (user.id === null || user.id === undefined){
        return false;
    } else {
        if(user.password === usuarios[user.id].password){
            usuarioLogged = user.id;
            return true;
        } else{
            return false;
        }
    }
}

function mostrarNombre(){
    if (usuarioLogged === null || usuarioLogged === undefined){
        return "Anónimo";
    } else{
        let usuarios = JSON.parse(fs.readFileSync("users.json", 'utf-8'))
        return usuarios[usuarioLogged].name;
    }
}


// On Events
onEvent("register", register);
onEvent("login", login);
onEvent("mostrarNombre", mostrarNombre);

startServer();