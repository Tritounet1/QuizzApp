import { createApp } from 'vue'
import './index.css'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import { createMemoryHistory, createRouter } from 'vue-router'

import QuizzApp from './Quizz.vue'
import ResultPage from './ResultPage.vue'
import App from "./App.vue";

const routes = [
    { path: '/', component: QuizzApp },
    { path: '/result', component: ResultPage },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.component('Toast', Toast);
app.mount('#app');