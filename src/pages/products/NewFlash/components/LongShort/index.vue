<template>
  <list-container :isLoading="isLoading" size="big" :styled="styled">
    <div class="m-chfry-wrapper">
      <ShadeBox v-if="isShade"></ShadeBox>
      <div class="m-chfry-flash-list-left-content">
        <SettingPopup
          :isShowEstimated="false"
          title="SETTINGS"
          :dialogFlag="settingFlag"
          :handleClose="handlePopupCloseSetting"
          :handleConfirm="handlePopupConfirmSetting"
          :handlePropsInputChange="handlePropsInputChange"
          :inputData="settingToleranceInputData"
        />
        <div class="m-chfry-flash-list-left-btn-box">
          <span>
            <!-- <div style="width:0px;height:44px"></div> -->
            <!-- <a-button
              class="m-chfry-flash-btn chr-btn m-chfry-long-btn"
              :class="isActive ? 'm-chfry-flash-btn-active' : ''"
              @click="handleLongShort(0)"
            >
              LONG
            </a-button>
            <a-button
              class="m-chfry-flash-btn chr-btn m-chfry-short-btn"
              :class="!isActive ? 'm-chfry-flash-btn-active' : ''"
              @click="handleLongShort(1)"
            >
              SHORT
            </a-button> -->
          </span>
        </div>
        <div
          class="m-chfry-flash-long-short-content"
          :class="longShortActive === 1 ? 'right' : 'left'"
        >
          <div class="m-chfry-flash-price">
            <SuffixInput
              :isCountTo="true"
              defaultValue="PRICE"
              disabled
              :price="tokenPrice"
              :animationTrans="animationTrans"
              :iconUrl1="iconUrl1"
              :iconUrl2="iconUrl2"
            >
            </SuffixInput>
          </div>

          <div class="m-chfry-flash-amount-box">
            <div class="m-chfry-flash-amount">
              <span class="amount">AMOUNT</span>
              <span></span>
            </div>
            <SelectInput
              :handleSelectChange="handleLeverageSelectChange"
              :handleInputChange="handleLeverageInputChange"
              :selectData="leverageSelectDatas"
              :inputData="leverageInputDatas"
            />
            <div class="m-chfry-flash-amount-apy">
              {{ showAPYText.leverage }}:&nbsp;
              <a-spin size="large" v-if="apyLoading" />
              <span v-else> {{ apyDatas.leverage }} %</span>
              &nbsp;
              <Popover :styled="{ width: '15px' }"> {{ apyHint.leverage }} </Popover>
            </div>
            <!-- <div class="m-chfry-flash-amount">
              <span class="amount">AMOUNT</span>
              <span class="banance">Balance:&nbsp;{{ currentBanance }}</span>
            </div>
            <SelectInput
              :selectData="selectDatas"
              :inputData="inputDatas"
              :handleInputChange="handleInputChange"
              :handleSelectChange="handleSelectChange"
            />
            <div class="m-chfry-flash-amount-apy">
              {{ showAPYText.principle }}:&nbsp;
              <a-spin size="large" v-if="apyLoading" />
              <span v-else> {{ apyDatas.principle }} % </span>
              &nbsp;
              <Popover :styled="{ width: '15px' }"> {{ apyHint.principle }}</Popover>
            </div> -->
          </div>

          <div class="m-chfry-flash-leverage-box">
            <div class="m-chfry-flash-leverage">LEVERAGE</div>
            <div class="m-chfry-flash-slide-box">
              <!-- <div class="multiple-start">1.1X</div> -->
              <Slider
                :afterChange="afterChange"
                :slideDatas="slideDatas"
                :isLoading="maxLeverageLoading"
                @change="handleSlideChange"
              />
              <!-- <div class="multiple-end">
                <a-spin size="large" v-if="maxLeverageLoading" />
                <span v-else>{{ toFixed2(slideDatas.slideMax) }}X</span>
              </div> -->
            </div>
          </div>
          <!-- <a-slider v-model="inputValue" :inputValue="inputValue" :min="1.1" :max="3.8" :step="0.1" /> -->
          <div class="m-chfry-flash-amount-box">
            <div class="m-chfry-flash-amount two">
              <span class="amount">AMOUNT</span>
              <span class="banance">Balance:&nbsp;{{ currentBanance }}</span>
            </div>
            <SelectInput
              :selectData="selectDatas"
              :inputData="inputDatas"
              :handleInputChange="handleInputChange"
              :handleSelectChange="handleSelectChange"
            />
            <div class="m-chfry-flash-amount-apy">
              {{ showAPYText.principle }}:&nbsp;
              <a-spin size="large" v-if="apyLoading" />
              <span v-else> {{ apyDatas.principle }} % </span>
              &nbsp;
              <Popover :styled="{ width: '15px' }"> {{ apyHint.principle }}</Popover>
            </div>
          </div>

          <div class="m-chfry-flash-settings">
            <a-button class="chr-c-btn" @click="handleSettings()"> SETTINGS </a-button>
          </div>
          <p class="m-chfry-flash-segmentation"></p>

          <div class="m-chfry-flash-button">
            <a-button class="chr-btn chr-btn2 btn" :loading="btnLoading" @click="handleClick()">
              {{ currentStatusText }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </list-container>
</template>

<script>
import { mapGetters } from "vuex";
import ListContainer from "../common/ListContainer";
import SuffixInput from "../common/SuffixInput";
import SelectInput from "../common/SelectInput";
import ShadeBox from "../common/ShadeBox";
import Slider from "../common/Slider-def";
import SettingPopup from "../Popup/ClosePositionPopup";
import { toFixed2 } from "../../../../../utils/tools";
import { isApproved } from "../../../../../DSA/index";
import { getBalance } from "../../../../../sdk/cheese-sdk/lib.utils";
import { fixValue } from "../../../../../utils/fixInputValue";
import Popover from "../common/Popover/";
import { fixInput, VueDebounce } from "../../../../../utils/common-method";

import {
  SETDSASTATUS,
  SETDSAACCOUNT,
  GETDEPOSITSDATA,
  GETBORROWDATA,
  GETUSERORDER,
  SETEXHIBITDATA,
  SETISAPPROVED,
  GETSTKAAVEBALANCE,
} from "../../../../../store/modules/dsa";
import {
  convertToSupplyToken,
  getAccountAddress,
  createSA,
  isCreateAccount,
  fetchTokenPrice,
  chfryDSAInitital,
  calculateMaxLeverageLong,
  calculateMaxLeverageShort,
  longLeverage,
  shortLeverage,
  listLongToken,
  listShortToken,
  listLeverageToken,
  getAPYAndAPR,
  estimatedLongCollateralAmount,
  estimatedShortCollateralAmount,
  approveToken,
} from "../../../../../DSA/index";
import BigNumber from "bignumber.js";

export default {
  props: {
    styled: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    ListContainer,
    SuffixInput,
    SelectInput,
    Slider,
    SettingPopup,
    Popover,
    ShadeBox,
  },
  data() {
    return {
      timer2: null,
      // 记录用户在那个输入框输入
      userInputSequence: 0,
      toFixed2,
      apyLoading: false,
      currentBanance: "00.00",
      showLogin: false,
      timer: "",
      maxLeverageLoading: false,
      iconUrl1: "",
      iconUrl2: "",
      animationTrans: false,
      settingToleranceInputData: {
        defaultValue: "0.5",
        placeholder: "",
        value: "0.5",
      },
      tokenList: [],
      currentSelectData: {},
      selectDatas: {
        defaultValue: "",
        optionsData: "",
      },
      inputDatas: {
        defaultValue: "",
        placeholder: "000.000",
        value: "",
        disabled: false,
        currentBanance: 0,
      },
      tokenPrice: 0,
      inputValue: "",
      MaxLeverage: 0,
      leverageCurrentSelectData: {},
      leverageSelectDatas: {
        defaultValue: "",
        optionsData: [],
      },
      leverageInputDatas: {
        defaultValue: "",
        placeholder: "000.000",
        value: "",
        disabled: false,
      },
      reservesLists: [],
      btnLoading: false,
      isCreate: false,
      isApprove: false,
      slideDatas: {
        slideValue: 1.1,
        step: 0.01,
        slideMin: 1.1,
        slideMax: 1.1,
        defaultValue: 1.1,
      },
      settingFlag: false,
      longShortActive: 0,
      isLoading: false,
      userStatusList: {
        0: "Open an Account",
        1: "Approve",
        2: "LONG",
        3: "SHORT",
        4: "CONNECT",
      },
      errorMap: {
        0: "Amount cannot be empty",
        1: "Tolerance cannot be empty",
        2: "Cannot be less than 0.01%",
        3: "Cannot be greater than 50%",
      },
      apyData: {},
    };
  },
  watch: {
    account() {
      this.initial();
    },
    initialSuccess(v) {
      if (v) {
        this.initial(v);
      }
    },
    isCreatedAccount(v) {
      this.isCreate = this.isCreatedAccount;
      if (v) {
        this.initial(v);
      }
    },
    currentPositionType(v) {
      // const current = v == 2 ? 0 : 1;
      // const currentPositionType = v === 2 ? 1 : 2;
      this.longShortActive = v;
      this.slideDatas.slideMax = this.slideDatas.slideMin;
      this.$store.dispatch(`dsa/${SETDSASTATUS}`, Number(v));
      this.initial();
    },
  },
  computed: {
    ...mapGetters([
      "isLogin",
      "isMobile",
      "account",
      "isCreatedAccount",
      "initialSuccess",
      "dsaAccount",
      "currentPositionType",
      "imgWhiteList",
    ]),
    dsaStatus() {
      const routeParams = this.$route.params && this.$route.params.id ? this.$route.params.id : 2;
      const type = routeParams === "long" ? 1 : 2;
      return type;
    },
    positonDefType() {
      const routeParams = this.$route.params && this.$route.params.id ? this.$route.params.id : 2;
      const type = routeParams === "long" ? 1 : 2;
      return type;
    },
    toleranceValue() {
      const value = this.settingToleranceInputData.value;
      const tolerance = fixValue(value);
      return Number(tolerance);
    },
    supplyAmountValue() {
      const inputDatas = this.inputDatas.value;
      const value = fixValue(inputDatas);
      return Number(value);
    },
    collateralAmountValue() {
      const inputDatas = this.leverageInputDatas.value;
      const value = fixValue(inputDatas);
      return Number(value);
    },
    /**
     *
     * @param {*} supplyToken  address of token to use for leverage. eg. DAI
     * @param {*} supplyAmount   Amount to supply without erc20 decimals
     * @param {*} collateralToken  address of token to use for collateral in Aave . eg ETH.
     * @param {*} leverageFactor The multiplier for leverage . eg 2
     * @param {*} swapLossTolerance  Max allowable loss during swap as percentage
     * @returns
     */
    leverageParams() {
      return {
        supplyToken: this.currentSelectData.address,
        supplyAmount: this.supplyAmountValue,
        collateralToken: this.leverageCurrentSelectData.address,
        leverageFactor: this.slideDatas.slideValue,
        swapLossTolerance: this.toleranceValue,
      };
    },
    currentStatusText() {
      return this.userStatusList[this.currentStatus];
    },
    isShade() {
      if (this.currentStatus === 4 || this.currentStatus === 0) return true;
      return false;
    },
    currentStatus() {
      if (!this.isLogin) return 4;
      if (!this.isCreate) return 0;
      if (!this.isApprove) return 1;
      if (this.isActive) return 2;
      return 3;
    },
    leveragedTokenList() {
      return "";
    },
    isActive() {
      return this.longShortActive === 1;
    },
    apyHint() {
      let text1 = "APY for borrow this token in Aave";
      let text2 = "APY for deposit this token in Aave";

      return {
        principle: this.isActive ? text1 : text2,
        leverage: !this.isActive ? text1 : text2,
      };
    },
    apyDatas() {
      if (this.apyData.apy1 && this.apyData.apy2) {
        return {
          principle: this.isActive
            ? this.apyData.apy1["variableBorrowAPY"]
            : this.apyData.apy1["depositAPY"],

          leverage: !this.isActive
            ? this.apyData.apy2["variableBorrowAPY"]
            : this.apyData.apy2["depositAPY"],
        };
      }
      return {
        principle: this.isActive ? "0" : "0",
        leverage: !this.isActive ? "0" : "0",
      };
    },
    showAPYText() {
      const isLong = this.isActive;
      return {
        principle: isLong ? "borrow APY" : "deposit APY",
        leverage: !isLong ? "borrow APY" : "deposit APY",
      };
    },
  },
  mounted() {
    if (this.isLogin && this.initialSuccess) {
      this.initial();
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    afterChange() {},
    setPositionType() {
      this.longShortActive = this.positonDefType;
      this.slideDatas.slideMax = this.slideDatas.slideMin;
    },
    async initial(v = this.initialSuccess) {
      this.cleanStatus();
      this.setPositionType();
      if (v) {
        //平仓后进行更新
        this.$bus.on("CLOSEFINISH", () => {
          this.getCurrentBanance();
          // 获取最大杠杆
          this.getMaxLeverage(
            this.currentSelectData.address,
            this.supplyAmountValue,
            this.collateralAmountValue,
            this.leverageCurrentSelectData.address,
            this.toleranceValue
          );
        });
        this.btnLoading = true;
        this.isCreateA();
        // CURRENTPOSTION
        // this.$emit
        this.$bus.emit("CURRENTPOSTION", this.longShortActive);
        await this.getTokenList();
        this.isApproved(this.currentSelectData.address, this.account, this.dsaAccount);
        // 获取leverage - token -list
        await this.getReservesLists();

        // 获取最大杠杆
        this.getMaxLeverage(
          this.currentSelectData.address,
          this.supplyAmountValue,
          this.collateralAmountValue,
          this.leverageCurrentSelectData.address,
          this.toleranceValue
        );
        this.getCurrentBanance();
        this.changeAnimationTrans();
        this.getAPYAndAPR(
          this.selectDatas.optionsData[0].address,
          this.leverageCurrentSelectData.address
        );
        //获取token价格
        this.intervalFetchTokenPrice();

        this.estimatedCollateralAmount(
          this.currentSelectData.address,
          this.supplyAmountValue,
          this.leverageCurrentSelectData.address,
          this.slideDatas.slideValue
        );
        this.btnLoading = false;
        // this.setIntervalQuery();
      }
    },
    intervalFetchTokenPrice() {
      this.fetchTokenPrice(this.leverageCurrentSelectData.address, this.currentSelectData.address);
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.fetchTokenPrice(
          this.leverageCurrentSelectData.address,
          this.currentSelectData.address
        );
      }, 1000 * 3);
    },
    getCurrentBanance() {
      getBalance(this.currentSelectData.address).then((res) => {
        // this.inputDatas.placeholder = "Max: " + new BigNumber(res).toFixed(2);
        this.currentBanance = new BigNumber(res).toFixed(2);
        this.inputDatas.currentBanance = res;
      });
    },
    changeAnimationTrans(icon1, icon2) {
      this.iconUrl1 = icon1 || this.currentSelectData.iconUrl;
      this.iconUrl2 = icon2 || this.leverageCurrentSelectData.iconUrl;
      this.animationTrans = !this.animationTrans;
    },
    async getAPYAndAPR(addr1, add2) {
      this.apyLoading = true;
      // const res = await getAPYAndAPR(addr1);
      // const res2 = await getAPYAndAPR(add2);
      Promise.all([getAPYAndAPR(addr1), getAPYAndAPR(add2)])
        .then((res) => {
          const [res1, res2] = res;
          this.apyLoading = false;
          this.apyData = {
            apy1: res1,
            apy2: res2,
          };
        })
        .catch(() => {
          this.apyLoading = false;
        });
    },
    actionError(status) {
      this.$message.error({
        content: this.errorMap[status],
        key: "ERROR",
        duration: 2,
      });
    },
    changeCurrenSelectData(v, isLeverage = false) {
      const cur = isLeverage ? "leverageCurrentSelectData" : "currentSelectData";
      const curr = isLeverage ? "leverageSelectDatas" : "selectDatas";
      this[cur] = this[curr].optionsData.find((item) => item.value === v);
    },
    handleSelectChange(v) {
      this.changeCurrenSelectData(v);
      this.changeAnimationTrans();
      this.estimatedCollateralAmount(
        this.currentSelectData.address,
        this.supplyAmountValue,
        this.leverageCurrentSelectData.address,
        this.slideDatas.slideValue
      );
      this.getAPYAndAPR(this.currentSelectData.address, this.leverageCurrentSelectData.address);
      this.getMaxLeverage(
        this.currentSelectData.address,
        this.supplyAmountValue,
        this.collateralAmountValue,
        this.leverageCurrentSelectData.address,
        this.toleranceValue
      );
    },
    handleLeverageSelectChange(v) {
      this.changeCurrenSelectData(v, true);
      if (this.userInputSequence === 2) {
        this.estimatedCollateralAmount(
          this.currentSelectData.address,
          this.supplyAmountValue,
          this.leverageCurrentSelectData.address,
          Number(this.slideDatas.slideValue)
        );
      } else {
        if (
          this.leverageCurrentSelectData.address &&
          this.currentSelectData.address &&
          Number(this.slideDatas.slideValue)
        ) {
          convertToSupplyToken(
            this.leverageCurrentSelectData.address,
            Number(this.leverageInputDatas.value),
            this.currentSelectData.address,
            Number(this.slideDatas.slideValue)
          ).then((res) => {
            this.inputDatas.value = res > 0 ? res : 0;
            if (this.isLogin && this.supplyAmountValue && this.supplyAmountValue > 0) {
              this.getMaxLeverage(
                this.currentSelectData.address,
                this.supplyAmountValue,
                this.collateralAmountValue,
                this.leverageCurrentSelectData.address,
                this.toleranceValue
              );
            }
          });
        }
      }

      //获取token价格
      this.fetchTokenPrice(this.leverageCurrentSelectData.address, this.currentSelectData.address);
      this.changeAnimationTrans();
      this.getAPYAndAPR(this.currentSelectData.address, this.leverageCurrentSelectData.address);
      this.getMaxLeverage(
        this.currentSelectData.address,
        this.supplyAmountValue,
        this.collateralAmountValue,
        this.leverageCurrentSelectData.address,
        this.toleranceValue
      );
    },
    handleLeverageInputChangeLogic() {
      this.userInputSequence = 1;
      if (
        this.leverageCurrentSelectData.address &&
        this.currentSelectData.address &&
        Number(this.slideDatas.slideValue)
      ) {
        convertToSupplyToken(
          this.leverageCurrentSelectData.address,
          Number(this.leverageInputDatas.value),
          this.currentSelectData.address,
          Number(this.slideDatas.slideValue)
        ).then((res) => {
          this.inputDatas.value = res > 0 ? res : 0;
          if (this.isLogin && this.supplyAmountValue && this.supplyAmountValue > 0) {
            this.getMaxLeverage(
              this.currentSelectData.address,
              this.supplyAmountValue,
              this.collateralAmountValue,
              this.leverageCurrentSelectData.address,
              this.toleranceValue
            );
          }
        });
      }
    },
    handleInputChangeLogic() {
      this.userInputSequence = 2;
      if (this.isLogin && this.supplyAmountValue && this.supplyAmountValue > 0) {
        this.getMaxLeverage(
          this.currentSelectData.address,
          this.supplyAmountValue,
          this.collateralAmountValue,
          this.leverageCurrentSelectData.address,
          this.toleranceValue
        );
        this.estimatedCollateralAmount(
          this.currentSelectData.address,
          this.supplyAmountValue,
          this.leverageCurrentSelectData.address,
          this.slideDatas.slideValue
        );
      } else {
        this.slideDatas.slideMax = 1.1;
        this.slideDatas.slideValue = 1.1;
        if (this.isLogin && this.initialSuccess) {
          this.estimatedCollateralAmount(
            this.currentSelectData.address,
            this.supplyAmountValue,
            this.leverageCurrentSelectData.address,
            this.slideDatas.slideValue
          );
        }
      }
    },
    handleLeverageInputChange: VueDebounce("handleLeverageInputChangeLogic", 500),
    handleInputChange: VueDebounce("handleInputChangeLogic", 500),
    async getTokenList() {
      const data = await listLeverageToken();
      if (data) {
        let arr = [];
        data.forEach((item, index) => {
          const symbol = item.symbol.toLocaleUpperCase();
          const isW = this.imgWhiteList.includes(symbol);
          if (isW) {
            arr.push({
              id: index,
              value: symbol,
              iconUrl: require(`../../../../../assets/newFlash/${symbol}.svg`),
              address: item.token,
            });
          }
        });
        this.tokenList = arr;
        const defaultValue = arr[0].value;
        this.selectDatas.defaultValue = defaultValue;
        this.selectDatas.optionsData = arr;
        if (!this.currentSelectData.address) {
          this.changeCurrenSelectData(defaultValue);
        }
      }
    },
    checkSlideValue(v) {
      let value = `${v}`;
      if (value.endsWith(".")) {
        return false;
      }
      let count = value.split(".").length - 1;
      if (count > 1) {
        return false;
      }
      if (v === null || v === "") {
        return false;
      }
      if (Number(v) > this.slideDatas.slideMax) {
        return false;
      }
      if (Number(v) < this.slideDatas.slideMin) {
        return false;
      }
      return true;
    },
    // VueDebounce
    slideChangeLogic() {
      if (this.userInputSequence === 2) {
        this.estimatedCollateralAmount(
          this.currentSelectData.address,
          this.supplyAmountValue,
          this.leverageCurrentSelectData.address,
          Number(this.slideDatas.slideValue)
        );
      } else {
        if (
          this.leverageCurrentSelectData.address &&
          this.currentSelectData.address &&
          Number(this.slideDatas.slideValue)
        ) {
          convertToSupplyToken(
            this.leverageCurrentSelectData.address,
            Number(this.leverageInputDatas.value),
            this.currentSelectData.address,
            Number(this.slideDatas.slideValue)
          ).then((res) => {
            this.inputDatas.value = res > 0 ? res : 0;
          });
        }
      }
    },
    handleSlideChange: VueDebounce("slideChangeLogic", 500),

    // (v) {
    // console.log("checkSlideValue", v);
    // if (!this.checkSlideValue(v)) {
    //   return;
    // }
    // if (v === null || v === "") {
    //   this.slideDatas.slideValue = this.slideDatas.slideMin;
    // }
    // if (!v) {
    //   this.slideDatas.slideValue = this.slideDatas.slideMin;
    // }
    // this.slideDatas.slideValue = v;
    // if (this.userInputSequence === 2) {
    //   await this.estimatedCollateralAmount(
    //     this.currentSelectData.address,
    //     this.supplyAmountValue,
    //     this.leverageCurrentSelectData.address,
    //     Number(this.slideDatas.slideValue)
    //   );
    // } else {
    //   if (
    //     this.leverageCurrentSelectData.address &&
    //     this.currentSelectData.address &&
    //     Number(this.slideDatas.slideValue)
    //   ) {
    //     convertToSupplyToken(
    //       this.leverageCurrentSelectData.address,
    //       Number(this.leverageInputDatas.value),
    //       this.currentSelectData.address,
    //       Number(this.slideDatas.slideValue)
    //     ).then((res) => {
    //       this.inputDatas.value = res > 0 ? res : 0;
    //     });
    //   }
    // }
    // },
    async getMaxLeverage(
      address,
      supplyAmount,
      collateralAmountValue,
      collateralToken,
      swapLossTolerance
    ) {
      if (!address && !supplyAmount && !swapLossTolerance) return;
      if (Number(supplyAmount) < 1 || (this.isActive && !collateralToken)) return;

      const isInputCollateralToken = this.userInputSequence === 2 ? false : true;
      const amount = this.userInputSequence === 2 ? supplyAmount : collateralAmountValue;
      const calculateMaxLeverage = this.isActive
        ? calculateMaxLeverageLong
        : calculateMaxLeverageShort;
      this.slideDatas.slideMax = this.slideDatas.slideMin;
      this.slideDatas.slideValue = this.slideDatas.slideMin;
      this.maxLeverageLoading = true;
      calculateMaxLeverage(
        address,
        Number(amount),
        collateralToken,
        Number(swapLossTolerance),
        isInputCollateralToken
      )
        .then((res) => {
          this.slideDatas.slideMax =
            Number(res) < this.slideDatas.slideMin ? this.slideDatas.slideMin : res;
          // toFixed2(res)
          this.maxLeverageLoading = false;
        })
        .catch((e) => {
          this.$message.error({
            content: `${e}`,
            key: "ERROR",
            duration: 2,
          });
          this.maxLeverageLoading = false;
        });
    },
    async chfryDSAInitital() {
      return await chfryDSAInitital();
    },
    fetchTokenPrice(tokenAddr, tokenAddr2) {
      const requestList = [fetchTokenPrice(tokenAddr), fetchTokenPrice(tokenAddr2)];
      Promise.all(requestList)
        .then((res) => {
          const [tokenPrice1, tokenPrice2] = res;
          const price1 = Number(tokenPrice1) > 0 ? Number(tokenPrice1) : 0;
          const price2 = Number(tokenPrice2) > 0 ? Number(tokenPrice2) : 0;
          const result = price1 / price2;
          this.tokenPrice = toFixed2(result);
        })
        .catch(() => {
          this.tokenPrice = 0;
        });
    },
    async getReservesLists() {
      const res = await this.getListToken();
      if (res && res.length > 0) {
        let arr = [];
        res.forEach((item) => {
          const symbol = item.symbol.toLocaleUpperCase();
          const isW = this.imgWhiteList.includes(symbol);
          if (isW) {
            arr.push({
              id: item.id,
              value: symbol,
              iconUrl: require(`../../../../../assets/newFlash/${symbol}.svg`),
              address: item.token,
            });
          }
        });
        const defaultValue = arr[0].value;
        this.leverageSelectDatas = {
          defaultValue: defaultValue,
          optionsData: arr,
        };
        if (!this.leverageCurrentSelectData.address) {
          this.changeCurrenSelectData(defaultValue, true);
        }
      }
    },
    setIntervalQuery() {
      if (this.timer2) clearInterval(this.timer2);
      this.timer2 = setInterval(() => {
        isCreateAccount(this.currentPositionType).then((res) => {
          this.isCreate = res;
        });
        if (this.currentSelectData.address && this.account && this.dsaAccount) {
          isApproved(this.currentSelectData.address, this.account, this.dsaAccount).then((res) => {
            this.$store.dispatch(`dsa/${SETISAPPROVED}`, res);
            this.isApprove = res;
          });
        }
      }, 1000);
    },
    async isCreateA() {
      this.btnLoading = true;
      const res = await isCreateAccount(this.currentPositionType);
      this.isCreate = res;
      this.btnLoading = false;
    },
    openAccountLogic() {
      this.btnLoading = true;
      const params = {
        accountType: this.currentPositionType,
        onConfirmation: (confirmationNumber) => {
          if (confirmationNumber === 1) {
            this.btnLoading = false;
            this.isApprove = false;
            this.isCreate = true;
            this.$store.dispatch(`dsa/${SETDSASTATUS}`, this.currentPositionType);
            this.$store.dispatch(`dsa/${SETDSAACCOUNT}`, this.currentPositionType);
          }
        },
        onReceipt: (receipt) => {
          this.btnLoading = false;
        },
      };
      // createSA(this.currentPositionType)
      createSA(params).catch(() => {
        this.btnLoading = false;
      });
      // .then((res) => {
      //   this.btnLoading = false;
      //   this.isApprove = false;
      //   this.isCreate = res;
      //   if (res) {
      //     this.$store.dispatch(`dsa/${SETDSASTATUS}`, this.currentPositionType);
      //     this.$store.dispatch(`dsa/${SETDSAACCOUNT}`, this.currentPositionType);
      //   }
      // })
    },
    async getAccountAddress() {
      const res = await getAccountAddress(this.currentPositionType);
      this.dsaAccount = res;
    },
    async approveLogic() {
      if (this.currentSelectData.address && this.dsaAccount) {
        this.btnLoading = true;
        const callback = {
          onConfirmation: (confirmationNumber) => {
            if (confirmationNumber === 1) {
              this.btnLoading = false;
              this.isApproved(this.currentSelectData.address, this.account, this.dsaAccount);
            }
          },
          onError: (error) => {
            this.isApprove = false;
            this.btnLoading = false;
          },
        };
        approveToken(this.currentSelectData.address, this.dsaAccount, callback).catch(() => {
          this.isApprove = false;
          this.btnLoading = false;
        });
      } else {
        // this.actionError(0);
        return;
      }
    },
    communicationBus(res) {
      this.$bus.emit("OPENPOSITION", res);
    },
    testLimit() {
      if (this.leverageParams.supplyAmount > 1000) {
        this.$message.error({
          content: `No more than 1,000 ${this.currentSelectData.value}`,
          key: "ERROR",
          duration: 2,
        });
        return false;
      }
      return true;
    },
    longLogic() {
      const params = this.leverageParams;
      if (!this.checkPayload()) return;
      // if (!this.testLimit()) return;
      this.btnLoading = true;
      // console.table(Object.assign({}, { TYPE: "open-long" }, params));
      const callback = {
        onConfirmation: (confirmationNumber) => {
          if (confirmationNumber === 1) {
            this.btnLoading = false;
            this.updataOrder();
          }
        },
        onError: (error) => {
          // this.$message.error({
          //   content: `${error.message}`,
          //   key: "ERROR",
          //   duration: 2,
          // });
          this.btnLoading = false;
        },
      };
      const isInputCollateralToken = this.userInputSequence === 2 ? false : true;
      longLeverage(
        params.supplyToken,
        params.supplyAmount,
        params.collateralToken,
        params.leverageFactor,
        params.swapLossTolerance,
        callback,
        isInputCollateralToken
      ).catch((e) => {
        console.log(e);
        this.$message.error({
          content: `${e.message || e}`,
          key: "ERROR",
          duration: 2,
        });

        this.btnLoading = false;
      });
    },
    updataOrder() {
      this.$store.dispatch(`dsa/${GETDEPOSITSDATA}`, this.currentPositionType);
      this.$store.dispatch(`dsa/${GETBORROWDATA}`, this.currentPositionType);
      this.$store.dispatch(`dsa/${GETUSERORDER}`, {
        account: this.dsaAccount,
        isSleep: true,
      });
      this.$store.dispatch(`dsa/${SETEXHIBITDATA}`);
      this.$store.dispatch(`dsa/${GETSTKAAVEBALANCE}`);
      //更新余额；
      this.getCurrentBanance();

      //更新 Max Leverage
      this.getMaxLeverage(
        this.currentSelectData.address,
        this.supplyAmountValue,
        this.collateralAmountValue,
        this.leverageCurrentSelectData.address,
        this.toleranceValue
      );
    },
    checkPayload() {
      const params = this.leverageParams;
      if (!params.supplyAmount) {
        this.actionError(0);
        return false;
      }
      if (params.supplyAmount < 1) {
        this.$message.error({
          content: `Minimal amount is 1 ${this.currentSelectData.value}`,
          key: "ERROR",
          duration: 2,
        });
        return false;
      }

      if (Number(this.inputDatas.currentBanance) < params.supplyAmount) {
        this.$message.error({
          content: `No enough ${this.currentSelectData.value} in your wallet`,
          key: "ERROR",
          duration: 2,
        });
        return false;
      }
      return true;
    },
    shortLogic() {
      const params = this.leverageParams;
      if (!this.checkPayload()) return;
      // if (!this.testLimit()) return;
      this.btnLoading = true;
      // console.table(Object.assign({}, { TYPE: "open-short" }, params));
      const callback = {
        onConfirmation: (confirmationNumber) => {
          if (confirmationNumber === 1) {
            this.btnLoading = false;
            this.updataOrder();
          }
        },
        onError: (error) => {
          console.log(error);
          // this.$message.error({
          //   content: `${error.message}`,
          //   key: "ERROR",
          //   duration: 2,
          // });
          this.btnLoading = false;
        },
      };
      const isInputCollateralToken = this.userInputSequence === 2 ? false : true;

      shortLeverage(
        params.supplyToken,
        params.supplyAmount,
        params.collateralToken,
        params.leverageFactor,
        params.swapLossTolerance,
        callback,
        isInputCollateralToken
      ).catch((e) => {
        this.$message.error({
          content: `${e.message || e}`,
          key: "ERROR",
          duration: 2,
        });
        this.btnLoading = false;
      });
      // ;
      // // .then(() => {
      // //   // this.btnLoading = false;
      // // })
    },
    cleanStatus() {
      this.isCreate = false;
      this.isApprove = false;
    },
    async handleLongShort(current) {
      if (this.longShortActive === current) return;
      this.longShortActive = current;
      this.slideDatas.slideMax = this.slideDatas.slideMin;
      this.initial();
    },
    handleSettings() {
      this.settingFlag = true;
    },
    handleClick() {
      const maps = new Map([
        [0, () => this.openAccountLogic()],
        [1, () => this.approveLogic()],
        [2, () => this.longLogic()],
        [3, () => this.shortLogic()],
        [4, () => this.goLoginLogic()],
      ]);
      return maps.get(this.currentStatus)();
    },
    goLoginLogic() {
      this.$bus.emit("showLogin", true);
    },
    handlePopupCloseSetting(falg) {
      this.beforCloseChangeTolerance();
      this.settingFlag = !falg;
    },
    beforCloseChangeTolerance() {
      if (Number(this.toleranceValue) < 0.01) {
        this.settingToleranceInputData.value = this.settingToleranceInputData.defaultValue;
      }
      if (Number(this.toleranceValue) > 50) {
        this.settingToleranceInputData.value = 50;
      }
    },
    inputChangeLogic() {
      if (!this.checkToleranceValue()) {
        return;
      }
    },
    handlePropsInputChange: VueDebounce("inputChangeLogic", 500),
    checkToleranceValue() {
      if (Number(this.toleranceValue) < 0.01) {
        this.actionError(2);
        return false;
      }
      if (Number(this.toleranceValue) > 50) {
        this.actionError(3);
        return false;
      }
      return true;
    },
    handlePopupConfirmSetting(data, falg) {
      if (!this.checkToleranceValue()) {
        return;
      }
      this.settingToleranceInputData.value = data;
      if (this.isLogin && this.initialSuccess) {
        this.getMaxLeverage(
          this.currentSelectData.address,
          this.supplyAmountValue,
          this.collateralAmountValue,
          this.leverageCurrentSelectData.address,
          this.toleranceValue
        );
        this.estimatedCollateralAmount(
          this.currentSelectData.address,
          this.supplyAmountValue,
          this.leverageCurrentSelectData.address,
          this.slideDatas.slideValue
        );
      }
      this.settingFlag = !falg;
    },
    async isApproved(tokenAddr, ownerAddr, spenderAddr) {
      this.btnLoading = true;
      if (tokenAddr && ownerAddr && spenderAddr) {
        const res = await isApproved(tokenAddr, ownerAddr, spenderAddr);
        this.$store.dispatch(`dsa/${SETISAPPROVED}`, res);
        this.isApprove = res;
      }
      this.btnLoading = false;
    },
    async getListToken() {
      return this.isActive ? await listLongToken() : await listShortToken();
    },
    async estimatedCollateralAmount(supplyToken, supplyAmount, collateralToken, leverageFactor) {
      const res = this.isActive
        ? await estimatedLongCollateralAmount(
            supplyToken,
            supplyAmount,
            collateralToken,
            leverageFactor
          )
        : await estimatedShortCollateralAmount(
            supplyToken,
            supplyAmount,
            collateralToken,
            leverageFactor
          );
      this.leverageInputDatas.value = Number(res) > 0 ? res : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./index.h5.scss";
</style>
