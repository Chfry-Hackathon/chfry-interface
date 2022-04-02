<template>
  <Dialog :dialogFlag="dialogFlag" :title="title" @click="handleClose(dialogFlag)">
    <div class="m-withdraw-container">
      <div class="m-withdraw-content">
        <div class="m-withdraw-loading" v-if="isLoading">
          <loading-rows>
            <div v-for="(items, index) in loadingNumber" class="loading-item" :key="index"></div>
          </loading-rows>
        </div>
        <ListItem
          v-else
          :item="item"
          v-for="(item, index) in dataLists"
          :key="index"
          :handleWithdraw="handleWithdraw"
        />
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "../../common/Dialog";
import ListItem from "./ListItem.vue";
import { mapGetters } from "vuex";
import LoadingRows from "../../../../../../components/LoadingRows.vue";

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
        return 12;
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
    dataLists: {
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
        return true;
      },
    },
    handleWithdraw: {
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
@keyframes loadingAnimation {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>
