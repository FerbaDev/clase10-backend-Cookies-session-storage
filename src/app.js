import express from "express";
const app = express();
const PUERTO = 8080;
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore  from "session-file-store";
const fileStore = FileStore(session);

//middleware para cookie parser
const PASSWORD = "clavesecreta";
app.use(cookieParser(PASSWORD));

//Middleware de session
app.use(session({
    secret: "secretCoder",
    resave: true,   //esto permite mantener activa la sesion frente a la inactividad del usuario
    saveUninitialized: true,  //permite guardar cualquier sesion
    //agregamos configuracion para usar file storage
    store: new fileStore({path: "./src/sessions", ttl: 10000, retries: 1})
    //path: la ruta donde se guardan las sessiones
    //ttl es el tiempo que tarda en irse)time ti live)
    //retries: el numero de veces que reintenta si da
}))

//rutas
app.get("/", (req, res) => {
    res.send("conecta")
})

//ruta para lenatar session
app.get("/session", (req, res) => {
    //si al conectarme la sesion ya existe, aumento el contador de visitas

    if (req.session.counter) {
        req.session.counter++;
        res.send(`Visitaste este sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send("Bienvenido")
    }
})

//Logout
app.get("/logout", (req, res) => {
    //para eliminar datos de session se usa el parametro de req y el metodo destroy
    //lo podemos pasar con un callback
    req.session.destroy((error) => {
        !error ? res.send("Session cerrada") : res.send("Tenemos un error");
    })
})

//Login con session
app.get("/login", (req, res) => {
    let {usuario, pass} = req.query;
    if(usuario === "Fer" && pass === PASSWORD) {
        req.session.user = usuario;
        req.session.loged = true
        res.send("Bienvenido! Inicio de session exitoso")
    } else {
        res.send("Datos incorrectos")
    }
})

//Middleware de autenticacion
const auth = (req, res, next) => {
    req.session.loged ? next() : res.status(401).send("Error de autenticación");
}
//Ruta privada para usuario logueados, va con el auth de parametro que configuramos arriba 
app.get("/privado", auth, (req, res) => {
    res.send("Pagina para usuarios logueados")
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

//Storage
