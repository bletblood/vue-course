import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import PostIdPage from '@/pages/PostIdPage'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router