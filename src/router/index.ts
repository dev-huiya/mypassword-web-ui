import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import { verifyToken } from '@/utils/Auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index-page',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/join',
    component: () => import('@/views/join.vue'),
  },
  {
    path: '/service/terms',
    component: () => import('@/views/service/terms.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
  },
]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if(to.hash) { // if has a hash...
    console.log('hash', to.hash)
    return {
      el: to.hash,
      top: 0,
    } // scroll to the element
  }
  return { top: 0 }
}

const router = createRouter({
  scrollBehavior,
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  if(to.meta.requiresAuth && !verifyToken()) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
