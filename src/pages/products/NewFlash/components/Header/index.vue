<template>
  <section class="m-chfry-flash-header-wrapper">
    <NewCheeseRewardsPopup
      :data="userReward"
      :isLoading="userRewardLoading"
      :dialogFlag="cheeseRewardsFlag"
      :handleClose="handleRewardsClose"
      :tabActiveStatus="tabActiveStatus"
      :handleTab="handleCheeseRewardsTab"
      :handleConfirm="handleCheeseRewardsClaim"
      title="CHEESE REWARDS DATA"
    />

    <WithdrawPopup
      :isLoading="isLoading"
      :dataLists="withdrawFDataLists"
      :dialogFlag="withdrawFlag"
      :handleClose="handleWithClose"
      :handleWithdraw="handleClickWithdraw"
      title="WITHDRAW FROM SMART ACCOUNT"
    />
    <FlashLoan :dialogFlag="dialogFlashloanFlag" :handleCloseDialog="handleCloseFlashloanDialog" />
    <div class="m-chfry-flash-header-content" v-show="isMobile">
      <section class="m-chfry-flash-content-title">
        <img :src="require('../../../../../assets/newFlash/title.svg')" alt="" />
      </section>

      <div class="m-chfry-flash-select-box">
        <a-select
          :default-value="positonDefType"
          style="width: 244px; height: 48px"
          @change="handleSelectChange"
          id="m_select_container"
        >
          <a-select-option value="2" class="m-chfry-select-option-item"> LONG </a-select-option>
          <a-select-option value="3" class="m-chfry-select-option-item"> SHORT </a-select-option>
        </a-select>
      </div>
      <div class="m-chfry-flash-try-flash-btn-box">
        <!-- <a-button
          class="m-chfry-flash-btn chr-btn m-chfry-flash-try-flash-btn"
          @click="handleTryFlash"
        >
          TRY FLASHLOAN
        </a-button> -->
      </div>
      <div class="m-chfry-flash-try-flash-btn-box">
        <a-button
          class="m-chfry-flash-btn chr-btn m-chfry-flash-try-flash-btn"
          @click="handleToleadeBoard"
        >
          LEADERBOARD
        </a-button>
      </div>
      <div class="m-chfry-flash-rewards">
        <ClaimReward
          :number="userTotalReward"
          :iconUrl="require('../../../../../assets/newFlash/cheese.svg')"
          :isClaim="false"
          @click="handleReward"
        />
      </div>
      <div class="m-chfry-flash-claim">
        <ClaimReward
          :iconUrl="require('../../../../../assets/newFlash/aave_icon.svg')"
          @click="handleClaim"
        />
      </div>
    </div>

    <div class="m-chfry-flash-header-content" v-show="!isMobile">
      <div class="m-chfry-flash-header-content-left">
        <div class="m-chfry-flash-select-box">
          <a-select
            :default-value="positonDefType"
            style="width: 244px; height: 48px"
            @change="handleSelectChange"
            id="m_select_container"
          >
            <a-select-option :value="1" class="m-chfry-select-option-item"> LONG </a-select-option>
            <a-select-option :value="2" class="m-chfry-select-option-item"> SHORT </a-select-option>
          </a-select>
        </div>
        <div class="m-chfry-flash-try-flash-btn-box">
          <!-- <a-button
            class="m-chfry-flash-btn chr-btn m-chfry-flash-try-flash-btn"
            @click="handleTryFlash"
          >
            TRY FLASHLOAN
          </a-button> -->
          <a-button
            class="m-chfry-flash-btn chr-btn m-chfry-flash-try-flash-btn"
            @click="handleToleadeBoard"
          >
            LEADERBOARD
          </a-button>
        </div>
        <div class="m-chfry-flash-try-flash-btn-box two">
          <!-- <a-button
            class="m-chfry-flash-btn chr-btn m-chfry-flash-try-flash-btn"
            @click="handleWithdraw"
          >
            WITHDRAW
          </a-button> -->
        </div>
      </div>
      <div class="m-chfry-flash-header-content-right">
        <div class="m-chfry-flash-reward-box">
          <ClaimReward
            :number="fixD(userTotalReward, 2)"
            :detailNumber="fixD(userTotalReward, 5)"
            :iconUrl="require('../../../../../assets/newFlash/cheese.svg')"
            :isClaim="false"
            @click="handleReward"
          />
        </div>
        <!-- <div class="m-chfry-flash-reward-data-btn-box">
          <ClaimReward
            :number="fixD(stkAAVEbalance, 2)"
            :detailNumber="fixD(stkAAVEbalance, 5)"
            :iconUrl="'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iR3JvdXAgMjcwMjEiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjkwNyIgeDI9Ii4xNjMiIHkxPSIuMjI3IiB5Mj0iLjg1MyIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2I2NTA5ZSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJlYmFjNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEyIiBmaWxsPSJ1cmwoI2EpIiBkYXRhLW5hbWU9IkVsbGlwc2UgOTkxIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE3LjI1MSAxNi43OGwtNC4wNTktOS44MDlhMS4wOTEgMS4wOTEgMCAwMC0xLjAxNy0uNzU1aC0uMzU5YTEuMDkxIDEuMDkxIDAgMDAtMS4wMTcuNzU1bC0xLjc2NiA0LjI3NEg3LjY5N2EuNzMxLjczMSAwIDAwLS43MjguNzI1di4wMWEuNzMxLjczMSAwIDAwLjcyOC43MjVoLjcxOEw2LjczIDE2Ljc4YS44Ni44NiAwIDAwLS4wNS4yNzguNzY3Ljc2NyAwIDAwLjIuNTQ3LjcuNyAwIDAwLjUzOS4yMDkuNzI5LjcyOSAwIDAwLjQxOS0uMTM5Ljg4NS44ODUgMCAwMC4yODktLjM2OGwxLjg1My00LjYwMWgxLjI4N2EuNzMxLjczMSAwIDAwLjcyOC0uNzI1di0uMDJhLjczMS43MzEgMCAwMC0uNzI4LS43MjVoLS42ODdsMS40MTUtMy41MjkgMy44NTkgOS42YS44ODUuODg1IDAgMDAuMjg5LjM2OC43MjkuNzI5IDAgMDAuNDE5LjEzOS43LjcgMCAwMC41MzktLjIwOS43NjcuNzY3IDAgMDAuMi0uNTQ3LjY1Ny42NTcgMCAwMC0uMDUtLjI3OHoiIGRhdGEtbmFtZT0iUGF0aCAyNDM0Ii8+PC9zdmc+'"
            @click="handleClaim"
          />
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ClaimReward from "../common/ClaimReward";
import WithdrawPopup from "../Popup/WithdrawPopup";
import NewCheeseRewardsPopup from "../Popup/newCheeseRewardsPopup";
import FlashLoan from "../../../tryFlash/index.vue";
import {
  SETCURRENTPOSITIONSTATUS,
  SETDSAACCOUNT,
  GETUSERREWARD,
  GETSTKAAVEBALANCE,
} from "../../../../../store/modules/dsa";
import {
  listLongToken,
  listShortToken,
  balanceOf,
  ethAddr,
  getTokenSymbolDecimal,
  withdrawFromDSA,
  getAccountAddress,
  isZeroAddr,
} from "../../../../../DSA/index";
import { convertBigNumberToNormal } from "../../../../../sdk/cheese-sdk/lib.utils";
import { fixD } from "../../../../../utils/common-method";
import {
  claimPositonReward,
  getLongAndShortStkAAVEReward,
  claimAllAaveStakeReward,
} from "../../../../../sdk/cheese-sdk/index";

