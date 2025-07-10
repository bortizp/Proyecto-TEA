// Importar los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Inicializar la aplicación de Express
const app = express();
const PORT = 3000;

// --- Middleware ---
// Habilitar CORS para permitir que el frontend (en otro origen) se comunique con este servidor
app.use(cors());

// Parsear (analizar) el cuerpo de las solicitudes entrantes en formato JSON
app.use(bodyParser.json());

// Servir los archivos estáticos (HTML, CSS, JS) de la carpeta actual
app.use(express.static(path.join(__dirname)));

// --- Rutas de la API ---
// Definir un endpoint (URL) para recibir los datos del formulario mediante un método POST
app.post('/send-message', (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, email, mensaje } = req.body;

    // Imprimir los datos recibidos en la consola del servidor para verificación
    console.log('--- Nuevo Mensaje Recibido ---');
    console.log(`Nombre: ${nombre}`);
    console.log(`Email: ${email}`);
    console.log(`Mensaje: ${mensaje}`);
    console.log('-----------------------------');

    // Validación básica para asegurarse de que todos los campos están presentes
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    // En una aplicación real, aquí es donde guardarías los datos en una base de datos
    // o enviarías un correo electrónico.
    // Por ahora, solo simulamos que todo fue exitoso.
    res.status(200).json({ message: 'Mensaje recibido con éxito en el servidor.' });
});

// --- Iniciar el Servidor ---
// Poner el servidor a escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Tu página web ahora está siendo servida desde esta dirección.');
});