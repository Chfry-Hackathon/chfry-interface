<style lang="scss" scope>
.m-tvl-container-h5 {
  box-sizing: border-box;
  width: 100%;
  .empty-q {
    width: 100%;
    height: 50px;
  }
  .m-tvl-content {
    width: 100%;
    header {
      width: 100%;
      height: 30px;
      font-family: Bugaki;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      color: #1d1d1b;
    }
    .m-tvl-total {
      width: 100%;
      font-family: Bugaki;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      color: #1d1d1b;
    }
    .m-tvl-item-title {
      width: 100%;
      font-family: Bugaki;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      color: #1d1d1b;
    }
    .empty-s {
      width: 100%;
      height: 12px;
    }
    .empty-l {
      width: 100%;
      height: 12px;
    }
    .empty {
      width: 100%;
      height: 32px;
    }
    .m-tvl-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .m-tvl-cons {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
<template>
  <section class="m-tvl-container-h5">
    <div class="empty-q"></div>
    <div class="m-tvl-content">
      <header>
        TVL
      </header>
      <div class="empty-s"></div>
      <div class="m-tvl-total" v-if="isLoding"><a-spin size="large"/></div>
      <div class="m-tvl-total" v-else>{{ thousands(total) }}</div>
      <!-- <div class="empty-l"></div> -->
      <!-- <div class="m-tvl-item-title">FLASH LOAN VALUE</div> -->
      <div class="empty"></div>
      <div class="m-tvl-wrapper">
        <div class="m-tvl-cons">
          <tvl-item-h5-module
            :styled="item.id == 2 ? { marginTop: '16px' } : {}"
            :sybmbol="item.sybmbol"
            :number="item.number"
            :url="item.url"
            v-for="item in tvlData"
            :key="item.id"
            :isLoding="isLoding"
          />
          <tvl-item-h5-module
            :styled="{ marginTop: '16px' }"
            :sybmbol="farming.sybmbol"
            :number="thousands(farming.number)"
            :url="farming.url"
            :isLoding="isLoding"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TvlItemH5Module from "./TVLItemH5Module";
import { thousands } from "../../../utils/tools";

export default {
  components: { TvlItemH5Module },
  props: ["total", "tvlData", "farming", "isLoding"],
  data() {
    return {
      thousands: thousands,
    };
  },
};
</script>