export default {
  components: {
    ClaimReward,
    WithdrawPopup,
    NewCheeseRewardsPopup,
    FlashLoan,
  },
  data() {
    return {
      fixD,
      isLoading: false,
      withdrawFDataLists: [],
      tabActiveStatus: 0,
      withdrawFlag: false,
      dialogFlashloanFlag: false,
      cheeseRewardsFlag: false,
      claimData: {
        picUrl: require("../../../../../assets/tool/FRIES.svg"),
      },
      list: [
        // {
        //   isBorder: true,
        //   title: "ESTIMATED REWARDS",
        //   //   time: "2021.7.10 - 2021.7.24",
        //   amuount: "0000.000",
        //   buttonText: "CLAIM",
        //   url: require("../../../../../assets/icon/CHEESE.svg"),
        //   loading: false,
        //   disabled: false,
        //   isShowButton: false,
        // },
        // {
        //   isBorder: false,
        //   title: "CLAIMABLE REWARDS",
        //   time: "2021.7.10 - 2021.7.24",
        //   amuount: "0000.000",
        //   buttonText: "CLAIM",
        //   url: require("../../../../../assets/icon/CHEESE.svg"),
        //   loading: false,
        //   disabled: false,
        //   isShowButton: true,
        // },
        // {
        //   isBorder: false,
        //   title: "CLAIMABLE REWARDS",
        //   time: "2021.7.10 - 2021.7.24",
        //   amuount: "0000.000",
        //   buttonText: "CLAIM",
        //   url: require("../../../../../assets/icon/CHEESE.svg"),
        //   loading: false,
        //   disabled: false,
        //   isShowButton: true,
        // },
        // {
        //   isBorder: false,
        //   title: "CLAIMABLE REWARDS",
        //   time: "2021.7.10 - 2021.7.24",
        //   amuount: "0000.000",
        //   buttonText: "CLAIM",
        //   url: require("../../../../../assets/icon/CHEESE.svg"),
        //   loading: false,
        //   disabled: false,
        //   isShowButton: true,
        // },
      ],
    };
  },
  mounted() {
    this.initial();
  },
  methods: {
    handleToleadeBoard() {
      this.$router.push({ path: "/leaderBoard" });
    },
    initial() {
      this.$store.dispatch(`dsa/${SETCURRENTPOSITIONSTATUS}`, this.positonDefType);
      this.$store.dispatch(`dsa/${GETSTKAAVEBALANCE}`);
      this.$bus.on("CURRENTPOSTION", (value) => {
        this.longShortActive = value;
      });
    },
    // async getStkAAVE() {
    //   const [account1, account2] = await this.getLongAndShortAccount();
    //   const addr1 = isZeroAddr(account1) ? undefined : account1;
    //   const addr2 = isZeroAddr(account2) ? undefined : account2;
    //   const res = await getLongAndShortStkAAVEReward(addr1, addr2);
    //   this.stkAAVEbalance = fixD(res, 2);
    // },
    // async getLongAndShortAccount() {
    //   return await Promise.all([getAccountAddress(1), getAccountAddress(2)]);
    // },
    handleClickWithdraw(v) {
      if (this.dsaAccount) {
        withdrawFromDSA(v.address, Number(v.amuount), this.dsaAccount);
      } else {
        this.$message.error({
          content: "Please create an account first",
          key: "ERROR",
          duration: 2,
        });
      }
    },
    async getListToken() {
      const datas = this.isActive ? await listLongToken() : await listShortToken();
      if (datas && datas.length > 0) {
        let arr = [];
        for (let i = 0; i < datas.length; i++) {
          let item = datas[i];
          const isETH = item.symbol === "ETH";
          const banance = await balanceOf(isETH ? null : item.token);
          const pic = this.imgWhiteList.includes(item.symbol) ? item.symbol : "newLogo";
          const decimal = await getTokenSymbolDecimal(item.token);
          const amount = convertBigNumberToNormal(banance, decimal);
          arr.push({
            amount: fixD(amount, 4),
            amountDetail: amount,
            symbol: item.symbol,
            address: item.token,
            url: require(`../../../../../assets/newFlash/${pic}.svg`),
            disabled: Number(banance) > 0 ? false : true,
          });
        }
        this.withdrawFDataLists = arr;
      }
      this.isLoading = false;
    },
    handleCloseFlashloanDialog() {
      this.dialogFlashloanFlag = false;
    },
    handleSelectChange(v) {
      let type = v === 1 ? "long" : "short";
      this.$router.push({ path: `/flash/${type}` });
      this.$store.dispatch(`dsa/${SETCURRENTPOSITIONSTATUS}`, Number(v));
      this.$store.dispatch(`dsa/${SETDSAACCOUNT}`, v);
    },
    handleTryFlash() {
      this.dialogFlashloanFlag = true;
    },
    handleRewardData() {},
    handleWithdraw() {
      this.isLoading = true;
      this.getListToken();
      this.withdrawFlag = true;
    },
    handleWithClose() {
      this.withdrawFlag = false;
    },
    handleClaim(v) {
      Promise.all([getAccountAddress(1), getAccountAddress(2)]).then((result) => {
        const [account1, account2] = result;
        console.log(result);
        let arr = [];
        !isZeroAddr(account1) && arr.push(account1);
        !isZeroAddr(account2) && arr.push(account2);
        console.log(arr);
        claimAllAaveStakeReward(arr);
      });
    },
    handleReward(v) {
      if (this.account && this.isLogin) {
        this.cheeseRewardsFlag = true;
        this.$store.dispatch(`dsa/${GETUSERREWARD}`, this.account);
      } else {
        this.$message.error({
          content: `Please connect to account`,
          key: "ERROR",
          duration: 2,
        });
      }
    },
    handleRewardsClose() {
      this.cheeseRewardsFlag = false;
    },
    handleCheeseRewardsTab(v) {
      this.tabActiveStatus = v;
      if (v === 0 && this.account && this.isLogin) {
        this.cheeseRewardsFlag = true;
        this.$store.dispatch(`dsa/${GETUSERREWARD}`, this.account);
      } else if (v === 1 && this.account && this.isLogin) {
        this.cheeseRewardsFlag = true;
        this.$store.dispatch(`dsa/${GETUSERREWARD}`, this.account);
      }
    },
    handleCheeseRewardsClaim(v) {
      v.loading = true;
      claimPositonReward(v, (code) => {
        if (code == 1) {
          this.$store.dispatch(`dsa/${GETUSERREWARD}`, this.account);
        } else {
          v.loading = false;
        }
      });
    },
  },
  watch: {
    isLoginAndAccount: {
      handler(v) {
        if (v) {
          this.$store.dispatch(`dsa/${GETUSERREWARD}`, this.account);
        }
      },
      deep: true,
    },
    dsaAccount(v) {
      if (v) {
        this.$store.dispatch(`dsa/${GETSTKAAVEBALANCE}`);
      }
    },
  },
  computed: {
    ...mapGetters([
      "isLogin",
      "isMobile",
      "dsaAccount",
      "account",
      "imgWhiteList",
      "userReward",
      "userRewardLoading",
      "userTotalReward",
      "stkAAVEbalance",
    ]),
    isLoginAndAccount() {
      if (this.account && this.isLogin) {
        return true;
      }
      return false;
    },
    isActive() {
      return this.positonDefType === 1;
    },
    positonDefType() {
      const routeParams = this.$route.params && this.$route.params.id ? this.$route.params.id : 1;
      const type = routeParams === "long" ? 1 : this.$route.params.id === "short" ? 2 : 1;
      return type;
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.m-chfry-select-option-item {
  height: 40px;
  line-height: 31px;
}
.m-chfry-select-option-item:hover:not(.ant-select-dropdown-menu-item-disabled) {
  background-color: #f499ad !important;
}
@import "./index_375.scss";
@import "./index_920.scss";
@import "./index_1065.scss";
@import "./index_1120.scss";
@import "./index_1280.scss";
@import "./index_1440.scss";
</style>
