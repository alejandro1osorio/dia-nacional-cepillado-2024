import Form from "../models/formModel.js";
import { uploadToAWS } from "../config/awsService.js";

export const createForm = async (req, res) => {
  try {
    const { nombreInstitucion, nombreSede, codigoDaneNit, correo, ciudad, departamento } = req.body;

    // Sube las imágenes a AWS y obtiene las URLs
    const fotos = await uploadToAWS(req.files); 

    // Crea un nuevo documento en MongoDB con los datos del formulario y las URLs de las imágenes
    const newForm = new Form({
      nombreInstitucion,
      nombreSede,
      codigoDaneNit,
      correo,
      ciudad,
      departamento,
      fotos,  // Almacena las URLs de las imágenes subidas en MongoDB
    });

    // Guarda el nuevo formulario en la base de datos
    await newForm.save();

    // Envía una respuesta exitosa
    res.status(201).json({ message: 'Formulario enviado con éxito' });
  } catch (error) {
    // Envía un error en caso de fallo
    res.status(500).json({ error: error.message });
  }
};
