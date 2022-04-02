<template>
  <div class="m-chfry-flash-clain-container">
    <div class="m-chfry-flash-clain-content">
      <div class="m-chfry-flash-clain-icon">
        <img :src="iconUrl" alt="" />
      </div>
      <div class="m-chfry-flash-clain-number">
        <Tooltip :data="number" :detail="detailNumber || number" placement="bottom"></Tooltip>
      </div>
      <div class="m-chfry-flash-clain-btn">
        <div class="claim-box" v-if="isClaim">
          <span class="aave">stkAAVE</span>
          <span class="chaim" @click="$emit('click', number)">CLAIM</span>
        </div>
        <span class="rewards" v-else @click="$emit('click', number)">EST. REWARDS</span>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "../Tooltip";

export default {
  components: {
    Tooltip,
  },
  props: {
    iconUrl: {
      type: String,
      default: () => {
        return "";
      },
    },
    isClaim: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    detailNumber: {
      default: () => {
        return "00.00";
      },
    },
    number: {
      default: () => {
        return "00.00";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./index.h5.scss";
</style>
