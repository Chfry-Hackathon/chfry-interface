<style lang="scss" scope>
.m-tvl-container-pc {
  width: 100%;
  .m-tvl-content {
    width: 100%;
    margin-top: 20px;
    header {
      width: 100%;
      height: 49px;
      text-align: center;
      font-family: Bugaki;
      font-style: normal;
      font-weight: normal;
      font-size: 32px;
      line-height: 49px;
      text-align: center;
      color: #1d1d1b;
    }
    .m-tvl-total {
      width: 100%;
      min-height: 49px;
      text-align: center;
      font-family: Bugaki;
      font-style: normal;
      font-weight: normal;
      font-size: 32px;
      line-height: 49px;
      text-align: center;
      color: #1d1d1b;
    }
    .m-tvl-item-title {
      /* margin-top: 22px;
      margin-bottom: 40px; */
      font-family: Bugaki;
      font-style: normal;
      font-weight: normal;
      font-size: 32px;
      line-height: 49px;
      text-align: center;
      color: #1d1d1b;
    }
    .empty-l {
      width: 100%;
      height: 40px;
    }
    .empty {
      width: 100%;
      height: 40px;
    }
    .m-tvl-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .m-tvl-cons {
        display: flex;
      }
    }
  }
}
</style>
<template>
  <section class="m-tvl-container-pc">
    <div class="m-tvl-content">
      <header>
        TVL
      </header>
      <div class="m-tvl-total" v-if="isLoding"><a-spin size="large"/></div>
      <div class="m-tvl-total" v-else>{{ thousands(total) }}</div>
      <div class="empty-l"></div>
      <!-- <div class="m-tvl-item-title">FLASH LOAN VALUE</div> -->
      <!-- <div class="empty"></div> -->
      <div class="m-tvl-wrapper">
        <div class="m-tvl-cons">
          <tvl-item-pc
            :styled="item.id !== 0 ? { marginLeft: '24px' } : {}"
            :sybmbol="item.sybmbol"
            :number="item.number"
            :url="item.url"
            v-for="item in tvlData"
            :key="item.id"
            :isLoding="isLoding"
          />
          <tvl-item-pc
            :styled="{ marginLeft: '24px' }"
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
import { thousands } from "../../../utils/tools";
import TvlItemPc from "./TVLItemPcModule";

export default {
  name: "tvl-pc",
  components: { TvlItemPc },
  props: ["total", "tvlData", "farming", "isLoding"],
  data() {
    return {
      thousands: thousands,
    };
  },
};
</script>
