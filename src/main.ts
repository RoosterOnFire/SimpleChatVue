import { createPinia } from "pinia"
import { createApp, markRaw } from "vue"

import "./styles.css"
import App from "./App.vue"
import Router from "@/router/router"
import { storePocketbasePlugin } from "./store/storePluginPocketbase"

const pinia = createPinia()

pinia.use(({ store }) => {
  store.plugins.router = markRaw(Router)
})

pinia.use(storePocketbasePlugin)

createApp(App).use(pinia).use(Router).mount("#app")
