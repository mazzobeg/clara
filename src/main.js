import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import store from './store'

const app = createApp(App)
app.use(store)
app.mount('#app')
