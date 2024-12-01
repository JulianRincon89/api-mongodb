// URLs del servidor local
const NOMINA_URL = "http://localhost:5000/nomina";
const PRODUCTOS_URL = "http://localhost:5000/productos";

// Función genérica para manejar errores de conexión
async function fetchWithErrorHandling(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error al realizar la solicitud a ${url}:`, error);
        alert(`⚠️ Error al conectar con el servidor: ${error.message}. Verifica que el servidor esté corriendo.`);
        return null;
    }
}

// Función para limpiar formularios
function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

// ===================================
// Funciones para empleados
// ===================================

// Obtener todos los empleados
async function fetchEmployees() {
    const employees = await fetchWithErrorHandling(NOMINA_URL);
    if (employees) {
        const tableBody = document.getElementById("employee-table");
        tableBody.innerHTML = ""; // Limpiar tabla
        if (employees.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6">No hay empleados registrados.</td></tr>`;
        } else {
            employees.forEach(emp => {
                const row = `
                    <tr>
                        <td>${emp._id || emp.id}</td>
                        <td>${emp.nombre}</td>
                        <td>${emp.apellido}</td>
                        <td>${emp.correo}</td>
                        <td>${emp.cargo}</td>
                        <td>${emp.salario}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }
}

// Buscar empleado por nombre
async function searchEmployee() {
    const searchName = document.getElementById("search-name").value.trim();
    if (!searchName) return alert("⚠️ Por favor ingresa un nombre para buscar.");

    const employees = await fetchWithErrorHandling(NOMINA_URL);
    if (employees) {
        const results = employees.filter(emp =>
            emp.nombre.toLowerCase().includes(searchName.toLowerCase())
        );
        const resultsDiv = document.getElementById("search-results");
        if (results.length === 0) {
            resultsDiv.innerHTML = `<p>No se encontraron empleados con el nombre "${searchName}".</p>`;
        } else {
            resultsDiv.innerHTML = results.map(emp =>
                `<p>${emp.nombre} ${emp.apellido} - ${emp.cargo}</p>`
            ).join("");
        }
    }
}

// Agregar un nuevo empleado
async function addEmployee() {
    const nombre = document.getElementById("emp-name").value.trim();
    const apellido = document.getElementById("emp-lastname").value.trim();
    const correo = document.getElementById("emp-email").value.trim();
    const direccion = document.getElementById("emp-address").value.trim();
    const cargo = document.getElementById("emp-role").value.trim();
    const salario = parseFloat(document.getElementById("emp-salary").value);

    if (!nombre || !apellido || !correo || !direccion || !cargo || isNaN(salario)) {
        return alert("⚠️ Por favor completa todos los campos correctamente.");
    }

    const newEmployee = { nombre, apellido, correo, direccion, cargo, salario };
    const result = await fetchWithErrorHandling(NOMINA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
    });

    if (result) {
        alert(`✅ Empleado agregado exitosamente.`);
        clearForm("add-employee-form");
        fetchEmployees(); // Actualizar tabla
    }
}

// Eliminar un empleado por ID
async function deleteEmployee() {
    const empId = document.getElementById("delete-id").value.trim();
    if (!empId) return alert("⚠️ Por favor ingresa un ID para eliminar.");

    const result = await fetchWithErrorHandling(`${NOMINA_URL}/${empId}`, {
        method: "DELETE",
    });

    if (result) {
        alert(`✅ Empleado con ID ${empId} eliminado exitosamente.`);
        fetchEmployees(); // Actualizar tabla
    }
}


// Actualizar un empleado
async function updateEmployee() {
    const empId = document.getElementById("update-emp-id").value.trim();
    const nombre = document.getElementById("update-emp-name").value.trim();
    const apellido = document.getElementById("update-emp-lastname").value.trim();
    const correo = document.getElementById("update-emp-email").value.trim();
    const direccion = document.getElementById("update-emp-address").value.trim();
    const cargo = document.getElementById("update-emp-role").value.trim();
    const salario = parseFloat(document.getElementById("update-emp-salary").value);

    // Validar campos
    if (!empId) return alert("⚠️ Por favor ingresa un ID válido para actualizar.");
    if (!nombre || !apellido || !correo || !direccion || !cargo || isNaN(salario)) {
        return alert("⚠️ Por favor completa todos los campos correctamente.");
    }

    const updatedEmployee = { nombre, apellido, correo, direccion, cargo, salario };

    console.log("Actualizando empleado con ID:", empId); // Depuración

    const result = await fetchWithErrorHandling(`${NOMINA_URL}/${empId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
    });

    if (result) {
        console.log("Empleado actualizado:", result);
        alert(`✅ Empleado con ID ${empId} actualizado exitosamente.`);
        fetchEmployees(); // Actualizar tabla
    }
}

// ===================================
// Funciones para productos
// ===================================

// Obtener todos los productos
async function fetchProducts() {
    const products = await fetchWithErrorHandling(PRODUCTOS_URL);
    if (products) {
        const tableBody = document.getElementById("product-table");
        tableBody.innerHTML = ""; // Limpiar tabla
        if (products.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7">No hay productos registrados.</td></tr>`;
        } else {
            products.forEach(prod => {
                const row = `
                    <tr>
                        <td>${prod._id || prod.id}</td>
                        <td>${prod.nombre}</td>
                        <td>${prod.categoria}</td>
                        <td><img src="${prod.imagen}" alt="${prod.nombre}" style="width:50px;"></td>
                        <td>${prod.modelo}</td>
                        <td>${prod.marca}</td>
                        <td>${prod.fabricante}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }
}

// Buscar producto por nombre
async function searchProduct() {
    const searchName = document.getElementById("search-product-name").value.trim();
    if (!searchName) return alert("⚠️ Por favor ingresa un nombre para buscar.");

    const products = await fetchWithErrorHandling(PRODUCTOS_URL);
    if (products) {
        const results = products.filter(prod =>
            prod.nombre.toLowerCase().includes(searchName.toLowerCase())
        );
        const resultsDiv = document.getElementById("search-product-results");
        if (results.length === 0) {
            resultsDiv.innerHTML = `<p>No se encontraron productos con el nombre "${searchName}".</p>`;
        } else {
            resultsDiv.innerHTML = results.map(prod =>
                `<p>${prod.nombre} - ${prod.categoria}</p>`
            ).join("");
        }
    }
}

// Agregar un nuevo producto
async function addProduct() {
    const nombre = document.getElementById("prod-name").value.trim();
    const categoria = document.getElementById("prod-category").value.trim();
    const imagen = document.getElementById("prod-image").value.trim();
    const modelo = document.getElementById("prod-model").value.trim();
    const serie = document.getElementById("prod-series").value.trim();
    const marca = document.getElementById("prod-brand").value.trim();
    const fabricante = document.getElementById("prod-manufacturer").value.trim();

    if (!nombre || !categoria || !imagen || !modelo || !serie || !marca || !fabricante) {
        return alert("⚠️ Por favor completa todos los campos correctamente.");
    }

    const newProduct = { nombre, categoria, imagen, modelo, serie, marca, fabricante };
    const result = await fetchWithErrorHandling(PRODUCTOS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    });

    if (result) {
        alert(`✅ Producto agregado exitosamente.`);
        clearForm("add-product-form");
        fetchProducts(); // Actualizar tabla
    }
}

// Eliminar un producto por ID
async function deleteProduct() {
    const prodId = document.getElementById("delete-product-id").value.trim();
    if (!prodId) return alert("⚠️ Por favor ingresa un ID para eliminar.");

    const result = await fetchWithErrorHandling(`${PRODUCTOS_URL}/${prodId}`, {
        method: "DELETE",
    });

    if (result) {
        alert(`✅ Producto con ID ${prodId} eliminado exitosamente.`);
        fetchProducts(); // Actualizar tabla
    }
}

// Actualizar un producto
async function updateProduct() {
    const prodId = document.getElementById("update-prod-id").value.trim();
    const nombre = document.getElementById("update-prod-name").value.trim();
    const categoria = document.getElementById("update-prod-category").value.trim();
    const imagen = document.getElementById("update-prod-image").value.trim();
    const modelo = document.getElementById("update-prod-model").value.trim();
    const serie = document.getElementById("update-prod-series").value.trim();
    const marca = document.getElementById("update-prod-brand").value.trim();
    const fabricante = document.getElementById("update-prod-manufacturer").value.trim();

    if (!prodId || !nombre || !categoria || !imagen || !modelo || !serie || !marca || !fabricante) {
        return alert("⚠️ Por favor completa todos los campos correctamente.");
    }

    const updatedProduct = { nombre, categoria, imagen, modelo, serie, marca, fabricante };

    console.log("Enviando datos a actualizar:", { prodId, updatedProduct }); // Log para depuración

    const result = await fetchWithErrorHandling(`${PRODUCTOS_URL}/${prodId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
    });

    if (result) {
        console.log("Producto actualizado:", result);
        alert(`✅ Producto con ID ${prodId} actualizado exitosamente.`);
        fetchProducts(); // Actualizar tabla
    }
}