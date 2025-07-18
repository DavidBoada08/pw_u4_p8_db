export function obtenerPaginasPermitidas(usuario) {

    let arreglo; // Inicializar como array vacío por defecto

    if (usuario === 'admin') {
        //paginas del admin
        arreglo = ['/home', '/about', '/estudiante', '/notas', '/403'];
    } else if (usuario === 'estudiante') {
        //paginas del estudiante
        arreglo = ['/home', '/about', '/estudiante', '/403'];
    }
    return arreglo;
}