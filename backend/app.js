import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import formRoutes from './routes/formRoutes.js';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Crear la aplicación Express
const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:8081',  // URL del frontend
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas del formulario
app.use('/api', formRoutes);  // Este prefijo '/api' es importante para la URL

// Configurar el puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
