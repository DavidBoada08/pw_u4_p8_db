import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import LoginView from '../views/LoginView.vue'

import AboutView from '../views/AboutView.vue'
import EstudianteView from '../views/EstudianteView.vue'
import NotasIngresoView from '../views/NotasIngresoView.vue'
import RecursoProhibidoView from '../views/RecursoProhibidoView.vue'

import { obtenerPaginasPermitidas } from '../helpers/Autorizacion.js'


function estaAutenticado() {
  return localStorage.getItem('auth') === 'true';
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiereAutenticacion: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requiereAutenticacion: true,
    }
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: EstudianteView,
    meta: {
      requiereAutenticacion: true,
    }
  },
  {
    path: '/notas',
    name: 'notas',
    component: NotasIngresoView,
    meta: {
      requiereAutenticacion: true,
    }
  },
  {
    path: '/403',
    name: '403',
    component: RecursoProhibidoView,
    meta: {
      requiereAutenticacion: true,
    }
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//guardian
router.beforeEach((to, from, next) => {
  console.log('Antes')
  //validando si la pagina debe estar autenticada(requiereAutenticacion)
  if (to.meta.requiereAutenticacion) {
    console.log('Auth')
    if (!estaAutenticado()) {
      console.log('exito')
      next('/login')
      //va a la pagina de login cuando no esta autenticado
    } else {
      //si esta autenticado, permite el acceso a la ruta
      //aqui validamos si el usuario tiene permiso para acceder a la pagina
      let usuario = localStorage.getItem('usuario');
      let paginas = obtenerPaginasPermitidas(usuario);
      if (paginas.includes(to.path)) {
        console.log('Permiso concedido')
        next();
      }
      else {
        next('/403');
      }
    }
  } else {
    // Si la ruta no requiere autenticación, permite el acceso
    next();
  }
})

  export default router

