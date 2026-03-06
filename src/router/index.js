import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue' 
import MovieDetails from '../views/MovieDetails.vue'
import PopularView from '../views/PopularView.vue';

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
      
      props: true 
    },
    {
    path: '/popular',
    name: 'popular', 
    component: PopularView
    },
    
  ],
})

export default router