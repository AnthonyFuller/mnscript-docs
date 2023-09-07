import DefaultTheme from "vitepress/theme"
import "./styles/sidebar.css"

import Codeblock from "./components/Codeblock.vue"

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.component("Codeblock", Codeblock)
    }
}