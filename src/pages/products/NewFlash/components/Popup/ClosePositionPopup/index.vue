<template>
  <Dialog :title="title" :dialogFlag="dialogFlag" @click="handleClose(dialogFlag)">
    <div class="m-close-position-container">
      <div class="m-close-position-title" v-if="isShowEstimated">ESTIMATED TOKENS TO GET</div>
      <div class="m-close-position-coin" v-if="isShowEstimated">
        <div class="num" v-if="estimatedLoading">
          <a-spin size="large" />
        </div>
        <div class="num" v-else>{{ closePositionData.itemData.estimated }}</div>
        <div class="icon">
          <img :src="closePositionData.itemData.iconUrl" alt="" />
        </div>
      </div>
      <div class="m-close-position-swap-loss">SWAP LOSS TOLERANCE</div>
      <div class="m-close-position-input">
        <a-input
          :autoFocus="true"
          v-model="inputData.value"
          step="0.000000000000000001"
          @change="handleInputChange"
          type="number"
        />
        <!-- <a-input-number
          step="0.01"
          type="number"
          :min="0"
          :max="50"
          :autoFocus="true"
          id="inputNumber"
          @change="handleInputChange"
          v-model="inputData.value"
        /> -->
        <span>%</span>
      </div>
      <div class="m-add-margin-popup-btn" :style="!isShowEstimated ? 'paddingTop:150px' : ''">
        <a-button
          :loading="loading"
          :disabled="disabled"
          class="chr-c-btn"
          @click="handleConfirm(inputData.value, dialogFlag, closePositionData)"
        >
          CONFIRM
        </a-button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "../../common/Dialog";
import { fixInput } from "../../../../../../utils/common-method";

export default {
  components: {
    Dialog,
  },
  watch: {
    "inputData.value": {
      handler(v) {
        let value = this.formatNumber(v);
        this.inputData.value = value;
      },
      immediate: true,
    },
    closePositionData: {
      handler(v) {
        this.closePositionData = v;
      },
      deep: true,
    },
  },
  methods: {
    formatNumber(v) {
      return fixInput(v, 2);
    },
    handleInputChange(v) {
      this.handlePropsInputChange(v);
    },
  },
  mounted() {},
  props: {
    closePositionData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    estimatedLoading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    isShowEstimated: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
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
          defaultValue: 0.5,
          placeholder: "",
          value: 0.5,
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
    handlePropsInputChange: {
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
<style lang="scss">
.m-close-position-coin {
  .num {
  }
}
</style>

<style lang="scss" scoped>
@import "./index.h5.scss";
@import "./index.scss";
</style>
