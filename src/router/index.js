import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Gallery from '../views/Gallery.vue'
import List from '../views/List.vue'
import Upload from '../views/Upload.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/list/:user',
    name: 'List',
    component: List
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/file/:id',
    name: 'Edit',
    component: Edit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
