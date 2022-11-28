import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import { verifyToken } from '@/utils/Auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index-page',
    component: () => import('@/views/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/logout',
    component: () => import('@/views/logout.vue'),
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
    path: '/password/new',
    component: () => import('@/views/passwordNew.vue'),
    meta: {
      requiresAuth: true,
      subHeader: true,
    },
  },
  {
    path: '/password/:host',
    component: () => import('@/views/passwordDetail.vue'),
    meta: {
      requiresAuth: true,
      subHeader: true,
    },
  },
  {
    path: '/note/new',
    component: () => import('@/views/noteNew.vue'),
    meta: {
      requiresAuth: true,
      subHeader: true,
    },
  },
  {
    path: '/note/:id(\\d+)',
    component: () => import('@/views/noteDetail.vue'),
    meta: {
      requiresAuth: true,
      subHeader: true,
    },
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
