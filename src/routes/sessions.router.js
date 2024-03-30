import express from "express";
import UserModel from "../models/user.model.js";
const router = express.Router();

//Registro

router.post("/", async (req, res) => {
    //recuperamos los datos
    const {first_name, last_name, email, age, password} = req.body;
    try {
        //Verificamos que el correo sea unico
        const userExist = await UserModel.findOne({email})
        if (userExist) {
            res.status(400).send("El correo electronico ya existe")
        } 
        //Si no esta registrado creamos nuevo usuario
        const newUser = await UserModel.create({first_name, last_name, email, age, password})
        //Ahora armamos la session
        req.session.login = true;
        req.session.user = {...newUser._doc}//metodo para subir el obj newUser
        //ahora tiramos un mensaje de exito
        res.status(200).send("Usuario registrado con éxito");
    } catch (error) {
        res.status(500).send("Error interno del server en session router")
    }



    res.render("register", {title: "Session"})
})




export default router;