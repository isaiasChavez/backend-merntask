const Usuario = require("../models/Usuario");
const bcriptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //Revisar la validación de los datos

  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //destructurar el email y el password

  const { email, password } = req.body;

  //validar que el usuario sea único

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //crear el nuevo usuario

    usuario = new Usuario(req.body);

    //Hashear el password

    const salt = await bcriptjs.genSalt(10);

    usuario.password = await bcriptjs.hash(password, salt);

    //crear el nuevo usuario
    await usuario.save();

    // Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //firmar el token
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
