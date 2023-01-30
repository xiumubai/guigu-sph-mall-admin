import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
function abstract() {
  console.log(123)
}
abstract()
createApp(App).mount('#app')
