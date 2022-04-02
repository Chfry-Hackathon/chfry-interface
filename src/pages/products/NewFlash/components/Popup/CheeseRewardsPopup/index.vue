<style lang="scss" scoped></style>
<template>
  <Dialog :title="title" :dialogFlag="dialogFlag" @click="handleClose">
    <div class="m-cheese-rewards-container">
      <div class="m-cheese-rewards-estimated-title">
        ESTIMATED REWARDS
      </div>
      <div class="m-cheese-rewards-amount-box">
        <span class="num">0000.000</span>
        <span class="icon">
          <img src="" alt="" />
        </span>
      </div>

      <div class="segmentation"></div>

      <div class="m-cheese-rewards-claimable-title">
        CLAIMABLE REWARDS
      </div>
      <div class="m-cheese-rewards-amount-box">
        <span class="num">0000.000</span>
        <span class="icon">
          <img src="" alt="" />
        </span>
      </div>
      <div class="m-cheese-rewards-popup-btn">
        <a-button
          :loading="loading"
          :disabled="disabled"
          class="chr-c-btn"
          @click="handleConfirm"
        >
          CLAIM
        </a-button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "../../common/Dialog";

export default {
  components: {
    Dialog,
  },
  props: {
    estimated: {
      default: () => {
        return "";
      },
    },
    iconUrl: {
      type: String,
      default: () => {
        return "";
      },
    },
    //输入框Data
    inputData: {
      type: Object,
      default: () => {
        return {
          defaultValue: "",
          placeholder: "",
          value: "",
        };
      },
    },
    // Button 是否禁用
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },

    // Button 是否loading
    loading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },

    // popup title
    title: {
      type: String,
      default: () => {
        return "";
      },
    },

    // dialog 开关
    dialogFlag: {
      type: Boolean,
      default: () => {
        return true;
      },
    },

    // dialog 关闭事件
    handleClose: {
      type: Function,
      default: () => {
        return () => {};
      },
    },

    // 确认按钮
    handleConfirm: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.h5.scss";
@import "./index.scss";
</style>
