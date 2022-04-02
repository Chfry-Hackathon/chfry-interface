<template>
  <div class="m-dialog-chr-login-error" v-if="dialogFlag">
    <div class="m-dialog-container">
      <div class="m-dialog-title">
        {{ title }}
      </div>
      <div class="m-dialog-content">
        <slot></slot>
      </div>
      <div class="m-dialog-footer"></div>
      <a-button class="m-dialog-close" @click="$emit('click', dialogFlag)">
        <img src="../assets/tool/tool_icon_close.svg" />
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "dialogFlag"],
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  .m-dialog-chr-login-error {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    text-align: left;
    margin: 0;
    padding: 0;
    .m-dialog-container {
      margin: 0;
      padding: 0;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      margin-top: 28px;
      width: 343px;
      height: 458px;
      background-image: url("../assets/dialog2.svg");
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .m-dialog-title {
        width: 100%;
        height: 65px;
        line-height: 65px;
        text-indent: 31px;
        font-family: Arial Black;
        font-style: normal;
        font-weight: 900;
        font-size: 14px;
      }
      .m-dialog-content {
        flex: 1;
      }
      .m-dialog-footer {
        height: 81px;
        width: 100%;
      }
      .m-dialog-close {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 20px;
        height: 20px;
        top: 20px;
        right: 16px;
        border: 0;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
@media screen and(min-width: 751px) {
  .m-dialog-chr-login-error {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    text-align: left;
    margin: 0;
    padding: 0;
    .m-dialog-container {
      margin: 0;
      padding: 0;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      margin-top: 28px;
      width: 539px;
      height: 520px;
      background-image: url("../assets/dialog.svg");
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .m-dialog-title {
        width: 100%;
        height: 65px;
        line-height: 65px;
        text-indent: 48px;
        font-family: Arial Black;
        color: #171717;
        font-style: normal;
        font-weight: 900;
        font-size: 18px;
      }
      .m-dialog-content {
        flex: 1;
      }
      .m-dialog-footer {
        height: 81px;
        width: 100%;
      }
      .m-dialog-close {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 30px;
        height: 30px;
        top: 20px;
        right: 32px;
        border: 0;
      }
    }
  }
}
</style>
