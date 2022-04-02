<style scoped>
a {
  position: absolute;
}
</style>
<template>
  <div class="m-cheese-container" :style="styled">
    <div class="m-cheese-content" ref="cheese_item_box">
      <!-- <cheese-item-tip
        v-if="isMimCoin"
        :styled="{
          position: 'absolute',
          left: '50%',
          top: '-50px',
        }"
      /> -->
      <div class="m-cheese-coin-logo-box">
        <img
          ref="coin_logo"
          class="img2"
          :src="require('../../../../../assets/cheese/' + pool.symbol1)"
        />
      </div>
      <div class="m-cheese-coin-main-desc">
        <div class="m-cheese-coin-apr-box" ref="cheese_coin_apr_box">
          <div class="m-cheese-coin-apr-title">STAKING APR</div>
          <div class="m-cheese-coin-apr-number">{{ pool.apr || "--" }}%</div>
        </div>
        <!-- <div class="m-cheese-coin-bonus-apr-box" v-if="isMimCoin">
          <div class="m-cheese-coin-tvl-title">TOTAL STAKING BONUS</div>
          <div class="m-cheese-coin-tvl-number">5000 $CHEESE</div>
        </div> -->
        <div class="m-cheese-coin-tvl-box" ref="cheese_coin_tvl_box">
          <div class="m-cheese-coin-tvl-title">TVL</div>
          <div class="m-cheese-coin-tvl-number">{{ resetTvl || "--" }}</div>
        </div>
        <div class="m-cheese-coin-link-box" ref="cheese_coin_link_box">
          <span @click="handleTo()">{{ pool.text }}</span>
        </div>
      </div>
      <div class="m-cheese-coin-btn-box">
        <a-button @click="select" class="chr-c-btn">SELECT</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheeseItemTip from "./CheeseItemTip.vue";
import { toFixed0, thousands } from "../../../../../utils/tools";

export default {
  components: { CheeseItemTip },
  props: {
    styled: {
      type: Object || String,
      default: () => {
        return {} || "";
      },
    },
    onSelect: {
      type: Function,
      default: () => () => {},
    },
    pool: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(["isMobile"]),
    isMimCoin() {
      return this.pool.symbol1 === "MIM_T.png";
    },
    resetTvl() {
      return this.pool.tvl ? thousands(toFixed0(this.pool.tvl)) : "--";
    },
  },
  methods: {
    initial() {
      this.setBg();
      this.setCheeseCoinMainBoxStyle();
    },
    setCheeseCoinMainBoxStyle() {
      this.$nextTick(() => {
        // if (!this.isMobile && this.isMimCoin) {
        //   this.$refs.cheese_coin_link_box.style.paddingTop = "21px";
        // }
      });
    },
    select() {
      if (this.onSelect) this.onSelect(this.pool);
    },
    handleTo() {
      window.open(this.pool.url);
    },
    setBg() {
      if (this.isMimCoin) {
        this.$refs.cheese_item_box.style.backgroundImage = `url('${require("../../../../../assets/cheese_item_box_bg.svg")}')`;
      } else {
        this.$refs.cheese_item_box.style.backgroundImage = `url('${require("../../../../../assets/cheese_item_box_bg.svg")}')`;
      }
    },
  },
  mounted() {
    this.initial();
  },
};
</script>
<style lang="scss" scoped>
@import "./new_cheese_item_375.scss";
@import "./new_cheese_item_1024.scss";
@import "./new_cheese_item_1280.scss";
@import "./new_cheese_item_1440.scss";
</style>
