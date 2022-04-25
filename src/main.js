import Vue from 'vue'
import App from './App.vue'
import store from '@store';
import router from '@router';
import './layout/css/style.scss';
import directives from './directives';

Vue.use(directives);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
