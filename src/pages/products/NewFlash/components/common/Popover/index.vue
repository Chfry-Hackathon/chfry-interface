<template>
  <a-popover
    class="chfry_flash_popover"
    id="chfry_flash_popover"
    overlayClassName="m-chfry-flash-popover-container"
    placement="bottomRight"
    :trigger="isMobile ? 'click' : 'hover'"
  >
    <template slot="content">
      <slot></slot>
    </template>
    <img :style="styled" :src="require('../../../../../../assets/newFlash/hint.svg')" alt="" />
  </a-popover>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    styled: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(["isMobile"]),
  },
};
</script>

<style lang="scss">
.chfry_flash_popover {
  cursor: pointer;
}
.m-card-title-text {
  img {
    cursor: pointer;
  }
}
.popover {
  img {
    cursor: pointer;
  }
}
@media screen and (max-width: 750px) {
  .m-chfry-flash-popover-container {
    .ant-popover-arrow {
      display: none !important;
    }
    .ant-popover-inner {
      background-color: transparent !important;
      box-shadow: none !important;
    }
    .ant-popover-inner-content {
      position: relative;
      background-color: transparent !important;
      max-width: 300px;
      padding-top: 20px;
      padding-left: 25px;
      padding-bottom: 25px;
      padding-right: 20px;
      background-image: url("../../../../../../assets/newFlash/hint_bg.svg#svgView(preserveAspectRatio(none))");
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .popover-bg {
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
      }
    }
  }
}
@media screen and (min-width: 751px) {
  .m-chfry-flash-popover-container {
    .ant-popover-arrow {
      display: none !important;
    }
    .ant-popover-inner {
      background-color: transparent !important;
      box-shadow: none !important;
    }
    .ant-popover-inner-content {
      position: relative;
      background-color: transparent !important;
      max-width: 335px;
      padding-top: 20px;
      padding-left: 25px;
      padding-bottom: 25px;
      padding-right: 20px;
      background-image: url("../../../../../../assets/newFlash/hint_bg.svg#svgView(preserveAspectRatio(none))");
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .popover-bg {
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
      }
    }
  }
}
</style>
