<template>
  <div>
    <button v-on:click="guardar()">Guardar</button>
    <button v-on:click="actualizar()">Actualizar</button>
    <button v-on:click="actualizarParcial()">Acualizar Parcial</button>
    <button v-on:click="borrar()">Borrar</button>
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
  methods: {
    async guardar() {
      const estudianteToBody = {
        nombre: "Estudiante",
        apellido: "Creado",
        fechaNacimiento: "2000-12-09T00:00:00",
        cedula: "1722172217",
        genero: "M",
      };
      await guardarFacahada(estudianteToBody);
    },
    async actualizar() {
      const estudianteToBody = {
        nombre: "Estudiante",
        apellido: "Modificado",
        fechaNacimiento: "2000-12-12T00:00:00",
        cedula: "1722172217",
        genero: "M",
      };
      await actualizarFacahada(estudianteToBody, 4);
    },
    async actualizarParcial() {
      const estudianteToBody = {
        apellido: "Parcial Modificado",
      };
      await actualizarParcialFacahada(estudianteToBody, 4);
    },
    async borrar() {
      const estudianteToBody = {
      };
      await borrarFacahada(8);
    },
  },
};
</script>

<style>
button {
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

button:hover {
  background-color: #0056b3;
  color: #e2e2e2;
}
</style>