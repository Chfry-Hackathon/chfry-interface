<template>
  <Dialog title="ENTER AMOUNT TO LOAN" :dialogFlag="dialogFlag" @click="handleCloseDialog">
    <div class="dialog-desc-title">
      Enter the amount of stablecoin
      <br />
      to flash loan
    </div>
    <symbol-select
      :selectData="flashLoanData.pools"
      :currentSymbol="flashLoanData.currentSymbol"
      @click="handleSymbolSelect"
    >
      <input type="number" maxlength="25" placeholder="0.00" v-model="inputAmount" />
    </symbol-select>
    <div class="dialog-confirm-btn-box t2">
      <a-button
        class="chr-btn chr-btn7 m-submit"
        :disabled="isTryflashLoading"
        :loading="isTryflashLoading"
        @click="handleConfirm"
      >
        {{ showText }}
      </a-button>
    </div>
  </Dialog>
</template>

<script>
import FlashItem from "./commponents/FlashItem";
import { toFixed4, toFixed0, trace } from "../../../utils/tools";
import ClaimItem from "./commponents/ClaimItem";
import FlashReward from "./commponents/FlashReward";
import {
  getTokenAddress,
  flashLoanClaimed,
  flashLoanList,
  maxFlashLoan,
  getPoolAllowance,
  getTokenSymbol,
  getFlashLoanTokenAddress,
  getFlashLoanDestinaAddress,
  approvePoolToken,
  tryFlashloan,
  getFlashPoolReward,
  getFlashLists,
} from "../../../sdk/cheese-sdk";
import { mapGetters } from "vuex";
import Dialog from "../../../components/Dialog.vue";
import SymbolSelect from "./commponents/SymbolSelect/index.vue";
import { getBalanceToken } from "../../../api/user";
import global from "../../../common/Global.vue";
import BigNumber from "bignumber.js";

