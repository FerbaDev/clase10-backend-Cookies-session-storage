import express from "express";
const app = express();
const PUERTO = 8080;
import cookieParser from "cookie-parser";

//middleware para cookie parser
const PASSWORD = "clavesecreta";
app.use(cookieParser(PASSWORD));


//rutas
app.get("/", (req, res) => {
    res.send("conecta")
})

//ruta para setear una cookie
app.get("/setcookie", (req, res) => {
    //usamos el obj res para asignarle la cookie al cliente, se guardan en formato clave valor. siqueremos que las cookies tengan tiempo de vida agrgamos el objeto con una configuracion de maxAge en milisegundos.
    res.cookie("primerCookie", "Mi primera cookie", {maxAge: 10000}).send("Cookie seteada")
})

//leer el valor de una cookie
app.get("/leercookie", (req, res) => {
    res.send(req.cookies);
})

//borrar cookie
app.get("/borrarcookie", (req, res) => {
    res.clearCookie("primerCookie").send("Cookie eliminada")
})

//enviar una cooke firmada 
app.get("/cookiefirmada", (req, res) => {
    res.cookie("cookieFirmada", "Esta es la firma secreta", {signed: true}).send("Cookie firmada enviada")
})

//obtenemos la cookie firmada
app.get("/vercookiefirmada", (req, res) => {
    //para recuperar las cookies firmada hay que usar req.signedCookies
    //hacemos u condicional para saber si la cookie fue alterada
    const valorCookie = req.signedCookies.cookieFirmada;
    if (valorCookie) {
        res.send("Cookie recuperada: " + valorCookie)
    } else {
        res.send("Cookie invalida")
    }
})

//listen
app.listen(PUERTO, () => {
    console.log(`Conectado a http://localhost:${PUERTO}`);
})