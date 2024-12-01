const NOMINA_URL = "https://67368c6faafa2ef22230d2b5.mockapi.io/nomina";
const PRODUCTOS_URL = "https://67368c6faafa2ef22230d2b5.mockapi.io/productos";

// Fetch: Obtener todos los empleados
async function fetchEmployees() {
    const response = await fetch(NOMINA_URL);
    const employees = await response.json();
    const tableBody = document.getElementById("employee-table");
    tableBody.innerHTML = ""; // Limpiar tabla
    employees.forEach(emp => {
        const row = `
            <tr>
                <td>${emp.id}</td>
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

// Fetch: Buscar empleado por nombre
async function searchEmployee() {
    const searchName = document.getElementById("search-name").value;
    const response = await fetch(NOMINA_URL);
    const employees = await response.json();
    const results = employees.filter(emp => emp.nombre.toLowerCase().includes(searchName.toLowerCase()));
    const resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = results.map(emp => `<p>${emp.nombre} ${emp.apellido} - ${emp.cargo}</p>`).join("");
}

// Fetch: Agregar un nuevo empleado
async function addEmployee() {
    const newEmployee = {
        nombre: document.getElementById("emp-name").value,
        apellido: document.getElementById("emp-lastname").value,
        correo: document.getElementById("emp-email").value,
        direccion: document.getElementById("emp-address").value,
        cargo: document.getElementById("emp-role").value,
        salario: parseFloat(document.getElementById("emp-salary").value),
    };
    const response = await fetch(NOMINA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
    });
    const result = await response.json();
    alert(`Empleado agregado: ${JSON.stringify(result)}`);
    fetchEmployees(); // Actualizar tabla
}

// Fetch: Eliminar un empleado por ID
async function deleteEmployee() {
    const empId = document.getElementById("delete-id").value;
    const response = await fetch(`${NOMINA_URL}/${empId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        alert(`Empleado con ID ${empId} eliminado`);
        fetchEmployees(); // Actualizar tabla
    } else {
        alert("Error al eliminar empleado");
    }
}

// Fetch: Obtener todos los productos
async function fetchProducts() {
    const response = await fetch(PRODUCTOS_URL);
    const products = await response.json();
    const tableBody = document.getElementById("product-table");
    tableBody.innerHTML = ""; // Limpiar tabla
    products.forEach(prod => {
        const row = `
            <tr>
                <td>${prod.id}</td>
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

// Fetch: Buscar producto por nombre
async function searchProduct() {
    const searchName = document.getElementById("search-product-name").value;
    const response = await fetch(PRODUCTOS_URL);
    const products = await response.json();
    const results = products.filter(prod => prod.nombre.toLowerCase().includes(searchName.toLowerCase()));
    const resultsDiv = document.getElementById("search-product-results");
    resultsDiv.innerHTML = results.map(prod => `<p>${prod.nombre} - ${prod.categoria}</p>`).join("");
}

// Fetch: Agregar un nuevo producto
async function addProduct() {
    const newProduct = {
        nombre: document.getElementById("prod-name").value,
        categoria: document.getElementById("prod-category").value,
        imagen: document.getElementById("prod-image").value,
        modelo: document.getElementById("prod-model").value,
        serie: document.getElementById("prod-series").value,
        marca: document.getElementById("prod-brand").value,
        fabricante: document.getElementById("prod-manufacturer").value
    };
    const response = await fetch(PRODUCTOS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    });
    const result = await response.json();
    alert(`Producto agregado: ${JSON.stringify(result)}`);
    fetchProducts(); // Actualizar tabla
}

// Fetch: Eliminar un producto por ID
async function deleteProduct() {
    const prodId = document.getElementById("delete-product-id").value;
    const response = await fetch(`${PRODUCTOS_URL}/${prodId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        alert(`Producto con ID ${prodId} eliminado`);
        fetchProducts(); // Actualizar tabla
    } else {
        alert("Error al eliminar producto");
    }
}

