import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ReportView from '../views/ReportView.vue'
import ActivityView from '../views/ActivityView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView,
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView,
    },
    {
      path: '/admin/activity',
      name: 'admin_activity',
      component: () => import('../views/admin/ActivityList.vue'),
    },
    {
      path: '/admin/activity/:_id',
      name: 'admin_activity_edit',
      component: () => import('../views/admin/ActivityEdit.vue'),
    },
    {
      path: '/admin/activity_images/:_id',
      name: 'admin_activity_images',
      component: () => import('../views/admin/ActivityImages.vue'),
    },
  ]
})

export default router