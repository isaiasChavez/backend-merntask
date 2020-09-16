const express = require("express");
const router = express.Router();
const ProyectoController = require("../controllers/ProyectoController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//Crea proyectos
//api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  ProyectoController.crearProyecto
);
router.get("/", auth, ProyectoController.crearProyecto);

module.exports = router;
