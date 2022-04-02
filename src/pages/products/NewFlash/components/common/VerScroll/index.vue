<template>
  <div class="m-chfry-flash-across-scroll-container" ref="scroll_container">
    <div
      class="m-chfry-flash-across-scroll-content"
      ref="scroll_content"
      :style="styled"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    styled: {
      type: Object,
      default: () => {
        return {};
      },
    },
    defWidth: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        if (timer) {
          clearTimeout(timer);
          this.verScroll();
        }
      }, 0);
    });
  },
  methods: {
    verScroll() {
      let width = this.defWidth;
      this.$refs.scroll_content.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll_container, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical",
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.m-chfry-flash-across-scroll-content {
  display: flex;
}
</style>
