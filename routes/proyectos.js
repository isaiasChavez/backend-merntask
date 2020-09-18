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
//Obtener todos los proyectos del usuario autenticado
router.get("/", auth, ProyectoController.obtenerProyectos);

//Actualizar los proyectos
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  ProyectoController.actualizarProyecto
);

//Eliminar proyecto
router.delete(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  ProyectoController.eliminarProyecto
);

module.exports = router;
