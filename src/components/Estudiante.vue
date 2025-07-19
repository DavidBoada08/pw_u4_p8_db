<template>
  <div class="container">
    <h2>Gestión de Estudiantes</h2>
    
    <!-- Formulario para crear/actualizar estudiante -->
    <div class="form-section">
      <h3>Datos del Estudiante</h3>
      <form @submit.prevent>
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            v-model="estudiante.nombre" 
            placeholder="Ingrese el nombre"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="apellido">Apellido:</label>
          <input 
            type="text" 
            id="apellido" 
            v-model="estudiante.apellido" 
            placeholder="Ingrese el apellido"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="fechaNacimiento">Fecha de Nacimiento:</label>
          <input 
            type="date" 
            id="fechaNacimiento" 
            v-model="estudiante.fechaNacimiento"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="genero">Género:</label>
          <select id="genero" v-model="estudiante.genero" required>
            <option value="">Seleccione...</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="id">ID (para actualizar/borrar):</label>
          <input 
            type="number" 
            id="id" 
            v-model="estudiante.id" 
            placeholder="Ingrese ID para actualizar/borrar"
          />
        </div>
      </form>
    </div>

    <!-- Botones de acción -->
    <div class="buttons-section">
      <button v-on:click="guardar()" class="btn-guardar">Guardar Nuevo</button>
      <button v-on:click="actualizar()" class="btn-actualizar">Actualizar Completo</button>
      <button v-on:click="actualizarParcial()" class="btn-parcial">Actualizar Parcial</button>
      <button v-on:click="borrar()" class="btn-borrar">Borrar</button>
      <button v-on:click="limpiarFormulario()" class="btn-limpiar">Limpiar Formulario</button>
    </div>
  </div>
</template>

<script>
import {
  guardarFacahada,
  actualizarFacahada,
  actualizarParcialFacahada,
  borrarFacahada,
} from "../clients/EstudianteClient";

export default {
  data() {
    return {
      estudiante: {
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "",
        id: null
      }
    };
  },
  methods: {
    async guardar() {
      // Validar que los campos requeridos estén llenos
      if (!this.validarCamposRequeridos()) {
        console.log("Faltan campos requeridos para guardar");
        return;
      }
      
      const estudianteToBody = {
        nombre: this.estudiante.nombre,
        apellido: this.estudiante.apellido,
        fechaNacimiento: this.formatearFecha(this.estudiante.fechaNacimiento),
        genero: this.estudiante.genero
      };
      
      await guardarFacahada(estudianteToBody);
      console.log("Estudiante guardado exitosamente");
      this.limpiarFormulario();
    },
    async actualizar() {
      // Validar que los campos requeridos estén llenos y el ID
      if (!this.validarCamposRequeridos() || !this.estudiante.id) {
        console.log("Faltan campos requeridos o ID para actualizar");
        return;
      }
      
      const estudianteToBody = {
        nombre: this.estudiante.nombre,
        apellido: this.estudiante.apellido,
        fechaNacimiento: this.formatearFecha(this.estudiante.fechaNacimiento),
        genero: this.estudiante.genero
      };
      
      await actualizarFacahada(estudianteToBody, this.estudiante.id);
      console.log("Estudiante actualizado exitosamente");
    },
    async actualizarParcial() {
      if (!this.estudiante.id) {
        console.log("Falta ID para actualizar parcialmente");
        return;
      }
      
      // Crear objeto solo con campos que tienen valor
      const estudianteToBody = {};
      if (this.estudiante.nombre) estudianteToBody.nombre = this.estudiante.nombre;
      if (this.estudiante.apellido) estudianteToBody.apellido = this.estudiante.apellido;
      if (this.estudiante.fechaNacimiento) estudianteToBody.fechaNacimiento = this.formatearFecha(this.estudiante.fechaNacimiento);
      if (this.estudiante.genero) estudianteToBody.genero = this.estudiante.genero;
      
      if (Object.keys(estudianteToBody).length === 0) {
        console.log("Faltan campos para actualizar");
        return;
      }
      
      await actualizarParcialFacahada(estudianteToBody, this.estudiante.id);
      console.log("Estudiante actualizado parcialmente exitosamente");
    },
    async borrar() {
      if (!this.estudiante.id) {
        console.log("Falta ID para borrar estudiante");
        return;
      }
      
      await borrarFacahada(this.estudiante.id);
      console.log("Estudiante borrado exitosamente");
      this.limpiarFormulario();
    },
    validarCamposRequeridos() {
      return this.estudiante.nombre && 
             this.estudiante.apellido && 
             this.estudiante.fechaNacimiento &&
             this.estudiante.genero;
    },
    formatearFecha(fecha) {
      // Convierte la fecha del formato YYYY-MM-DD a YYYY-MM-DDTHH:mm:ss
      return fecha ? fecha + "T00:00:00" : "";
    },
    limpiarFormulario() {
      this.estudiante = {
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        genero: "",
        id: null
      };
    }
  },
};
</script>

<style>
.container {
  max-width: 500px;
  margin: 20px auto;
  padding: 15px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 3px;
}

input, select {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.buttons-section {
  text-align: center;
  margin-top: 15px;
}

button {
  padding: 8px 15px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.btn-guardar {
  background-color: green;
  color: white;
}

.btn-actualizar {
  background-color: blue;
  color: white;
}

.btn-parcial {
  background-color: orange;
  color: white;
}

.btn-borrar {
  background-color: red;
  color: white;
}

.btn-limpiar {
  background-color: gray;
  color: white;
}
</style>