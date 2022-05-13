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
import course from "../views/course.vue"
import material from "../components/material.vue"
import upload from "../components/upload.vue"
import seework from "../components/seework.vue"
import dowork from "../components/dowork.vue"
import postwork from "../components/postwork.vue"

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
  },
  {
    path: '/course/:courseId',
    name: 'course',
    component: course,
    children: [
      {
        path: 'material',
        component: material
      },
      {
        path: 'upload',
        component: upload
      },
      {
        path: 'postwork',
        component: postwork
      },
      {
        path: 'dowork',
        component: dowork
      },
      {
        path: 'seework',
        component: seework
      }
    ]
  },
  ]
})

export default router