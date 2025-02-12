import { createApp } from 'vue'
import App from './App.vue';
import './index.css'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.component('Toast', Toast);
app.mount('#app');