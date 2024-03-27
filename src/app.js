import express from "express";
const app = express();
const PUERTO = 8080;
import cookieParser from "cookie-parser";

//middleware para cookie parser
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("conecta")
})

app.listen(PUERTO, () => {
    console.log(`Conectado a http://localhost:${PUERTO}`);
})