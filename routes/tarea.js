const express = require("express");
const router = express.Router();
const TareaController = require("../controllers/TareaController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// crear una tarea

router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty(),
  ],
  TareaController.crearTarea
);

//Obtener tareas por proyecto
router.get("/", auth, TareaController.obtenerTareas);

//Actualizar tarea
router.put("/:id", auth, TareaController.actualizarTarea);
router.delete("/:id", auth, TareaController.eliminarTarea);

module.exports = router;
