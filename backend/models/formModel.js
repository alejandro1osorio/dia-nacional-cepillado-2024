import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  nombreInstitucion: {
    type: String,
    required: true,
  },
  nombreSede: String,
  codigoDaneNit: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  fotos: [String], // Array para almacenar las URLs de las imágenes subidas a AWS
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);
export default Form;
