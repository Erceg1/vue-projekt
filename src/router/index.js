import { createRouter, createWebHistory } from 'vue-router'
// Uvezi svoje komponente (prilagodi putanje ako se zovu drugačije)
import HomeView from '../views/HomeView.vue' 
import MovieDetails from '../views/MovieDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // :id je dinamički dio koji movieService koristi
      path: '/movie/:id',
      name: 'movieDetails',
      component: MovieDetails,
      // Ovo omogućuje da ID dobiješ kao prop u komponenti, što je "cleaner" put
      props: true 
    }
  ],
})

export default router