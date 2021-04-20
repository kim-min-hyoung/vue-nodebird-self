import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c165bf5a = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _7aef9cde = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _3f2e9758 = () => interopDefault(import('../pages/post/_id/index.vue' /* webpackChunkName: "pages/post/_id/index" */))
const _1f8ebf82 = () => interopDefault(import('../pages/user/_id/index.vue' /* webpackChunkName: "pages/user/_id/index" */))
const _2f96ff7c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/profile",
    component: _c165bf5a,
    name: "profile"
  }, {
    path: "/signup",
    component: _7aef9cde,
    name: "signup"
  }, {
    path: "/post/:id",
    component: _3f2e9758,
    name: "post-id"
  }, {
    path: "/user/:id",
    component: _1f8ebf82,
    name: "user-id"
  }, {
    path: "/",
    component: _2f96ff7c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
