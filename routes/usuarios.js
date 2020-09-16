const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/UsuarioController");

const { check } = require("express-validator");

//crear usuario

//api/usuarios

router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser de mínimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  usuarioController.crearUsuario
);

module.exports = router;
