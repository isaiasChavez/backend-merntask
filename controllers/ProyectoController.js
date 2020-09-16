const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");
exports.crearProyecto = (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //Crear un nuevo poyecto
    const proyecto = new Proyecto(req.body);

    //Guardar el creador via JWT, el que está autenticado

    proyecto.creador = req.usuario.id;

    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Hubo un error");
  }
};

//Obtiene todos los proyectos del usuario que se encuentra autenticado
