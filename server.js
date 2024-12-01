const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ===============================
// Middleware
// ===============================
app.use(bodyParser.json());
app.use(cors());

// ===============================
// Conexión a MongoDB Atlas
// ===============================
const MONGO_URI = "mongodb+srv://Julk89:Julian123@cluster0.g4h8o.mongodb.net/Empresa_tecnologia?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => {
        console.error("Error al conectar a MongoDB:");
        console.error(`Mensaje: ${error.message}`);
        console.error(`Stack: ${error.stack}`);
    });

// ===============================
// Esquemas y Modelos de MongoDB
// ===============================
const NominaSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    foto: String,
    correo: String,
    direccion: String,
    cargo: String,
    salario: Number,
});

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    imagen: String,
    modelo: String,
    serie: String,
    marca: String,
    fabricante: String,
});

const Nomina = mongoose.model("Nomina", NominaSchema);
const Producto = mongoose.model("Producto", ProductoSchema);

// ===============================
// Rutas para Nómina
// ===============================

// Obtener todos los empleados
app.get("/nomina", async (req, res) => {
    try {
        const empleados = await Nomina.find();
        console.log("Empleados obtenidos:", empleados);
        res.json(empleados);
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        res.status(500).json({ message: "Error al obtener empleados" });
    }
});

// Agregar un nuevo empleado
app.post("/nomina", async (req, res) => {
    try {
        const nuevoEmpleado = new Nomina(req.body);
        await nuevoEmpleado.save();
        console.log("Empleado agregado:", nuevoEmpleado);
        res.json(nuevoEmpleado);
    } catch (error) {
        console.error("Error al agregar empleado:", error);
        res.status(500).json({ message: "Error al agregar empleado" });
    }
});

// Eliminar un empleado por ID
app.delete("/nomina/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await Nomina.findByIdAndDelete(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        console.log("Empleado eliminado:", eliminado);
        res.json({ message: "Empleado eliminado", eliminado });
    } catch (error) {
        console.error("Error al eliminar empleado:", error);
        res.status(500).json({ message: "Error al eliminar empleado" });
    }
});

// Actualizar un empleado por ID
app.put("/nomina/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    console.log("Recibidos para actualizar empleado:", { id, updates }); // Log para depuración

    try {
        const empleadoActualizado = await Nomina.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!empleadoActualizado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        console.log("Empleado actualizado exitosamente:", empleadoActualizado);
        res.json(empleadoActualizado);
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        res.status(500).json({ message: "Error al actualizar empleado" });
    }
});
// ===============================
// Rutas para Productos
// ===============================

// Obtener todos los productos
app.get("/productos", async (req, res) => {
    try {
        const productos = await Producto.find();
        console.log("Productos obtenidos:", productos);
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
});

// Agregar un nuevo producto
app.post("/productos", async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        console.log("Producto agregado:", nuevoProducto);
        res.json(nuevoProducto);
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ message: "Error al agregar producto" });
    }
});

// Eliminar un producto por ID
app.delete("/productos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await Producto.findByIdAndDelete(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        console.log("Producto eliminado:", eliminado);
        res.json({ message: "Producto eliminado", eliminado });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ message: "Error al eliminar producto" });
    }
});

// Actualizar un producto por ID
app.put("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    console.log("Recibidos para actualizar producto:", { id, updates }); // Log para depuración

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        console.log("Producto actualizado exitosamente:", productoActualizado);
        res.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: "Error al actualizar producto" });
    }
});
// ===============================
// Iniciar el servidor
// ===============================
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
