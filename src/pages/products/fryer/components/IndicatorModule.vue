<template>
  <section class="m-indicators-module-container">
    <div class="m-indicators-module-content">
      <indicatorItem
        :item="item"
        v-for="(item, index) in resetIndicatorDatas"
        :key="index"
        :styled="styled(item, index)"
      ></indicatorItem>
    </div>
  </section>
</template>

<script>

import indicatorItem from "./IndicatorItem.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    indicatorItem,
  },
  props: {
    indicatorDatas: {
      type: Array,
      default() {
        return [
          {
            title: "REMAINING DEBT",
            count: "000,000,000",
            symbol: "USDT",
          },
          {
            title: "DATE OF MATURITY",
            count: "sss:sss:sss",
            // number: "000,000",
          },
          {
            title: "APY",
            count: "000,000",
            symbol: "USDT",
          },
        ];
      },
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile"]),
    resetIndicatorDatas() {
      if (this.indicatorDatas) {
        const [one, two, three] = this.indicatorDatas;
        if (this.isMobile) {
          return [one, three, two];
        }
        return this.indicatorDatas;
      }
      return this.indicatorDatas;
    },
  },
  methods: {
    styled(item, index) {
      if (!this.isMobile && index !== 0) {
        return { marginLeft: "24px" };
      }
      if (this.isMobile && index === 2) {
        return { marginTop: "24px" };
      }
      return {};
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  .m-indicators-module-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 36px;
    .m-indicators-module-content {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
    }
  }
}
@media screen and (max-width: 1279px) and (min-width: 751px) {
  .m-indicators-module-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 56px;
    .m-indicators-module-content {
      display: flex;
      align-items: center;
    }
  }
}
@media screen and (max-width: 1439px) and (min-width: 1280px) {
  .m-indicators-module-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 56px;
    .m-indicators-module-content {
      display: flex;
      align-items: center;
    }
  }
}
@media screen and (min-width: 1440px) {
  .m-indicators-module-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 56px;
    .m-indicators-module-content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
