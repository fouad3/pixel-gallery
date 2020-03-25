import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import AlertComp from './shared/AlertComp.vue';

Vue.config.productionTip = false;

Vue.component('app-alert', AlertComp);

new Vue({
  router,
  store,
  render: (h) => h(App),
  vuetify,
}).$mount('#app');
