<template>
  <section class="m-tvl-item-container-pc" :style="styled">
    <div class="m-tvl-item-content">
      <title class="m-tvl-item-title"><span>{{ sybmbol }}</span></title>
      <div class="m-tvl-item-number">
        <div class="m-tvl-item-number-cont">
          <div class="number" v-if="isLoding"><a-spin size="large"/></div>
          <div class="number" v-else>{{ thousands(number) }}</div>
          <div class="icon" v-if="url">
            <img :src="url" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { thousands } from "../../../utils/tools";
export default {
  data() {
    return {
      thousands
    }
  },
  props: {
    sybmbol: {
      default: "",
      type: String,
    },
    url: {
      default: "",
      type: String,
    },
    number: {},
    styled: {
      type: Object,
    },
    isLoding: {
      default: false,
      type: Boolean,
    }
  },
};
</script>

<style lang="scss" scope>
.m-tvl-item-container-pc {
  width: 277px;
  height: 127px;
  background: url("../../../assets/home/tvl.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .m-tvl-item-content {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    .m-tvl-item-title {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-top: 25px;
      padding-bottom: 12px;
      span {
        display: flex;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
      }
    }
    .m-tvl-item-number {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .m-tvl-item-number-cont {
        display: flex;
        .number {
          padding-right: 12px;
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 22px;
          line-height: 31px;
          color: #000000;
        }
        .icon {
          display: flex;
          width: 32px;
          height: 32px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
