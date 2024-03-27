import express from "express";
const app = express();
const PUERTO = 8080;
import cookieParser from "cookie-parser";

//middleware para cookie parser
app.use(cookieParser())

//rutas
app.get("/", (req, res) => {
    res.send("conecta")
})

//ruta para setear una cookie
app.get("/setcookie", (req, res) => {
    //usamos el obj res para asignarle la cookie al cliente
    res.cookie("primerCookie", "Mi primera cookie").send("Cookie seteada")
})

//leer el valor de una cookie
app.get("/leercookie", (req, res) => {
    res.send(req.cookies);
})

//borrar cookie
app.get("/borrarcookie", (req, res) => {
    res.clearCookie("primerCookie").send("Cookie eliminada")
})

//listen
app.listen(PUERTO, () => {
    console.log(`Conectado a http://localhost:${PUERTO}`);
})