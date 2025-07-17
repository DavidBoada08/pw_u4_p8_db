import axios from 'axios';

const URL_API = 'http://localhost:8081/API/matricula/v1/estudiantes';
//GuardarAPI
//public Response guardar(@RequestBody EstudianteTo estudianteTo)
const guardar = async (body) => {
    axios.post(`${URL_API}`, body).then(r => r.data);
    console.log("Guardado exitoso");
    
}

//Actualizar API
//public Response actualizarPorId(EstudianteTo estudianteTo, @PathParam("id") Integer id)
const actualizar = async (body, id) => {
    axios.put(`${URL_API}/${id}`, body).then(r => r.data);
    console.log("Actualizado exitoso");
}

//ActualizarPorId API
//public Response actualizarParcialPorId(EstudianteTo estudianteTo, @PathParam("id") Integer id)
const actualizarParcial = async (body, id) => {
    axios.patch(`${URL_API}/${id}`, body).then(r => r.data);
    console.log("Actualización parcial exitosa");
}

//Borrar API
//public Response borrarPorId(@PathParam("id") Integer id)
const borrar = async (id) => {
    axios.delete(`${URL_API}/${id}`).then(r => r.data);
    console.log("Borrado exitoso");
}


//Fachadas
export const guardarFacahada = async (body) => {
    await guardar(body);
}
export const actualizarFacahada = async (body, id) => {
    await actualizar(body, id);
}
export const actualizarParcialFacahada = async (body, id) => {
    await actualizarParcial(body, id);
}
export const borrarFacahada = async (id) => {
    await borrar(id);
}