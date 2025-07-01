// formacion-imec-backend/server.js

require('dotenv').config(); // Carga las variables de entorno al inicio

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa cors

const app = express();
const PORT = process.env.PORT || 5000; // Usa el puerto del .env o 5000 por defecto

// --- Middleware Globales ---
app.use(express.json()); // Permite a Express parsear JSON de las peticiones (req.body)
app.use(cors()); // Habilita CORS para todas las rutas

// --- Conexión a la Base de Datos (MongoDB) ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Conectado...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Sale del proceso si la conexión falla
    }
};

connectDB(); // Llama a la función para conectar la DB

// --- Definir una Ruta de Prueba (para verificar que el servidor funciona) ---
app.get('/', (req, res) => {
    res.send('API de Formación IMEC funcionando!');
});
// --- Rutas de la API ---
app.use('/api/auth', require('./routes/auth'));
// --- Iniciar el Servidor ---
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));