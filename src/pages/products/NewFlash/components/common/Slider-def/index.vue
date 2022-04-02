<style lang="scss" scoped>
$bd-color: #000000;
$bg-color: #f499ad;
@media screen and (max-width: 750px) {
  ::v-deep .ant-input-number-input {
    width: 100% !important;
    height: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    color: #000000;
  }
  .ant-row {
    display: flex;
    flex-direction: column;

    #m-slide-input-box {
      width: 100%;
      padding-bottom: 30px;
      ::v-deep .ant-input-number {
        width: 100% !important;
        height: 30px !important;
        background-color: $bg-color;
        .ant-input-number-input-wrap {
          width: 100% !important;
          height: 100% !important;
        }
      }
      ::v-deep .ant-input-number-handler-wrap {
        display: none;
      }
      ::v-deep .ant-input-number {
        border: 1px solid rgba(0, 0, 0, 0.6);
        font-family: Arial;
        font-style: normal;
        font-size: 14px;
        /* color: rgba(0, 0, 0, 0.6); */
        font-weight: bold;
        font-size: 14px;
        color: #000000;
      }
      ::v-deep .ant-input-number-focused {
        border: 1px solid #000000;
        box-shadow: none;
      }
      ::v-deep .ant-input-number-handler:hover .ant-input-number-handler-up-inner,
      .ant-input-number-handler:hover .ant-input-number-handler-down-inner {
        color: #000000;
      }
      ::v-deep .ant-input-number:focus {
        border: 1px solid #000000;
        box-shadow: none;
      }
      .ant-input {
        width: 100%;
        height: 44px;
        background-color: $bg-color;
        border-right: 1px solid $bd-color;
        border-top: 1px solid $bd-color;
        border-bottom: 1px solid $bd-color;
        border-left: 1px solid $bd-color;

        text-align: center;
        font-family: Arial;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: #000000;
      }
      .ant-input:focus {
        border-right: 1px solid $bd-color;
        border-top: 1px solid $bd-color;
        border-bottom: 1px solid $bd-color;
        border-left: 1px solid $bd-color;
        box-shadow: none;
      }
    }

    #m-slide-wrapper {
      display: flex;
      width: 100%;
      align-items: center;
      .ant-slider {
        width: 100%;
      }
      .leverage-start {
        padding-top: 6px;
        padding-right: 36px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        color: #000000;
      }
      .leverage-end {
        width: 50px;
        padding-top: 6px;
        margin-left: 30px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        color: #000000;
        ::v-deep .ant-spin {
          .ant-spin-dot-spin {
            font-size: 0px !important;
            margin-bottom: 8px;
            .ant-spin-dot-item {
              width: 7px;
              height: 7px;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 751px) {
  ::v-deep .ant-input-number-input {
    width: 100% !important;
    height: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
  }
  .ant-row {
    display: flex;
    flex-direction: column;

    #m-slide-input-box {
      width: 100%;
      padding-bottom: 30px;
      ::v-deep .ant-input-number {
        width: 100% !important;
        height: 44px !important;
        background-color: $bg-color;
        .ant-input-number-input-wrap {
          width: 100% !important;
          height: 100% !important;
        }
      }
      ::v-deep .ant-input-number-handler-wrap {
        display: none;
      }
      ::v-deep .ant-input-number {
        border: 1px solid rgba(0, 0, 0, 0.6);
        font-family: Arial;
        font-style: normal;
        font-size: 14px;
        /* color: rgba(0, 0, 0, 0.6); */
        font-weight: bold;
        font-size: 14px;
        color: #000000;
      }
      ::v-deep .ant-input-number-focused {
        border: 1px solid #000000;
        box-shadow: none;
      }
      ::v-deep .ant-input-number-handler:hover .ant-input-number-handler-up-inner,
      .ant-input-number-handler:hover .ant-input-number-handler-down-inner {
        color: #000000;
      }
      ::v-deep .ant-input-number:focus {
        border: 1px solid #000000;
        box-shadow: none;
      }
      .ant-input {
        width: 100%;
        height: 44px;
        background-color: $bg-color;
        border-right: 1px solid $bd-color;
        border-top: 1px solid $bd-color;
        border-bottom: 1px solid $bd-color;
        border-left: 1px solid $bd-color;

        text-align: center;
        font-family: Arial;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: #000000;
      }
      .ant-input:focus {
        border-right: 1px solid $bd-color;
        border-top: 1px solid $bd-color;
        border-bottom: 1px solid $bd-color;
        border-left: 1px solid $bd-color;
        box-shadow: none;
      }
    }

    #m-slide-wrapper {
      display: flex;
      width: 100%;
      align-items: center;
      .ant-slider {
        width: 100%;
      }
      .leverage-start {
        padding-top: 6px;
        padding-right: 36px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        color: #000000;
      }
      .leverage-end {
        width: 50px;
        padding-top: 6px;
        margin-left: 30px;
        font-family: Arial;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        color: #000000;
        ::v-deep .ant-spin {
          .ant-spin-dot-spin {
            font-size: 0px !important;
            margin-bottom: 8px;
            .ant-spin-dot-item {
              width: 7px;
              height: 7px;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="m-chfry-slider-container">
    <a-row>
      <a-col id="m-slide-input-box">
        <a-input-number
          :step="slideDatas.step"
          :defaultValue="slideDatas.defaultValue"
          :precision="2"
          :min="slideDatas.slideMin"
          :max="toFixed2(slideDatas.slideMax)"
          v-model="slideDatas.slideValue"
          @blur="blur"
          @change="onChange"
        ></a-input-number>
        <!-- <input type="number" :min="1.1" :max="3"> -->
        <!-- <a-input v-model="slideDatas.slideValue" /> -->
      </a-col>
      <a-col id="m-slide-wrapper">
        <span class="leverage-start">{{ fixD(slideDatas.slideMin, 2) }}X</span>
        <a-slider
          v-model="slideDatas.slideValue"
          :step="slideDatas.step"
          :defaultValue="slideDatas.defaultValue"
          :min="slideDatas.slideMin"
          :tooltipVisible="false"
          :max="slideDatas.slideMax"
          @change="onChange"
        ></a-slider>
        <span class="leverage-end">
          <a-spin size="large" v-if="isLoading" />
          <span v-else> {{ toFixed2(slideDatas.slideMax, 2) }}X </span>
        </span>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { toFixed2 } from "../../../../../../utils/tools";
import { fixInput, fixD } from "../../../../../../utils/common-method";

export default {
  watch: {
    "slideDatas.slideValue": {
      handler(v) {
        let value = `${v}`;
        if (value.endsWith(".") || !Number(v)) {
          this.slideDatas.slideValue = fixInput(v, 2);
        }
        if (
          Number(this.slideDatas.slideValue) > this.slideDatas.slideMin &&
          Number(this.slideDatas.slideValue) <= this.slideDatas.slideMax
        ) {
          this.enterContext(this.slideDatas.slideValue);
        }
        if (Number(this.slideDatas.slideValue) <= this.slideDatas.slideMin) {
          this.enterContext(this.slideDatas.slideMin);
        }
        if (Number(this.slideDatas.slideValue) >= this.slideDatas.slideMax) {
          this.enterContext(this.slideDatas.slideMax);
        }
        this.$emit("change", v);
      },
      immediate: true,
    },
  },
  data() {
    return {
      toFixed2,
      fixD,
    };
  },
  props: {
    isLoading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    slideDatas: {
      type: Object,
      default: () => {
        return {
          slideValue: 1.1,
          slideMin: 1.1,
          slideMax: 1.1,
        };
      },
    },
    handleSlideChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile", "exhibitData"]),
  },
  mounted() {
    this.$nextTick(() => {
      this.createElement();
      this.enterContext(this.slideDatas.slideValue);
    });
  },
  methods: {
    blur() {
      if (this.slideDatas.slideValue === "" || this.slideDatas.slideValue === null) {
        this.slideDatas.slideValue = this.slideDatas.slideMin;
      }
    },
    handleInputChange(v) {},
    onChange(v) {
      this.$emit("change", v);
    },
    createElement() {
      const docum = document.querySelector("#m-slide-wrapper > .ant-slider > .ant-slider-handle");
      if (!docum) return;
      const divDom = document.createElement("div");
      divDom.className = "m-chfry-slider-leverage-number";
      divDom.style.position = "absolute";
      if (!this.isMobile) {
        divDom.style.right = "0px";
        divDom.style.top = "16px";
      } else {
        divDom.style.right = "-6px";
        divDom.style.top = "9px";
        divDom.style.transform = `scale(0.8)`;
      }

      divDom.style.fontFamily = "Arial";
      divDom.style.fontWeight = "bold";
      divDom.style.fontStyle = "normal";
      divDom.style.fontSize = "12px";
      divDom.style.width = "44px";
      divDom.style.textAlign = "center";
      divDom.style.color = "#000000";
      docum.appendChild(divDom);
    },
    enterContext(v) {
      const docum = document.querySelector(
        "#m-slide-wrapper > .ant-slider > .ant-slider-handle > .m-chfry-slider-leverage-number"
      );
      if (docum) {
        docum.innerHTML = fixD(v, 2) + "X";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-tooltip-arrow {
  display: none;
}
@media screen and (min-width: 751px) {
  .m-chfry-slider-container {
    width: 100%;
    ::v-deep .ant-slider {
      padding: 0;
      .ant-slider-rail {
        height: 16px;
        background-color: #f499ad;
        border-radius: 8px;
        border: 1px solid #000000;
      }
      .ant-slider-track {
        position: absolute;
        height: 16px;
        border: 1px solid #000000;
        background-color: #fbb33b;
        border-radius: 8px;
        transition: background-color 0.3s;
      }
      .ant-slider-handle {
        border: 0;
        top: -39px;
        width: 80px;
        height: 80px;
        border-radius: 0;
        background: url("../../../../../../assets/tool/icon_tool_tip.svg");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
      .ant-slider-handle:focus {
        border: 0;
        outline: none;
        box-shadow: none;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .m-chfry-slider-container {
    width: 100%;
    ::v-deep .ant-slider {
      padding: 0;
      .ant-slider-rail {
        height: 16px;
        background-color: #f499ad;
        border-radius: 8px;
        border: 1px solid #000000;
      }
      .ant-slider-track {
        position: absolute;
        height: 16px;
        border: 1px solid #000000;
        background-color: #fbb33b;
        border-radius: 8px;
        transition: background-color 0.3s;
      }
      .ant-slider-handle {
        border: 0;
        top: -24px;
        width: 54px;
        height: 54px;
        border-radius: 0;
        background: url("../../../../../../assets/tool/icon_tool_tip.svg");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
      .ant-slider-handle:focus {
        border: 0;
        outline: none;
        box-shadow: none;
      }
    }
  }
}
</style>
