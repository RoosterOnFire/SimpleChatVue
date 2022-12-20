import { createPinia } from "pinia"
import { createApp, markRaw } from "vue"

import "./styles.css"
import App from "./App.vue"
import Router from "@/router/router"

const pinia = createPinia()

pinia.use(({ store }) => {
  store.plugins = {
    router: markRaw(Router),
  }
})

createApp(App).use(pinia).use(Router).mount("#app")
