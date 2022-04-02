<template>
  <section class="m-tvl-item-container-h5" :style="styled">
    <div class="m-tvl-item-content">
      <title class="m-tvl-item-title">
        <span :class="sybmbol === 'CHEESE FACTORY'? 'small':'' ">
        {{ sybmbol }}
        </span>
      </title>
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
.m-tvl-item-container-h5 {
  width: 133px;
  height: 60px;
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
      padding-top: 8px;
      padding-bottom: 7px;
      span {
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 8px;
        line-height: 11px;
        color: #000000;
        &.small {
          transform: scale(0.8);
        }
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
          padding-right: 8px;
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 12px;
          line-height: 17px;
          color: #000000;
        }
        .icon {
          display: flex;
          width: 25px;
          height: 25px;
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
