<template>
  <section class="list-item-container" :class="item.isBorder ? 'border' : ''">
    <div class="list-item-content">
      <div class="list-item-left">
        <div class="list-item-title">{{ item.title }}</div>
        <div class="list-item-time" v-if="item.time">{{ item.time }}</div>
        <div class="list-item-symbol">
          <span class="amount">
            <Tooltip
              :data="fixD(convertBigNumberToNormal(item.amount), 2)"
              :detail="fixD(convertBigNumberToNormal(item.amount), 5)"
            />
            <!-- {{ fixD(convertBigNumberToNormal(item.amount), 2) }} -->
          </span>
          <img :src="item.url" alt="" />
        </div>
      </div>
      <div class="list-item-right">
        <a-button
          v-if="item.isShowButton"
          :loading="item.loading"
          :disabled="item.disabled"
          class="chr-c-btn"
          @click="handleConfirm(item)"
        >
          {{ item.buttonText }}
        </a-button>
      </div>
    </div>
  </section>
</template>

<script>
import { convertBigNumberToNormal } from "../../../../../../sdk/cheese-sdk/lib.utils";
import { fixD } from "../../../../../../utils/common-method";
import Tooltip from "../Tooltip";

export default {
  components: {
    Tooltip,
  },
  data() {
    return {
      convertBigNumberToNormal,
      fixD,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 确认按钮
    handleConfirm: {
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
</style>
