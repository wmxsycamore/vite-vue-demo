import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: '/virtualList',
    name: 'virtualList',
    component: () => import("./components/virtualList.vue")
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router