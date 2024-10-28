import express from 'express';
import { createForm } from '../controllers/formController.js';
import multer from 'multer';

const router = express.Router();

// Configurar Multer para la subida de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para procesar el formulario y subir las imágenes
router.post('/forms', upload.array('fotos', 3), createForm);

export default router;
