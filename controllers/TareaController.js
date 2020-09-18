const { validationResult } = require("express-validator");
const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");

//Crea una nueva tarea

exports.crearTarea = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Extraer el proyecto y comprobar si existe
  const { proyecto } = req.body;
  try {
    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //Verificar que la persona que está agregando la tarea sea dueña del proyecto

    if (existeProyecto.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //  Creamos la tarea

    const tarea = new Tarea(req.body);

    await tarea.save();

    res.json({
      tarea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
//Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);

    //Extraer el proyecto y comprobar si existe

    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //Verificar que la persona que está agregando la tarea sea dueña del proyecto

    if (existeProyecto.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //Obtener tareas por proyecto

    const tareas = await Tarea.find({ proyecto });
    res.json({
      tareas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer los proyectos");
  }
};

//Actualizar la tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;

    //Revisar si la tarea exite o no

    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }

    const existeProyecto = await Proyecto.findById(proyecto);

    //Verificar que la persona que está agregando la tarea sea dueña del proyecto

    if (existeProyecto.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Crear un objeto con la nueva información

    const nuevaTarea = {};
    if (nombre) {
      nuevaTarea.nombre = nombre;
    }
    if (estado) {
      nuevaTarea.estado = estado;
    }

    //Guardar la tarea

    tareaExiste = await Tarea.findByIdAndUpdate(
      { _id: req.params.id },
      nuevaTarea,
      { new: true }
    );

    res.json({ tareaExiste });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer los proyectos");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.body;

    //Revisar si la tarea exite o no

    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }

    const existeProyecto = await Proyecto.findById(proyecto);

    //Verificar que la persona que está agregando la tarea sea dueña del proyecto

    if (existeProyecto.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Eliminar Tarea
    await Tarea.findByIdAndRemove({ _id: req.params.id });

    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al traer los proyectos");
  }
};
