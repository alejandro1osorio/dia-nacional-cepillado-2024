<template>
  <div id="app">
    <Formulario />
  </div>
</template>

<script>
import Formulario from './components/Formulario.vue';  // Importar el formulario

export default {
  components: {
    Formulario
  }
};
</script>

<style>
/* Estilos globales */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: Arial, sans-serif;
  background: #e44f53;
}
</style>
