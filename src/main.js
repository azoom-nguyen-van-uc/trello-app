import Vue from "vue";
import Vuetify from "vuetify";

import "vuetify/dist/vuetify.min.css";

import router from "./router";
import App from "../App.vue";

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),
  router,
  render: (h) => h(App),
}).$mount("#app");