export default {
  components: { ClaimItem, FlashItem, Dialog, SymbolSelect, FlashReward },
  props: {
    dialogFlag: {
      default: false,
      type: Boolean,
    },
    handleCloseDialog: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  data() {
    return {
      Rate: global.poundage,
      isTryflashLoading: false,
      inputAmount: "",
      flashLoanData: {
        pools: [
          {
            index: 1,
            symbol: "USDC",
            address: "",
            amount: 0,
            url: require("../../../assets/flash/usdc.svg"),
          },
          {
            index: 0,
            symbol: "USDT",
            address: "",
            amount: 0,
            url: require("../../../assets/flash/usdt.svg"),
          },
          {
            index: 2,
            symbol: "DAI",
            address: "",
            amount: 0,
            url: require("../../../assets/flash/dai.svg"),
          },
        ],
        currentSymbol: {
          index: 1,
          symbol: "USDC",
          address: "",
          amount: 0,
          url: require("../../../assets/flash/usdc.svg"),
        },
        currentAllowance: 0,
      },
      isLoading: true,
      claims: [
        {
          title: "PERIOD",
          time: "26.05.2021 - 26.05.2021",
          text1: "CHEESE REWARDS",
          text2: "FLASH LOAN",
          amount1: 0,
          amount2: 0,
        },
      ],
      rewardDatas: [],
      loans: [
        {
          text: "USDC Available for  <br>FLASH LOAN",
          symbol: "USDC",
          address: "",
          amount: 0,
        },
        {
          text: "USDT Available for  <br>FLASH LOAN",
          symbol: "USDT",
          address: "",
          amount: 0,
        },
        {
          text: "DAI Available for  <br>FLASH LOAN",
          symbol: "DAI",
          address: "",
          amount: 0,
        },
      ],
      totalClaimed: {
        text: "TOTAL CHEESE CLAIMED",
        symbol: "CHEESE",
        address: "",
        amount: 0,
      },
    };
  },
  methods: {
    async handleFlashLoan() {
      if (!this.isLogin) return;
      this.isTryflashLoading = true;
      if (Number(this.inputAmount) <= 0) {
        this.$message.error("Amount cannot be less than zero");
        this.isTryflashLoading = false;
        return;
      }

      const address = getTokenAddress(this.flashLoanData.currentSymbol.symbol);
      const banance = await getBalanceToken(address);
      if (Number(banance) < Number(this.inputAmount * this.Rate)) {
        this.$message.error(
          `No enough ${this.flashLoanData.currentSymbol.symbol} for flash loan fee.`
        );
        this.isTryflashLoading = false;
        return;
      }
      tryFlashloan(this.flashLoanData.currentSymbol, this.inputAmount, (code, hash) => {
        if (code == 1) {
          this.initialFlashLoanData();
        }
        if (code >= 1) {
          this.isTryflashLoading = false;
        }
      });
    },
    handleConfirm() {
      this.isApprove ? this.symbolApprove() : this.handleFlashLoan();
    },
    handleSymbolSelect(item) {
      this.flashLoanData.currentSymbol = item;
      this.initialFlashLoanData();
    },
    symbolApprove() {
      if (!this.isLogin) return;
      this.isTryflashLoading = true;
      const currentSymbolAddress = getFlashLoanTokenAddress(
        this.flashLoanData.currentSymbol.symbol
      );
      const destina = getFlashLoanDestinaAddress();
      approvePoolToken(currentSymbolAddress, destina, "flashloan", (code, hasg) => {
        this.isTryflashLoading = false;
        if (code == 1) {
          this.initialFlashLoanData();
        }
        if (code >= 1) {
          this.isTryflashLoading = false;
        }
      });
    },
    async initialFlashLoanData() {
      if (!this.isLogin) return;
      this.isTryflashLoading = true;
      const destina = getFlashLoanTokenAddress(this.flashLoanData.currentSymbol.symbol);
      const currentSymbolAddress = getFlashLoanDestinaAddress();
      const allowance = await getPoolAllowance(currentSymbolAddress, destina, "flashloan");
      this.flashLoanData.currentAllowance = toFixed4(allowance);
      this.isTryflashLoading = false;
    },
    openPage(value) {
      if (value == 0) {
        this.checkInfo();
      } else {
        window.open("http://192.168.3.58:8080/#/flash");
      }
    },

    toClaim(item) {
      trace("toClaim-item", item);
      item.isloading = true;
      flashLoanClaimed(item.index, (code, hash) => {
        trace("toClaim-", code, hash);

        if (code >= 1) {
          item.isloading = false;
        }
        if (code == 1) {
          item.claimed = true;
        }
      });
    },
    sumArr(arr) {
      return arr.reduce(
        (pre, cur) => {
          return {
            amount: new BigNumber(pre.amount).plus(new BigNumber(cur.amount)).toFixed(),
          };
        },
        { amount: 0 }
      )["amount"];
    },
    filterUserTradingVolume(arr) {
      const userList = arr.filter((i) => i.user === this.account);
      if (!userList[0] || userList[0].list.length <= 0) {
        return 0;
      }
      return this.sumArr(userList[0].list);
    },
    async getFlashPoolRewardAllRewards() {
      return await getFlashPoolReward();
    },
    async getFlashAllLists() {
      return await getFlashLists();
    },
    // total rewards * trading volume of user / total trading volume.
    formulaToCalculate(totalRewards, tradingVolume, totalTrading) {
      return new BigNumber(totalRewards)
        .times(new BigNumber(tradingVolume))
        .div(new BigNumber(totalTrading))
        .toFixed();
    },
    async rewardDatasInitial() {
      const data = [];
      const totalRewards = await this.getFlashPoolRewardAllRewards();
      const result = await this.getEstimatedRewards();

      if (totalRewards) {
        data.push({
          title: "TOTAL REWARDS",
          reward: totalRewards,
        });
      }
      if (result) {
        data.push({
          title: "ESTIMATED REWARDS FOR THIS EPOCH",
          reward: result,
        });
      }
      this.rewardDatas = data;
    },
    // estimated rewards
    async getEstimatedRewards() {
      const totalRewards = await this.getFlashPoolRewardAllRewards();
      const lists = await this.getFlashAllLists();
      const totalTradingVolume = this.sumArr(lists);
      const userTradingVolume = this.filterUserTradingVolume(lists);
      const result = this.formulaToCalculate(totalRewards, userTradingVolume, totalTradingVolume);
      return result;
    },
    async checkInfo() {
      if (this.isLogin) {
        this.isLoading = true;
        await this.rewardDatasInitial();
        let res = await maxFlashLoan();
        trace("checkInfo-res=", res);
        for (var key in res.data) {
          let obj = this.loans.find((item) => {
            return item.symbol == key;
          });
          if (obj) {
            obj.amount = toFixed0(res.data[key]);
          }
        }

        this.totalClaimed.amount = toFixed4(res.data.totalCheeseClaimed);

        let res2 = await flashLoanList(0, 500);
        this.claims = [];
        res2.data.map((item) => {
          if (item.claimed == false) {
            item.isloading = false;
            item.title = "PERIOD";
            this.claims.push(item);
          }
        });
        trace("flashLoanList-200", res2);
        this.isLoading = false;
      }
    },
  },
  watch: {
    inputAmount(a) {
      let newValue = String(a).replace(/[^0-9\.-]+/g, "");
      this.inputAmount = newValue;
      this.initialFlashLoanData();
    },
    account() {
      this.checkInfo();
      this.initialFlashLoanData();
    },
    config() {
      this.checkInfo();
    },
  },
  computed: {
    ...mapGetters(["isLogin", "account", "config", "isMobile"]),
    isApprove() {
      const amount = Number(this.flashLoanData.currentAllowance);
      return amount <= 0;
    },
    showText() {
      return this.isApprove ? "Approve" : "CONFIRM";
    },
    poundage() {
      return Number(this.inputAmount) * this.Rate;
    },
  },

  mounted() {
    this.initialFlashLoanData();
    this.checkInfo();
  },
};
</script>
<style lang="scss" scoped>
@import "./index_375.scss";
@import "./index_1024.scss";
@import "./index_1280.scss";
@import "./index_1440.scss";

.m-submit {
  position: relative;
  .loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}

.dialog-desc-title {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 20px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;

  text-align: center;

  color: #171717;
}
.dialog-confirm-btn-box {
  padding-top: 91px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .dialog-confirm-btn {
    width: 148px;
    height: 49px;
    background-image: url("../../../assets/flash/confirmbtn.svg");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    font-family: Arial Black;
    font-style: normal;
    line-height: 44px;
    text-align: center;
    font-weight: 900;
    font-size: 16px;
    color: #171717;
    cursor: pointer;
  }
}
</style>
