import Vue from "vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import api from "@/api";
import "@/utils/promptUtils";
import echarts from "@/utils/echartUtils";

Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$serverAddress = "http://127.0.0.1:3000";

Vue.config.productionTip = false;

Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
