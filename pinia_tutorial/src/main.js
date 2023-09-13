import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'; // Import your main.css file
import {createPinia} from 'pinia'

createApp(App).use(createPinia()).mount('#app')
