<template>
  <div class="m-list-container-box" :style="styled" :class="setClass">
    <div class="m-list-container-content">
      <div v-if="isLoading" class="loading-box" :class="setLoadingClass">
        <loading-rows>
          <div v-for="(items, index) in loadingNumber" :key="index"></div>
        </loading-rows>
      </div>
      <template v-else>
        <slot></slot>
      </template>
    </div>
    <div class="direction_right" v-if="isMobile && isDirection">
      <img
        :src="require('../../../../../../assets/newFlash/direction_right.svg')"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import LoadingRows from "../../../../../../components/LoadingRows.vue";
import { mapGetters } from "vuex";

export default {
  name: "list-container",
  components: {
    LoadingRows,
  },
  props: {
    styled: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDirection: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: () => {
        return "sm";
      },
      validator: (v) => {
        return ["sm", "big"].indexOf(v) !== -1;
      },
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile"]),
    setClass() {
      const classBase = `m-list-container-`;
      return `${classBase}${this.size || "sm"}`;
    },
    setLoadingClass() {
      const classBase = `m-loading-box-`;
      return `${classBase}${this.size || "sm"}`;
    },
    loadingNumber() {
      if (!this.isMobile) {
        return this.size === "sm" ? 18 : 20;
      }
      return this.size === "sm" ? 10 : 14;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./index.h5.scss";
</style>
