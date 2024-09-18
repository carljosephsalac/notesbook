import HomeView from '@/views/HomeView.vue'
import SavedView from '@/views/SavedView.vue'
import TrashView from '@/views/TrashView.vue'
import { createRouter, createWebHistory } from 'vue-router'

let homeScrollPosition = { top: 0, left: 0 } // Store only the scroll position for 'home'

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
  ],
  scrollBehavior(to, from, savedPosition) {
    // If navigating "back" and a saved position is available, restore it
    if (savedPosition) {
      return savedPosition
    }

    // If navigating to 'home', restore the saved position
    if (to.name === 'home' && from.name !== 'home') {
      return homeScrollPosition
    }

    // If navigating to 'home' from 'home', scroll to the top
    if (to.name === 'home' && from.name === 'home') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Smooth scroll to top
      })
      return false // Prevent instant scroll
    }

    // If navigating to 'saved' from 'saved', scroll to the top
    if (to.name === 'saved' && from.name === 'saved') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Smooth scroll to top
      })
      return false // Prevent instant scroll
    }

    // If navigating to 'trash' from 'trash', scroll to the top
    if (to.name === 'trash' && from.name === 'trash') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Smooth scroll to top
      })
      return false // Prevent instant scroll
    }

    // Scroll to top by default when no saved position is available
    return { top: 0 }
  }
})

// Before navigating away, save the current scroll position
router.beforeEach((to, from, next) => {
  if (from.name === 'home') {
    homeScrollPosition = {
      left: window.scrollX,
      top: window.scrollY
    }
  }
  next()
})

export default router
