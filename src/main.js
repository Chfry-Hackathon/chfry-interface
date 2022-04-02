import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/style/index.scss";
import router from "./router";
import store from "./store";
import VueBus from "vue-bus";
import infiniteScroll from "vue-infinite-scroll";

import LottieAnimation from "lottie-web-vue";


Vue.use(LottieAnimation);
Vue.use(infiniteScroll);

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueBus);


new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
