import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import dsa from "./modules/dsa";
import getters from "./getters";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isMobile: false,
  },
  mutations: {
    change(state, width) {
      state.isMobile = width <= 750;
    },
  },
  modules: {
    user,
    dsa,
  },
  getters,
});

export default store;
