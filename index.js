const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//crear el servidor

const app = express();

//conectar la base de datos

conectarDB();

//conectar cors

app.use(cors());

//CONFIG
app.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000;

//definir rutas
app.use("/api/usuario", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tarea"));

//arrancar la pp

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
