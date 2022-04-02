<template>
  <div class="m-list-item">
    <div class="m-list-item-left">
      <div class="symbol">{{ item.symbol }}</div>
      <div class="amount">
        <span>{{ item.amount }}</span>
        <img :src="item.url" alt="" />
      </div>
    </div>
    <div class="m-list-item-right">
      <!-- :loading="loading"
        :disabled="disabled" -->
      <a-button class="chr-c-btn" :disabled="item.disabled" @click="handleWithdraw(item)">
        WITHDRAW
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "handleWithdraw"],
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 751px) {
  .m-list-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .m-list-item-right {
      button {
        min-width: 120px !important;
        height: 38px;
        padding: 0 !important;
        margin: 0 !important;
        line-height: 36px !important;
        background-color: #ffffff;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        &:hover,
        &:focus,
        &:active {
          background-color: #000000;
        }
        &[disabled],
        &[disabled]:hover {
          background: #ffffff !important;
        }
      }
    }
    .m-list-item-left {
      .symbol {
        padding-top: 20px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
      }
      .amount {
        display: flex;
        align-items: center;
        padding-top: 8px;

        span {
          padding-right: 8px;
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 14px;
        }
        img {
          display: inline-block;
          width: 28px;
          height: 28px;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .m-list-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .m-list-item-right {
      button {
        min-width: 102px !important;
        height: 38px;
        padding: 0 !important;
        margin: 0 !important;
        line-height: 36px !important;
        background-color: #ffffff;
        font-family: Arial Black;
        font-style: normal;
        font-size: 12px;
        font-weight: 900;
        &:hover,
        &:focus,
        &:active {
          background-color: #000000;
        }
        &[disabled],
        &[disabled]:hover {
          background: #ffffff !important;
        }
      }
    }
    .m-list-item-left {
      .symbol {
        padding-top: 20px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
      }
      .amount {
        display: flex;
        align-items: center;
        padding-top: 8px;

        span {
          padding-right: 8px;
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 14px;
        }
        img {
          display: inline-block;
          width: 28px;
          height: 28px;
        }
      }
    }
  }
}
</style>
