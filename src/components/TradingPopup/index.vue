<template>
  <transition name="modal-scale">
    <div class="m-dialog-chr-login-error" v-if="dialogFlag">
      <div class="m-dialog-container">
        <div class="m-dialog-title">
          {{ title }}
        </div>
        <div class="m-dialog-content">
          <div class="m-dialog-status">
            <div class="ball-scale-multiple">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="m-dialog-status-title">
            {{ statusText["0"] }}
          </div>
        </div>
        <!-- <div class="m-dialog-footer"></div> -->
        <a-button class="m-dialog-close" @click="dialogClose">
          <img src="../../assets/tool/tool_icon_close.svg" />
        </a-button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      statusText: {
        0: "Waiting for Confirmation.",
        1: "Succeed for Confirmation",
        2: "Transaction rejected.",
      },
    };
  },
  props: {
    status: {
      type: Number,
      default: () => {
        return 0;
      },
    },
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
  },
};
</script>
<style lang="scss" scoped>
@import "./index.h5.scss";
@import "./scale.scss";
@import "./index.scss";
.circel {
  position: relative;
  width: 80px;
  height: 80px;
  background-image: url("../../assets/tool/circel.svg#svgView(preserveAspectRatio(none))");
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.circel-center {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.circel-hours {
  position: absolute;
  top: 61%;
  left: 49%;
  height: 18px;
  transform: translateY(-50%);
  border: 2px solid #000000;
  animation: change1 5s linear infinite;
}
.circel-mintues {
  position: absolute;
  top: 67%;
  left: 49%;
  height: 27px;
  transform: translateY(-50%);
  border: 2px solid #000000;
  animation: change1 1s linear infinite;
}

@keyframes change1 {
  0% {
    transform: translateY(-50%) rotate(0deg);
    transform-origin: 0 0;
  }

  100% {
    transform: translateY(-50%) rotate(360deg);
    transform-origin: 0 0;
  }
}
</style>
