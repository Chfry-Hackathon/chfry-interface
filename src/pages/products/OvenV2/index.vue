<template>
  <div class="page-baskets">
    <div class="chr-title">
      <div class="t1">
        <span class="t1-span1">OVEN</span>
        <span class="t1-span2">OVEN</span>
      </div>
      <div class="t2">
        Stake and Grill your fUSD and convert <br v-if="isMobile" />
        them to <br v-if="!isMobile" />USDT/USDC/DAI over time
      </div>
    </div>
    <div class="p1">
      <img src="../../../assets/oven_img.svg" />
    </div>
    <div class="pool-con">
      <pool-item
        v-for="item in pools"
        :key="item.symbol"
        :toStake="toStake"
        :token="item"
      ></pool-item>
    </div>
    <div class="pool-con-center">
      <!-- <EntryV2 /> -->
    </div>
  </div>
</template>

<script>
import PoolItem from "./components/PoolItem";
import { mapGetters } from "vuex";
import { getTokenAddress } from "../../../sdk/cheese-sdk";
import { toFixed4, trace, toFixed0 } from "../../../utils/tools";
import { getBalanceToken } from "../../../api/user";

export default {
  components: { PoolItem },
  props: {},
  data() {
    return {
      pools: [
        {
          symbol: "USDC",
          address: "",
          amount: 0,
        },
        {
          symbol: "USDT",
          address: "",
          amount: 0,
        },
        {
          symbol: "DAI",
          address: "",
          amount: 0,
        },
      ],
    };
  },
  methods: {
    checkInfo() {
      if (this.isLogin) {
        this.pools.map(async (item) => {
          item.address = getTokenAddress(item.symbol);
          item.amount = toFixed4(await getBalanceToken(item.address));
        });
      }
    },
    toStake(item) {
      if (this.isLogin) {
        this.$store.dispatch("user/setOven", item.address);
        this.$router.push({ path: "/ovenV2/stake" });
      } else {
        this.$bus.emit("showLogin", true);
      }
    },
  },
  watch: {
    account() {
      this.checkInfo();
    },
    config() {
      this.checkInfo();
    },
  },
  computed: {
    ...mapGetters(["account", "isLogin", "config", "isMobile"]),
  },

  mounted() {
    this.checkInfo();
  },
};
</script>
<style lang="scss" scoped>
@import "./index_375.scss";
@import "./index_1024.scss";
@import "./index_1280.scss";
@import "./index_1440.scss";
</style>
