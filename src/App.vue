<template>
  <div id="app">
     <!-- <Popup /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Global from "./common/Global";
import { switchNetwork } from "./utils/wallet";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  watch: {
    isLogin(v) {
      if (v) {
        this.$bus.emit("showLogin", false);
        this.$bus.emit("showLoginErr", false);
      } else {
        // switchNetwork().then((res) => {
        //   window.location.reload();
        //   if (res) {
        //     this.$bus.emit("showLoginErr", false);
        //   }
        // });
      }
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile"]),
  },
  methods: {
    windowChange() {
      let width = document.documentElement.clientWidth;
      this.$store.commit("change", width);
      // console.log(width);
    },
  },
  beforeCreate() {
    window["process"] = process;
    switchNetwork().then((res) => {
      if (res) {
        this.$bus.emit("showLoginErr", false);
      }
    });
    Global.initConfig(process.env.VUE_APP_BUILD_ENV);
  },
  created() {
    this.windowChange();
    window.onresize = () => this.windowChange();
  },
};
</script>

<style>
@import "./common/font/font.css";
#app {
  /* font-family: SourceHanSansCN-Light, SourceHanSansCN; */

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;

  overflow: hidden;
  /*min-width: 375px;*/
}
</style>
