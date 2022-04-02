<template>
  <Dialog :dialogFlag="dialogFlag" :title="title" @click="handleClose(dialogFlag)">
    <section class="m-cheese-rewards-container">
      <div class="m-cheese-rewards-content">
        <!-- <div class="m-cheese-rewards-tab">
          <span :class="isActive ? 'active' : ''" @click="handleTab(0)">FLASH LEVERAGE</span>
          <span :class="!isActive ? 'active' : ''" @click="handleTab(1)">FLASH LOAN</span>
        </div> -->
        <div class="m-cheese-loading" v-if="isLoading">
          <loading-rows>
            <div v-for="(items, index) in loadingNumber" class="loading-item" :key="index"></div>
          </loading-rows>
        </div>
        <div v-else class="m-cheese-list" :class="tabActiveStatus === 1 ? 'right' : 'left'">
          <template v-if="data && data.length > 0">
            <ListItem
              :item="item"
              v-for="(item, index) in data"
              :key="index"
              :handleConfirm="handleConfirm"
            />
          </template>
          <div v-else class="m-no-data">No Data</div>
        </div>
      </div>
    </section>
  </Dialog>
</template>

<script>
import Dialog from "../../common/Dialog";
import ListItem from "../../common/ListItem";
import LoadingRows from "../../../../../../components/LoadingRows.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Dialog,
    ListItem,
    LoadingRows,
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile"]),
    isActive() {
      return this.tabActiveStatus === 0;
    },
    loadingNumber() {
      if (this.isMobile) {
        return 10;
      }
      return 8;
    },
  },
  props: {
    isLoading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    tabActiveStatus: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // popup title
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    // dialog 开关
    dialogFlag: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    handleTab: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    // 确认按钮
    handleConfirm: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    // dialog 关闭事件
    handleClose: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.h5.scss";
@import "./index.scss";

.m-loading-wrapper {
  .loading-item {
    animation: loadingAnimation 1.5s infinite;
    animation-fill-mode: both;
    background: linear-gradient(
        to left,
        rgb(247, 248, 250) 25%,
        rgb(237, 238, 242) 50%,
        rgb(247, 248, 250) 75%
      )
      0% 0% / 400%;
    background-size: 400%;
    border-radius: 12px;
    height: 2.4em;
    will-change: background-position;
  }
}

.m-cheese-list {
  &.left {
    animation: slideInLeft 0.3s linear forwards;
  }
  &.right {
    animation: slideInRight 0.3s linear forwards;
  }
}
@keyframes loadingAnimation {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
