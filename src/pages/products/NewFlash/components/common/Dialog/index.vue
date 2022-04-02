<template>
  <div class="m-dialog-chr-login-error" v-if="dialogFlag">
    <div class="m-dialog-container" :class="dialogFlag ? 'enter' : ''">
      <div class="m-dialog-title">
        {{ title }}
      </div>
      <div class="m-dialog-content">
        <slot></slot>
      </div>
      <!-- <div class="m-dialog-footer"></div> -->
      <a-button class="m-dialog-close" @click="dialogClose">
        <img src="../../../../../../assets/tool/tool_icon_close.svg" />
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    dialogFlag: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    handleClose: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  methods: {
    dialogClose() {
      this.$emit("click", this.dialogFlag);
      this.handleClose(this.dialogFlag);
    },
    show() {
      this.isShow = true;
      // 使用setTimeout定时关闭
      setTimeout(this.hide, this.duration);
    },
    // 消失后移除自身所占资源
    hide() {
      this.isShow = false;
      this.remove();
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "./index.h5.scss";
@import "./index.scss";

@keyframes slidein-instructions-in {
  from {
    top: -50%;
  }
  to {
    top: 50%;
  }
}
</style>
