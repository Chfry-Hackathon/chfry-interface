<template>
  <section class="m-chfry-line-container">
    <div class="m-chfry-line-content-wrapper" ref="wrapper">
      <div class="m-chfry-line-content" ref="chfryLineContent">
        <div
          class="m-chfry-line-item-box"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <line-item title="Q1 2021" :dataItem="item"></line-item>
          <div class="m-chfry-line-arrow-box" v-if="index+1 !== dataList.length">
            <img src="../../../assets/home/375arrow.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LineItem from "./LineItem.vue";
import BScroll from "better-scroll";

export default {
  props: {
    dataList: {
      type: Array,
      default: [],
    },
  },
  components: {
    LineItem,
  },
  data() {
    return {
      limit: 750,
      defWidth: 370,
    };
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
      let width = this.dataList.length * this.defWidth;
      this.$refs.chfryLineContent.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
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

<style lang="scss" scope>
.m-chfry-line-container {
  width: 100%;
  .m-chfry-line-content-wrapper {
    .m-chfry-line-content {
      display: flex;
      .m-chfry-line-item-box {
        display: flex;
        align-items: center;
        width: 375px;
        .m-chfry-line-arrow-box {
          padding-left: 16px;
          display: flex;
          img {
            width: 55px;
            height: 37px;
          }
        }
      }
    }
  }
}
</style>
