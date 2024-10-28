import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración del cliente S3 para AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToAWS = async (files) => {
  const uploadedImages = [];

  for (const file of files) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `images/${Date.now()}_${file.originalname}`,  // Crear un nombre de archivo único
      Body: file.buffer,
      ContentType: file.mimetype,  // Tipo de contenido para el archivo (imagen, etc.)
    };

    try {
      const command = new PutObjectCommand(params);  // Crear el comando para la operación PutObject
      const response = await s3Client.send(command);  // Enviar el comando al cliente S3
      const location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
      
      uploadedImages.push(location);  // Almacena las URLs de las imágenes subidas
    } catch (error) {
      console.error('Error subiendo archivo a S3:', error);
      throw error;
    }
  }

  return uploadedImages;
};
