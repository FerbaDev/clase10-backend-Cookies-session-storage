import express from "express";
const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register", {title: "Registro"})
})




export default router;