<template>
  <div class="m-cheese-tip-container" :style="styled">
    <div class="m-cheese-tip-content">
      <img :src="require('../../../../../assets/cheese/tip.svg')" alt="tip" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styled: {
      type: Object || String,
      default: () => {
        return {} || "";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.m-cheese-tip-container {
  .m-cheese-tip-content {
    width: 205px;
    height: 99px;
    z-index: 99;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
