<template>
  <div class="m-oven-entry-v2-container" v-if="isTransformV2">
    <div class="m-oven-entry-v2-content">
      <div class="m-oven-entry-v2-title">fUSD BALANCE IN OVEN V1</div>
      <div class="m-oven-entry-v2-number-box">
        <div class="m-oven-entry-v2-number-content">
          <span class="m-oven-entry-v2-total">
            <a-tooltip class="t1">
              <template slot="title">
                {{ fusd }}
              </template>
              {{ fusd }}
            </a-tooltip>
          </span>
          <span class="m-oven-entry-v2-icon-box">
            <img
              :src="require('../../../../../assets/ovenV2/fusd.svg')"
              alt=""
            />
          </span>
        </div>
      </div>
      <div class="m-oven-entry-v2-button">
        <a-button
          class="chr-c-btn"
          :loading="loading"
          @click="handleMigrateToOvenV2"
        >
          MIGRATE TO OVEN V2
        </a-button>
      </div>
      <div class="m-oven-entry-v1-button">
        <span @click="handleToOvenV1">OPEN OVEN V1</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { toFixed4 } from "../../../../../utils/tools";
import BigNumber from "bignumber.js";

import {
  migrationOven,
  isNeedmigrationOven,
  getTokenAddress,
  getOvenPoolInfo,
} from "../../../../../sdk/cheese-sdk/index";

export default {
  data() {
    return {
      isTransformV2: false,
      fusd: "",
      loading: false,
      index: 0,
      migrateToOvenV2: ["DAI", "USDT", "USDC"],
    };
  },
  methods: {
    async handleMigrateToOvenV2() {
      const migrateToOvenV2 = this.migrateToOvenV2;
      if (this.index <= migrateToOvenV2.length - 1) {
        this.loading = true;
        migrationOven(migrateToOvenV2[this.index], async (status) => {
          // const isNext =
          //   status.exchange === 1 && status.claim === 1 && status.unstake === 1;
          const isNext = status.claim === 1 && (status.exchangeAndClaim === 1 || status.unstake === 1 || status.all === 1);
          if (isNext) {
            this.loading = false;
            this.index += 1;
            this.handleMigrateToOvenV2();
          }
        });
      } else {
        this.index = 0;
        this.initialData();
      }
    },
    async isOvenV2Migration() {
      const newMigrateToOvenV2 = [].concat(this.migrateToOvenV2);
      let arr = [];
      newMigrateToOvenV2.forEach((tokenName) => {
        arr.push(isNeedmigrationOven(tokenName));
      });
      return await Promise.all(arr);
    },

    handleToOvenV1() {
      this.$router.push({ path: "/ovenV1" });
    },
    sumArr(arr) {
      return arr.reduce(
        (pre, cur) => new BigNumber(pre).plus(new BigNumber(cur)).toFixed(),
        0
      );
    },
    async getFUSDBanance() {
      const newMigrateToOvenV2 = [].concat(this.migrateToOvenV2);
      let arr = [];
      newMigrateToOvenV2.forEach((tokenName) => {
        const tokenAddress = getTokenAddress(tokenName);
        arr.push(getOvenPoolInfo(tokenAddress, false, true));
      });
      const res = await Promise.all(arr);
      return this.sumArr(res);
    },
    async isShowMigrateV2Module() {
      const res = await this.isOvenV2Migration();
      return res.some(
        (item) =>
          item.isExchangeTrans || item.isClaimTrans || item.isUnstakeTrans
      );
    },
    async callGetFUSDBanance() {
      this.fusd = toFixed4(await this.getFUSDBanance());
    },
    async initialData() {
      if (this.isLogin) {
        this.isTransformV2 = await this.isShowMigrateV2Module();
        if (this.isTransformV2) {
          await this.callGetFUSDBanance();
        }
      }
    },
  },
  watch: {
    account() {
      this.initialData();
    },
  },
  mounted() {
    this.initialData();
  },
  computed: {
    ...mapGetters(["isLogin", "account", "curOvenAddress", "isMobile"]),
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  .m-oven-entry-v2-container {
    margin-top: 32px;
  }
}
.m-oven-entry-v2-container {
  width: 294px;
  height: 248px;
  padding-left: 10px;
  padding-bottom: 10px;
  background-image: url("../../../../../assets/ovenV2/entryV2_bg.svg");
  -webkit-background-size: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .m-oven-entry-v2-content {
    width: 100%;
    height: 100%;
    .m-oven-entry-v2-title {
      padding-top: 20px;
      padding-bottom: 14px;
      font-family: Arial Black;
      font-style: normal;
      font-weight: 900;
      font-size: 16px;
      color: #000000;
    }
    .m-oven-entry-v2-number-box {
      padding-bottom: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .m-oven-entry-v2-number-content {
        display: flex;
        align-items: center;
        .m-oven-entry-v2-total {
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 22px;
          line-height: 31px;
          color: #000000;
        }
        .m-oven-entry-v2-icon-box {
          display: inline-block;
          width: 42px;
          height: 42px;
          padding-left: 12px;
        }
      }
    }
    .m-oven-entry-v2-button {
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-around;
    }
    .m-oven-entry-v1-button {
      width: 100%;
      text-align: center;
      font-family: Arial Black;
      font-style: normal;
      font-weight: 900;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
      span {
        border-bottom: 1px dashed #000000;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
