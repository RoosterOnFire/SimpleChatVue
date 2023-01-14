import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

import { useAuth } from "@/store/storeAuth"
import { RouteNames, storageKeys } from "@/types/typeEnums"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteNames.home,
    component: () => import("@/pages/PageLogin.vue"),
  },
  {
    path: "/dashboard",
    name: RouteNames.dashboard,
    component: () => import("@/pages/PageDashboard.vue"),
    children: [
      {
        path: "chat/:id",
        name: RouteNames.dashboard_chat,
        component: () => import("@/pages/PageDashboardChat.vue"),
      },
      {
        path: "rooms",
        name: RouteNames.dashboard_rooms,
        component: () => import("@/pages/PageDashboardRooms.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  if (
    auth == null &&
    (from.name === RouteNames.home || to.name !== RouteNames.home)
  ) {
    if (to.name === RouteNames.login || to.name === RouteNames.registration) {
      next()
    } else {
      next({ name: RouteNames.home })
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  const routeName = to.name as string
  if (!routeName.startsWith("home")) {
    sessionStorage.setItem(storageKeys.current_page, routeName)
  }
})

export default router
