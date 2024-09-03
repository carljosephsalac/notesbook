import HomeView from '@/views/HomeView.vue'
import SavedView from '@/views/SavedView.vue'
import TrashView from '@/views/TrashView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/saved',
      name: 'saved',
      component: SavedView
    },
    {
      path: '/trash',
      name: 'trash',
      component: TrashView
    }
  ]
})

export default router
