import Vue from 'vue'
import App from './App.vue'
import store from '@store';
import router from '@router';
import './layout/css/style.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faFacebook, faVk, faOdnoklassniki } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

library.add(faInstagram, faFacebook, faVk, faOdnoklassniki);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
