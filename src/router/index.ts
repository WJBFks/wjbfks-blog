import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import DrawView from "../views/DrawView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "万劫不复ks",
    },
    component: HomeView,
  },
  {
    path: "/user",
    name: "user",
    meta: {
      title: "用户",
    },
    component: UserView,
  },
  {
    path: "/draw",
    name: "draw",
    meta: {
      title: "抽签",
    },
    component: DrawView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title as string;
  next();
});

export default router;
