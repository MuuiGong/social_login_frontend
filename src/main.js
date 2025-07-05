import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // router/index.js 에서 불러오기

createApp(App)
  .use(router)
  .mount('#app')
