<template>
  <div class="m-chfry-slider-container">
    <a-slider
      v-model="slideDatas.slideValue"
      :step="slideDatas.step"
      :defaultValue="slideDatas.defaultValue"
      :min="slideDatas.slideMin"
      :tooltipVisible="false"
      :max="slideDatas.slideMax"
      @change="onChange"
    ></a-slider>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    slideDatas: {
      type: Object,
      default: () => {
        return {};
      },
    },
    change: {
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
    onChange(v) {
      this.$emit("change", v);
    },
    createElement() {
      const docum = document.querySelector(
        ".m-chfry-slider-container > .ant-slider > .ant-slider-handle"
      );
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
        ".m-chfry-slider-container > .ant-slider > .ant-slider-handle > .m-chfry-slider-leverage-number"
      );
      if (docum) {
        docum.innerHTML = v + "X";
      }
    },
  },
  watch: {
    slideDatas: {
      handler(v) {
        this.enterContext(v.slideValue);
      },
      deep: true,
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
