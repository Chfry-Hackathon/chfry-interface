<style lang="scss" scoped>
.m-tvl-box {
  position: relative;
}
</style>
<template>
  <div class="m-tvl-box">
    <Popup />
    <tvl-module-h5
      :tvlData="tvlData"
      :isLoding="isLoding"
      :totalLoading="totalLoading"
      :total="totalTVL"
      :farming="farming"
      v-if="isMobile"
    />
    <tvl-module-pc
      :tvlData="tvlData"
      :isLoding="isLoding"
      :totalLoading="totalLoading"
      :total="totalTVL"
      :farming="farming"
      v-else
    />
  </div>
</template>

<script>
import Popup from "../../../components/popup.vue";
import TvlModuleH5 from "./TVL.vue";
import TvlModulePc from "./TvlPcModule.vue";
import { mapGetters } from "vuex";
import {
  getTokenAddress,
  // getTotalAmount,
  // getOvenBanance,
} from "../../../utils/infuraWeb3.js";
import { toFixed0, thousands } from "../../../utils/tools";
import BigNumber from "bignumber.js";
import { CHEESE_FACTORY_CACHE_KEY } from "../../../constant/index";
// import { getStakePools } from "../../../utils/infuraWeb3";
import { memory } from "../../../utils/cache";
import { getStakePools } from "../../../utils/multicall";

export default {
  components: {
    TvlModuleH5,
    TvlModulePc,
    Popup,
  },
  data() {
    return {
      isLoding: false,
      farmingLoading: false,
      farming: {
        id: 3,
        sybmbol: "CHEESE FACTORY",
        number: "",
        url: "",
      },
      total: "",
      daiTvl: 0,
      usdcTvl: 0,
      usdtTvl: 0,
      tvlData: [
        {
          id: 0,
          sybmbol: "DAI",
          number: "",
          url: require("../../../assets/home/dai.svg"),
          address: "",
          isLoding: true,
        },
        {
          id: 1,
          sybmbol: "USDC",
          number: "",
          url: require("../../../assets/home/usdc.svg"),
          address: "",
          isLoding: true,
        },
        {
          id: 2,
          sybmbol: "USDT",
          number: "",
          url: require("../../../assets/home/usdt.svg"),
          address: "",
          isLoding: true,
        },
      ],
    };
  },
  methods: {
    async getCheeseFactoryTVL() {
      const statusCache = memory.get(CHEESE_FACTORY_CACHE_KEY);
      let res = {};
      if (
        statusCache &&
        statusCache.value &&
        statusCache.value.data &&
        statusCache.value.oven
      ) {
        res = statusCache.value;
      } else {
        const result = await getStakePools(true, true, false);
        memory.set(CHEESE_FACTORY_CACHE_KEY, result);
        res = result;
      }
      return res;
    },
    async farmingTotal() {
      const res = await this.getCheeseFactoryTVL();
      const result = res.data.map((item) => item.tvl);
      const sum = this.sumArr(result);
      return {
        total: toFixed0(sum) || 0,
        ovenBanance: res.oven,
        fryerData: res.fryer,
      };
    },
    sumArr(arr) {
      return arr.reduce(
        (pre, cur) => new BigNumber(pre).plus(new BigNumber(cur)).toFixed(),
        0
      );
    },
    async checkInfo() {
      this.isLoding = true;
      this.farmingLoading = true;
      const { total, ovenBanance, fryerData } = await this.farmingTotal();
      this.farming.number = total;
      this.farmingLoading = false;
      this.tvlData.map(async (item) => {
        item.isLoding = true;
        item.address = getTokenAddress(item.sybmbol);
        const num = new BigNumber(fryerData[item.sybmbol])
          .plus(new BigNumber(ovenBanance[item.sybmbol]))
          .toFixed();
        item.number = toFixed0(num);
        item.isLoding = false;
      });
      this.isLoding = false;
    },
  },
  computed: {
    ...mapGetters(["account", "isLogin", "config", "isMobile"]),
    totalTVL() {
      const allLoading = this.tvlData.every((item) => item.isLoding === false);
      if (allLoading && !this.farmingLoading) {
        const list = this.tvlData.map((item) => item.number);
        const sum = this.sumArr(list);
        return new BigNumber(sum)
          .plus(new BigNumber(this.farming.number))
          .toFixed();
      }
      return "";
    },
    totalLoading() {
      if (!this.totalTVL) {
        return true;
      }
      return false;
    },
  },

  mounted() {
    this.checkInfo();
  },
};
</script>

<style></style>
