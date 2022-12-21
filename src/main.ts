import { createPinia } from "pinia"
import { createApp, markRaw } from "vue"

import "./styles.css"
import App from "./App.vue"
import router from "@/router/router"
import { storePocketbasePlugin } from "./store/storePluginPocketbase"

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

pinia.use(storePocketbasePlugin)

createApp(App).use(pinia).use(router).mount("#app")
