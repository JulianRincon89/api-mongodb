const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB Atlas
const MONGO_URI = "mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/Empresa_tecnologia?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Esquemas de MongoDB
const NominaSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    foto: String,
    correo: String,
    direccion: String,
    cargo: String,
    salario: Number
});

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    imagen: String,
    modelo: String,
    serie: String,
    marca: String,
    fabricante: String
});

const Nomina = mongoose.model("Nomina", NominaSchema);
const Producto = mongoose.model("Producto", ProductoSchema);

// Rutas para Nómina
app.get("/nomina", async (req, res) => {
    const empleados = await Nomina.find();
    res.json(empleados);
});

app.post("/nomina", async (req, res) => {
    const nuevoEmpleado = new Nomina(req.body);
    await nuevoEmpleado.save();
    res.json(nuevoEmpleado);
});

app.delete("/nomina/:id", async (req, res) => {
    const { id } = req.params;
    await Nomina.findByIdAndDelete(id);
    res.json({ message: "Empleado eliminado" });
});

// Rutas para Productos
app.get("/productos", async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

app.post("/productos", async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.json(nuevoProducto);
});

app.delete("/productos/:id", async (req, res) => {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.json({ message: "Producto eliminado" });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
