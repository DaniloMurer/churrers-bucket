import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

createApp(App).use(router).use(VueMonacoEditorPlugin, {
    paths: {
        // The recommended CDN config
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs'
    },
}).mount('#app')
