import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/adopt',
    name: 'Adopt',
    component: () => import('../pages/AdoptPage.vue')
  },
  {
    path: '/my-tree',
    name: 'MyTree',
    component: () => import('../pages/MyTreePage.vue')
  },
  {
    path: '/water',
    name: 'Water',
    component: () => import('../pages/WaterPage.vue')
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import('../pages/AppointmentPage.vue')
  },
  {
    path: '/co-adopt',
    name: 'CoAdopt',
    component: () => import('../pages/CoAdoptPage.vue')
  },
  {
    path: '/market',
    name: 'Market',
    component: () => import('../pages/MarketPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router