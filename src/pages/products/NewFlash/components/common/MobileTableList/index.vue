<template>
  <div class="m-mobile-table-list-container">
    <div class="m-mobile-table-list-content">
      <header class="m-mobile-table-list-header">
        <div v-for="(item, index) in columns" :key="index" :style="item.mStyle">
          {{ item.title }}
        </div>
      </header>
      <!-- v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" -->
      <main class="m-mobile-table-list-main" :class="setClass">
        <div
          v-for="(ite, ind) in dataSource"
          :key="ind"
          class="m-mobile-table-list-item-box"
          :style="ind === dataSource.length - 1 ? 'border:0' : ''"
        >
          <div class="item" v-for="(item, index) in columns" :key="index" :style="item.mStyle">
            <slot :name="item.scopedSlots.customRender" :data="ite"></slot>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    setClass() {
      const classBase = `m-list-container-`;
      return `${classBase}${this.size || "sm"}`;
    },
  },
  props: {
    size: {
      type: String,
      default: () => {
        return "sm";
      },
      validator: (v) => {
        return ["sm", "big"].indexOf(v) !== -1;
      },
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dataSource: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.m-mobile-table-list-item-box {
  .item {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 40px;
    /* span {
      display: inline-block;
      width: 100%;
      line-height: 40px;
      height: 100%;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    } */
  }
}

.m-mobile-table-list-container {
  width: 100%;
  background: #f499ad;
  .m-mobile-table-list-content {
    width: 100%;
    .m-mobile-table-list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-top: 6px;
      padding-bottom: 6px;
      font-family: Arial Black;
      font-style: normal;
      font-weight: 900;
      font-size: 10px;
      color: #000000;
      border-bottom: 1px solid #000000;
      div {
        /* transform: scale(0.8); */
        flex-shrink: 1;
      }
    }
    .m-mobile-table-list-main {
      width: 100%;
      height: 330px;
      overflow-x: hidden;
      overflow-y: scroll;
      &.m-list-container-sm {
        height: 300px;
      }
       &.m-list-container-big {
        height: 330px;
      }
      .m-mobile-table-list-item-box {
        height: 40px;
        border-bottom: 1px solid #000000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
            height: 40px;
          flex-shrink: 1;
        }
      }
    }
  }
}
</style>
