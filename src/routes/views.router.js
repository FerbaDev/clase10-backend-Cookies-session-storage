import express from "express";
const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register", {title: "Registro"})
})

router.get("/login", (req, res) => {
    res.render("login", {title: "Login"})
})


export default router;