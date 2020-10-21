//RUTAS PARA AUTENTICAR EL USUARIO
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const AuthController = require("../controllers/AuthController");

//iniciar sesion usuario

//api/auth

router.post("/", AuthController.autenticarUsuario);
//Obtiene el usuario autenticado
router.get("/", auth, AuthController.usuarioAutenticado);

module.exports = router;
