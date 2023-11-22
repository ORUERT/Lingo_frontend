import {createApp} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './scss/app.scss'

import router from "./router"
import store from "./store"
//
// import DefaultLayout from './layout/Default'
// import DashboardLayout from "./layout/Dashboard";

// import axios from 'axios';
import './axios'
import './permission'

// Vue.
const vueA = createApp(App);

vueA.config.productionTip = false
vueA.use(router);
vueA.use(store)
vueA.use(Antd)

// vueA.component("layout-default",DefaultLayout)
// vueA.component("layout-dashboard",DashboardLayout)
vueA.mount("#app");