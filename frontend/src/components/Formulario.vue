<template>
  <section class="container">
    <!-- Sección izquierda con la imagen -->
    <div class="left-section">
      <img src="../assets/form/rectagunlo-logo.png" alt="Imagen principal" class="primary">
      <img src="../assets/form/logo-dianacionaldelcepillado-2024.png" alt="Imagen superpuesta" class="overlay-image">
    </div>

    <!-- Sección derecha con el formulario -->
    <div class="right-section">
      <div class="form-container">
        <h2>Formulario de inscripción</h2>
        <form @submit.prevent="submitForm">
          <label for="nombreInstitucion">Nombre institución</label>
          <input type="text" v-model="nombreInstitucion" id="nombreInstitucion" name="nombre-institucion" required>

          <label for="nombreSede">Nombre sede (Opcional)</label>
          <input type="text" v-model="nombreSede" id="nombreSede" name="nombre-sede">

          <label for="codigoDaneNit">Código Dane o Nit</label>
          <input type="text" v-model="codigoDaneNit" id="codigoDaneNit" name="codigo" required>

          <label for="correo">Correo electrónico</label>
          <input type="email" v-model="correo" id="correo" name="correo" required>

          <label for="ciudad">Ciudad</label>
          <input type="text" v-model="ciudad" id="ciudad" name="ciudad" required>

          <label for="departamento">Departamento</label>
          <input type="text" v-model="departamento" id="departamento" name="departamento" required>

          <label for="fotos">Subir 3 Fotos (Solo formato imagen)</label>
          <input type="file" id="fotos" @change="handleFileUpload" multiple required accept="image/jpeg, image/png, image/jpg, image/webp">

          <!-- Vista previa de imágenes -->
          <div class="preview-container" v-if="fotos.length">
            <h3>Previsualización de fotos:</h3>
            <div class="preview-images">
              <img v-for="(foto, index) in previewImages" :key="index" :src="foto" alt="Previsualización" class="preview-image">
            </div>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

export default {
  data() {
    return {
      nombreInstitucion: '',
      nombreSede: '',
      codigoDaneNit: '',
      correo: '',
      ciudad: '',
      departamento: '',
      fotos: [],  // Arreglo para almacenar las imágenes seleccionadas
      previewImages: []  // Arreglo para almacenar las URLs de previsualización
    };
  },
  methods: {
    handleFileUpload(event) {
      this.fotos = Array.from(event.target.files);  // Almacenar las imágenes seleccionadas
      this.previewImages = this.fotos.map(file => URL.createObjectURL(file));  // Crear URLs temporales para previsualización
    },
    async submitForm() {
      try {
        Swal.fire({
          title: 'Enviando...',
          text: 'Por favor espera mientras procesamos tu información.',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const formData = new FormData();
        formData.append('nombreInstitucion', this.nombreInstitucion);
        formData.append('nombreSede', this.nombreSede);
        formData.append('codigoDaneNit', this.codigoDaneNit);
        formData.append('correo', this.correo);
        formData.append('ciudad', this.ciudad);
        formData.append('departamento', this.departamento);

        this.fotos.forEach((file) => {
          formData.append('fotos', file);
        });

        const response = await axios.post('http://localhost:5000/api/forms', formData, { // https://dia-nacional-cepillado-sbfb2024.col1.co/backend/api/forms
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        Swal.fire({
          title: 'Su inscripción ha sido exitosa',
          text: 'Muchas gracias por participar en el día nacional del cepillado 2024',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.nombreInstitucion = '';
        this.nombreSede = '';
        this.codigoDaneNit = '';
        this.correo = '';
        this.ciudad = '';
        this.departamento = '';
        this.fotos = [];
        this.previewImages = [];

      } catch (error) {
        console.error('Error al enviar el formulario', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al enviar el formulario. Por favor, inténtalo nuevamente.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #e44f53;
}

.container {
  display: flex;
  height: 100vh;
  background-image: url('../assets/form/fondo-lineas.png'); /* Imagen de fondo */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Div izquierdo con imagen */
.left-section {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.left-section img.primary {
  position: fixed; /* La imagen estará fija en la pantalla */
  top: 0; /* Toca el borde superior */
  left: 0; /* Toca el borde izquierdo */
  width: auto;
  height: auto;
  margin: 0;
  z-index: 10; /* Asegura que esté sobre otros elementos si es necesario */
}

.left-section img.overlay-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -63%);
  width: 80%;
  height: auto;
  z-index: 1;
}

/* Div derecho con formulario */
.right-section {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form-container {
  width: 100%;
  max-width: 400px; /* Mantiene el ancho máximo original para móviles */
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  text-align: center;
  color: #4a148c;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

form input[type="text"],
form input[type="email"],
form input[type="file"] {
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: transparent;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease;
  width: 100%;
}

form input[type="text"]:focus,
form input[type="email"]:focus,
form input[type="file"]:focus {
  outline: none;
  border-bottom: 1px solid #4a148c;
}

form label {
  margin-bottom: 5px;
  color: #4a148c;
}

button {
  padding: 10px;
  background-color: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 22px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  width: 30%;
  margin: 0 auto;
  font-weight: 700;
}

button:hover {
  background-color: #c62828;
}

.preview-images {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .left-section,
  .right-section {
    width: 100%;
  }

  .right-section {
    justify-content: flex-start;
    padding-bottom: 40px;
    padding-top: 100px; /* Empuja el formulario hacia abajo */
  }

  .form-container {
    width: 90%;
    margin: 0 auto 20px;
  }
}

@media (max-width: 480px) {
  .left-section img.primary {
    width: 98%;
    position: absolute;
    top: -10px;
    left: -10px;
    z-index: 1; /* La imagen rectagunlo-logo.png estará debajo */
  }

  .left-section img.overlay-image {
    width: 70%;
    z-index: 2; /* La imagen logo-dianacionaldelcepillado-2024.png estará encima */
    transform: translate(-60%, 7%);
  }

  .form-container {
    width: 105%;
    margin: 0 auto -10px;
  }

  .right-section {
    padding-top: 394px; /* Ajusta el padding-top para evitar que la imagen cubra el formulario */
  }

  button {
    width: 100%;
  }
}

/* Ajuste para pantallas de tablets */
@media (min-width: 481px) and (max-width: 768px) {
  .left-section img.primary {
    width: 53%; /* Aumenta el tamaño de la imagen en tablets */
    z-index: 1; /* Asegura que la imagen de rectangunlo esté debajo */
  }

  .left-section img.overlay-image {
    z-index: 2; /* Asegura que la imagen de logo esté encima */
  }

  .form-container {
    max-width: 90%; /* Aumenta el ancho del formulario en tablets */
  }
}

/* Ajuste para pantallas de computadoras */
@media (min-width: 769px) {
  .left-section img.primary {
    width: 56%; /* Aumenta el tamaño de la imagen en computadoras */
    height: 92%;
    z-index: 1; /* Asegura que la imagen de rectangunlo esté debajo */
  }

  .left-section img.overlay-image {
    z-index: 2; /* Asegura que la imagen de logo esté encima */
  }

  .form-container {
    max-width: 65%; /* Aumenta el ancho del formulario en computadoras */
    margin-left: 50px;
  }
}

</style>