import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Register from "../views/register.vue"
import liveroom from "../views/liveroom.vue"
import openCourse from "../views/openCourse.vue"
import selectCourse from "../views/selectCourse.vue"

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/index',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/liveroom/:course',
      name: 'liveroom',
      component: liveroom
    },
    {
      path: '/openCourse',
      name: 'openCourse',
      component: openCourse
    },
    {
      path: '/selectCourse',
      name: 'selectCourse',
      component: selectCourse
    }
  ]
})

export default router