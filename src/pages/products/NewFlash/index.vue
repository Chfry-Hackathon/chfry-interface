<template>
  <div class="m-chfry-flash-container" id="m_chfry_flash_container">
    <div class="m-pc-chfry-flash-content">
      <Header />
      <div class="ver-scroll" v-if="isMobile">
        <VerScroll :defWidth="343 * 2 + 50" :styled="{ paddingLeft: '16px' }">
          <LongShort :styled="{ marginLeft: '15px' }" />
          <Order />
        </VerScroll>
      </div>
      <Exhibit v-if="isMobile" />
      <div class="ver-scroll" v-if="isMobile">
        <VerScroll :defWidth="343 * 2 + 50" :styled="{ paddingLeft: '16px' }">
          <Deposits :styled="{ marginLeft: '15px' }" />
          <Borrows />
        </VerScroll>
      </div>

      <section class="m-chfry-flash-wrapper" v-if="!isMobile">
        <div class="m-chfry-flash-content">
          <div class="m-chfry-flash-list-left-box">
            <LongShort />
          </div>
          <div class="m-chfry-flash-list-right-box">
            <Order />
          </div>
        </div>
      </section>

      <section class="m-chfry-flash-cart-wrapper" v-if="!isMobile">
        <Exhibit />
      </section>

      <section class="m-chfry-flash-wrapper two" v-if="!isMobile">
        <div class="m-chfry-flash-list-left-box">
          <Deposits />
        </div>
        <div class="m-chfry-flash-list-right-box">
          <Borrows />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import LongShort from "./components/LongShort";
import Order from "./components/Order";
import Exhibit from "./components/Exhibit";
import Deposits from "./components/Deposits";
import Borrows from "./components/Borrows";
import { mapGetters } from "vuex";
import VerScroll from "./components/common/VerScroll";
import { SETDSASTATUS, SETDSAACCOUNT } from "../../../store/modules/dsa";
import { loadImg } from "../../../utils/preImages";

export default {
  name: "chfry-flash",
  data() {
    return {
      preImg: [
        require("../../../assets/newFlash/dialog_pc.svg"),
        require("../../../assets/newFlash/dialog_h5.svg"),
      ],
    };
  },
  components: {
    Header,
    LongShort,
    Order,
    Exhibit,
    Deposits,
    Borrows,
    VerScroll,
  },
  watch: {
    account() {
      this.$store.dispatch(`dsa/${SETDSASTATUS}`, this.currentPositionType);
    },
    isLogin(v) {
      if (v) {
        this.$store.dispatch(`dsa/${SETDSASTATUS}`, this.currentPositionType);
      }
    },
    currentPositionType(v) {
      if (v && this.isCreatedAccount) {
        this.$store.dispatch(`dsa/${SETDSAACCOUNT}`, this.currentPositionType);
      }
    },
    isCreatedAccount(v) {
      if (v) {
        this.$store.dispatch(`dsa/${SETDSAACCOUNT}`, this.currentPositionType);
      }
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile", "isCreatedAccount", "currentPositionType"]),
  },
  methods: {},
  mounted() {
    if (this.isLogin) {
      this.$store.dispatch(`dsa/${SETDSASTATUS}`, this.currentPositionType);
    }
    loadImg(this.preImg);
  },
};
</script>

<style lang="scss" scoped>
@import "./index_375.scss";
@import "./index_1024.scss";
@import "./index_1280.scss";
@import "./index_1440.scss";
</style>
