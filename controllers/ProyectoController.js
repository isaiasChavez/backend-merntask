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

exports.obtenerProyectos = async (req, res) => {
  try {
    console.log(req.usuario);

    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);

    res.status(500).send("hubo un error");
  }
};
//Actualiza un proyecto

exports.actualizarProyecto = async (req, res) => {
  console.log("Voy a actualizr");
  //Revisar si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Extraer la informacion del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }
  try {
    //Revisar el id, para saber si el proyecto existe o no
    console.log(req.params.id);
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //Verificar el creador del proyecto, que tiene que ser la misma persona que está autenticada
    if (proyecto.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });

    //actualizar
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error al actualizar en el servidor");
  }
};

//  Eliminar un proyecto por su id
exports.eliminarProyecto = async (req, res) => {
  try {
    //Revisar el id, para saber si el proyecto existe o no
    console.log(req.params.id);
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //Verificar el creador del proyecto, que tiene que ser la misma persona que está autenticada
    if (proyecto.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Eliminar el proyecto

    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error al eliminar en el servidor");
  }
};
