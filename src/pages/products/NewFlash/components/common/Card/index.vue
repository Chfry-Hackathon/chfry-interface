<template>
  <div class="m-card-container" id="m_card_container" :style="styled">
    <div class="m-card-content">
      <div class="m-card-title">
        <span class="m-card-title-text">
          <slot name="title"></slot>
          <Popover v-if="item.popover">
            <slot name="popover"></slot>
          </Popover>
        </span>
      </div>
      <div class="m-card-number">
        <a-spin size="large" v-if="isLoading || item.isLoading" />
        <span v-else>
          <slot name="number"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Popover from "../Popover";
export default {
  name: "card-container",
  components: {
    Popover,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    styled: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile"]),
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./index.h5.scss";
</style>
