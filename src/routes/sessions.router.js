import express from "express";
import UserModel from "../models/user.model.js";
const router = express.Router();

//Registro

router.post("/", async (req, res) => {
    //recuperamos los datos
    const {first_name, last_name, email, age, password} = req.body;
    try {
        //Verificamos que el correo sea unico
        const userExist = await UserModel.findOne({email: email})
    } catch (error) {
        res.status(500).send("Error interno del server en session router")
    }



    res.render("register", {title: "Session"})
})




export default router;