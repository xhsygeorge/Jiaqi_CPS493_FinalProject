import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ReportView from '../views/ReportView.vue'
import FriendsZoneView from '../views/FriendsZoneView.vue'
import FriendsView from '../views/FriendsView.vue'


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
      path: '/report',
      name: 'report',
      component: ReportView,
    },
    {
      path: '/friendszone',
      name: 'friendszone',
      component: FriendsZoneView,
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsView,
    },
    {
      path: '/friend/:id',
      name: 'friend',
      component: () => ('../view/FriendDetailsView.vue'),
    },
  ]
})

export default router