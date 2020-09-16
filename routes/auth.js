//RUTAS PARA AUTENTICAR EL USUARIO
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const AuthController = require("../controllers/AuthController");

//crear usuario

//api/auth

router.post(
  "/",
  [
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser de mínimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  AuthController.autenticarUsuario
);

module.exports = router;
