import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/recipe-list',
      name: 'Listado de recetas',
      props: {
        description: 'Aquí encontrarás todas las recetas del sitio'
      },
      component: () => import('../views/RecipeList.vue')
    },
    {
      path: '/recipe-creator',
      name: 'Creador de Recetas',
      props: {
        description: 'Descripción de prueba desde el router'
      },
      component: () => import('../views/RecipeCreator.vue')
    },
    {
      path: '/recipe-creator/:id',
      name: 'Editar Receta',
      props: {
        description: 'Descripción de prueba desde el router'
      },
      component: () => import('../views/RecipeCreator.vue')
    }
  ]
})

export default router
