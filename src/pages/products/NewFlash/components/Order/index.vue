<template>
  <list-container size="big" :isLoading="allLoading" :styled="styled" :isDirection="false">
    <div
      class="m-marigin-content"
      :style="{
        paddingLeft: '20px',
        paddingRight: '20px',
      }"
    >
      <ClosePositionPopup
        title="CLOSE POSITION"
        :dialogFlag="closePositionFlag"
        :handleClose="handlePopupClosePosition"
        :inputData="closeInputData"
        :handleInputChange="handleInputChange"
        :closePositionData="closePositionData"
        :handleConfirm="handleClosePositionConfirm"
        :loading="btnLoading"
        :handlePropsInputChange="handlePropsInputChange"
        :estimatedLoading="estimatedLoading"
      />
      <AddMarginPopup
        :loading="marginBtnLoading"
        title="ADD MARGIN"
        :inputData="addMarginInputData"
        :dialogFlag="dialogFlag"
        :selectData="selectDatas"
        :handleClose="handlePopupClose"
        :handleConfirm="handleConfirm"
        :handleSelectChange="handleSelectChange"
      />
      <div class="m-margin-header">
        <div class="m-margin-header-left">
          <div class="orders">ORDERS</div>
          <div class="positon-fee">
            <span class="content">
              POSITION FEE:&nbsp;
              <Tooltip :data="`$ ${fees}`" :detail="`$ ${feesDetail}`" />
              <div class="popover">
                <Popover> expense of borrow - income of deposit </Popover>
              </div>
            </span>
            <span class="content two" v-if="isMobile">
              TOTAL PNL:&nbsp;
              <Tooltip
                :data="`$ ${totalPNL.pnl ? totalPNL.pnl : '--'}`"
                :detail="`$ ${totalPNL.detailPnl ? totalPNL.detailPnl : '--'}`"
              />
              <div class="popover">
                <Popover>nPnl for all positions - position fee </Popover>
              </div>
            </span>
          </div>
          <div class="positon-fee" v-if="!isMobile">
            <span class="content">
              TOTAL UPNL:&nbsp;
              <Tooltip
                :data="`$ ${totalPNL.pnl ? totalPNL.pnl : '--'}`"
                :detail="`$ ${totalPNL.detailPnl ? totalPNL.detailPnl : '--'}`"
              />
              <div class="popover">
                <Popover>uPnL for all positions - position fee </Popover>
              </div>
            </span>
          </div>
          <!-- <div class="positon-fee" v-if="!isMobile">
            <span class="content">
              HEALTH FACTOR:&nbsp;
              <Tooltip
                :data="healthFactory.number"
                :detail="healthFactory.detailNumber"
                :styled="healthFactory.styled"
              />
              <div class="popover">
                <Popover> Keep it above 1 to avoid liquidation by adding margin </Popover>
              </div>
            </span>
          </div> -->
          <div class="positon-fee" v-if="!isMobile && dataSource && dataSource.length === 1">
            <span class="content">
              LIQUIDATION PRICE:&nbsp;
              <Tooltip
                :data="`${
                  Number(liquidationPrice) < 0 ? `won't get liquidated` : `$ ${liquidationPrice}`
                }`"
                :detail="`${
                  Number(liquidationPriceDetail) < 0
                    ? `won't get liquidated`
                    : `$ ${liquidationPriceDetail}`
                }`"
              />
              <div class="popover">
                <Popover
                  >If the leveraged token reaches the liquidation price, your position will get
                  liquidated.
                </Popover>
              </div>
            </span>
          </div>
          <!-- <div class="positon-fee" v-if="!isMobile && isLong">
            <span class="content">
              LIQUIDATION POSITION:&nbsp;
              <Tooltip
                :data="`$ ${liquidationValueLongDeal.liquidationValueLong}`"
                :detail="`$ ${liquidationValueLongDeal.liquidationValueLongDetail}`"
              />
              <div class="popover">
                <Popover>
                  If your Position Value of leveraged token reaches it, your position will get
                  liquidated.
                </Popover>
              </div>
            </span>
          </div> -->
          <div class="positon-fee" v-if="!isMobile && !isLong">
            <span class="content">
              LIQUIDATION BORROWED:&nbsp;
              <Tooltip
                :data="`$ ${liquidationValueShortDeal.liquidationValueShort}`"
                :detail="`$ ${liquidationValueShortDeal.liquidationValueShortDetail}`"
              />
              <div class="popover">
                <Popover
                  >If your Borrowed Value reaches it, your position will get liquidated.
                </Popover>
              </div>
            </span>
          </div>
        </div>
        <a-button
          :disabled="addMarginBtnLoading"
          class="m-chfry-flash-btn chr-btn m-chfry-add-margin-btn"
          @click="handleAddMargin"
        >
          {{ showButtonText }}
        </a-button>
      </div>
      <MobileTableList v-if="isMobile" :dataSource="dataSource" :columns="columns" size="big">
        <span slot="holding" slot-scope="{ data }" class="holding">
          {{ data.holding }}
        </span>
        <span slot="position" slot-scope="{ data }" class="position">
          <Tooltip
            :data="`${data.position} ${data.unit}`"
            :detail="`${toFixed10(data.positionDetail)} ${data.unit}`"
          />
        </span>
        <span slot="pnl" slot-scope="{ data }" class="pnl">
          <Tooltip :data="`$${toFixed3(data.pnl)}`" :detail="`$ ${toFixed10(data.pnlDetail)}`" />
        </span>
        <span slot="action" slot-scope="{ data }">
          <a-button class="chr-c-btn" @click="handleClose(data)"> CLOSE </a-button>
        </span>
      </MobileTableList>
      <Table v-if="!isMobile" :dataSource="dataSource" :columns="columns" :pagination="pagination">
        <span slot="holding" slot-scope="list, data" class="holding">
          {{ data.holding }}
        </span>
        <span slot="position" slot-scope="list, data" class="position">
          <div class="position-number">
            <Tooltip
              :data="`${data.position} ${data.unit}`"
              :detail="`${toFixed10(data.positionDetail)} ${data.unit}`"
            />
          </div>
          <div>
            <Tooltip :data="data.value" :detail="data.valueDetail" />
          </div>
        </span>
        <span slot="pnl" slot-scope="list, data" class="pnl">
          <Tooltip :data="`$${data.pnl}`" :detail="`$${toFixed10(data.pnlDetail)}`" />
        </span>
        <span slot="action" slot-scope="data">
          <a-button class="chr-c-btn" @click="handleClose(data)"> CLOSE </a-button>
        </span>
      </Table>
    </div>
  </list-container>
</template>

<script>
import ListContainer from "../common/ListContainer";
import Table from "../common/Table";
import AddMarginPopup from "../Popup/AddMarginPopup";
import ClosePositionPopup from "../Popup/ClosePositionPopup";
import { columns } from "./data";
import MobileTableList from "../common/MobileTableList";
import Tooltip from "../common/Tooltip";
import Popover from "../common/Popover/";
import {
  addMargin,
  listLeverageToken,
  getTokenSymbolDecimal,
  estimatedLongCloseReturn,
  estimatedShortCloseReturn,
  fetchTokenPrice,
  liquidationPriceLong,
  liquidationPriceShort,
} from "../../../../../DSA/index";
import { convertBigNumberToNormal, getSymbol } from "../../../../../sdk/cheese-sdk/lib.utils";
import { mapGetters } from "vuex";
import { toFixed4, toFixed10, toFixed3 } from "../../../../../utils/tools";
import Bignumber, { BigNumber } from "bignumber.js";
import { setColor } from "../../../../../utils/colorHelper";
import ChfryDSA from "chfry-dsa";
import { VueDebounce, fixD } from "../../../../../utils/common-method";

import {
  GETUSERORDER,
  GETDEPOSITSDATA,
  GETBORROWDATA,
  SETEXHIBITDATA,
  SETLIQUIDATIONVALUELONG,
  SETLIQUIDATIONVALUESHORT,
  SETORDERDATASOURCES,
  GETSTKAAVEBALANCE,
} from "../../../../../store/modules/dsa";

export default {
  name: "chfry-flash-margin",
  components: {
    ListContainer,
    Table,
    Popover,
    Tooltip,
    AddMarginPopup,
    MobileTableList,
    ClosePositionPopup,
  },
  watch: {
    isMobile(newVal, oldVal) {
      this.isMobile = newVal;
      if (newVal !== oldVal && this.curCount !== 1) {
        this.$router.go(0);
      }
    },
    dsaAccount(v) {
      if (v) {
        this.$store.dispatch(`dsa/${GETUSERORDER}`, {
          account: v,
          isSleep: false,
        });
        this.$store.dispatch(`dsa/${SETLIQUIDATIONVALUELONG}`);
        this.$store.dispatch(`dsa/${SETLIQUIDATIONVALUESHORT}`);
      }
    },
    dataSource: {
      handler(v) {
        this.$store.dispatch(`dsa/${SETLIQUIDATIONVALUELONG}`);
        this.$store.dispatch(`dsa/${SETLIQUIDATIONVALUESHORT}`);
      },
      deep: true,
    },
    allData: {
      handler() {
        this.disposeDatas();
      },
      deep: true,
    },
    apyData: {
      handler() {
        this.calculateFees();
      },
      deep: true,
    },
  },
  computed: {
    healthFactory() {
      let obj = {
        number: "--",
        detailNumber: "--",
        styled: {},
      };
      if (this.exhibitData) {
        const res = this.exhibitData.filter((item) => item.name === "HEALTH_FACTOR");
        if (res && res[0]) {
          let current = res[0];
          obj = {
            number: current.number > 10000 ? "> 10000" : current.amountThousands,
            detailNumber: fixD(current.amount, 5),
            styled: {
              color: setColor(current.amountThousands),
            },
          };
          return obj;
        }
        return obj;
      }
      return obj;
    },
    toleranceValue() {
      const value = this.closeInputData.value;
      const tolerance =
        value && value.toString().indexOf(",") > -1 ? value.toString().replace(/,/g, ".") : value;
      return Number(tolerance);
    },
    currentStatus() {
      if (!this.isLogin) return 1;
      return 2;
    },
    buttonText() {
      return {
        1: "CONNECT",
        2: "ADD MARGIN",
      };
    },
    showButtonText() {
      return this.buttonText[this.currentStatus];
    },

    ...mapGetters([
      "isLogin",
      "account",
      "isCreatedAccount",
      "initialSuccess",
      "dsaAccount",
      "borrowsData",
      "depositsData",
      "order",
      "isApproved",

      "orderLoading",
      "depositsLoading",
      "borrowsLoading",

      "exhibitData",

      "accountBorrows",
      "accountDeposits",
      "accountDepositeStableTokens",

      "currentPositionType",

      "imgWhiteList",
      "liquidationValueLong",
      "liquidationValueShort",
    ]),
    liquidationValueLongDeal() {
      return {
        liquidationValueLong: fixD(this.liquidationValueLong, 2),
        liquidationValueLongDetail: fixD(this.liquidationValueLong, 5),
      };
    },
    liquidationValueShortDeal() {
      return {
        liquidationValueShort: fixD(this.liquidationValueShort, 2),
        liquidationValueShortDetail: fixD(this.liquidationValueShort, 5),
      };
    },
    addMarginBtnLoading() {
      if (!this.isLogin) {
        return false;
      }
      if (
        this.isLogin &&
        this.isCreatedAccount &&
        this.initialSuccess &&
        this.isApproved &&
        this.dataSource.length > 0
      ) {
        return false;
      }
      return true;
    },
    allLoading() {
      if (
        this.orderLoading ||
        this.depositsLoading ||
        this.borrowsLoading ||
        (((this.depositsData && this.depositsData.length > 0) ||
          (this.borrowsData && this.borrowsData.length > 0)) &&
          (!this.order || this.order.length <= 0) &&
          this.count < 5)
      ) {
        return true;
      }
      return false;
    },
    allData() {
      return {
        dsaAccount: this.dsaAccount,
        borrowsData: this.borrowsData,
        depositsData: this.depositsData,
        order: this.order,
      };
    },
    apyData() {
      return {
        dataSource: this.dataSource,
        exhibitData: this.exhibitData,
        accountBorrows: this.accountBorrows,
        accountDeposits: this.accountDeposits,
        accountDepositeStableTokens: this.accountDepositeStableTokens,
        position: this.positonDefType,
        order: this.order,
      };
    },
    cloasePositionConfirmData() {
      return {
        supplyToken: this.closePositionData.itemData.supplyToken,
        collateralToken: this.closePositionData.itemData.token,
        collateralAmount: this.closePositionData.itemData.positionDetail,
        swapLossTolerance: this.toleranceValue,
      };
    },
    styled() {
      if (this.isMobile) {
        return {
          marginLeft: "20px",
        };
      }
      return {};
    },
    isLong() {
      return this.positonDefType === 1;
    },
    positonDefType() {
      const routeParams = this.isGetPosition ? this.$route.params.id : "long";
      const type = routeParams === "long" ? 1 : this.$route.params.id === "short" ? 2 : 1;
      return type;
    },
    isGetPosition() {
      if (this.$route.params && this.$route.params.id) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      count: 0,
      fixD,
      errorMap: {
        0: "Cannot be less than 0.01%",
        1: "Cannot be greater than 50%",
      },
      liquidationPrice: 0,
      liquidationPriceDetail: 0,
      toFixed3,
      fees: "--",
      feesDetail: "--",
      toFixed10,
      isOrderQuestLoading: false,
      marginBtnLoading: false,
      btnLoading: false,
      estimatedLoading: false,
      totalPNL: {
        pnl: 0,
        detailPnl: 0,
      },
      timer: "",
      dataSource: [],
      closeInputData: {
        defaultValue: "0.5",
        placeholder: "",
        value: "0.5",
      },
      closePositionData: {
        itemData: {
          estimated: "",
          iconUrl: "",
          isLoading: true,
        },
      },
      leveragePositions: "",
      tokenList: [],
      addMarginInputData: {
        defaultValue: "",
        placeholder: "",
        value: "",
        autoFocus: true,
      },
      seletCurrent: {},
      selectDatas: {
        defaultValue: "",
        optionsData: [],
      },
      curCount: 0,
      isMobile: false,
      dialogFlag: false,
      closePositionFlag: false,
      isLoading: false,
      columns,
      pagination: {
        defaultPageSize: 8,
        hideOnSinglePage: true,
      },
      cacheData: [],
    };
  },
  beforeDestory() {
    if (this.timer) clearInterval(this.timer);
  },
  destroyed() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    // 解决graph同步慢问题；对比数据，进行更新；
    compareData() {},

    getliquidationPrice(type, collateralToken, collateralAmount) {
      const action = type === "LONG" ? liquidationPriceLong : liquidationPriceShort;
      const logObj = {
        type: type === "LONG" ? "liquidationPriceLong" : "liquidationPriceShort",
        collateralToken: collateralToken,
        collateralAmount: collateralAmount,
      };
      action(collateralToken, collateralAmount).then((res) => {
        const result = Number(res) === 0 ? 0 : res;
        this.liquidationPrice = fixD(result, 2);
        this.liquidationPriceDetail = fixD(result, 5);
      });
    },
    // 解决graph同步慢问题；
    rotationData() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (
          ((this.depositsData && this.depositsData.length > 0) ||
            (this.borrowsData && this.borrowsData.length > 0)) &&
          this.order.length <= 0 &&
          this.dsaAccount
        ) {
          if (this.count < 5) {
            this.$store.dispatch(`dsa/${GETUSERORDER}`, {
              account: this.dsaAccount,
              isSleep: true,
            });
            this.count++;
          }
        }
      }, 1000);
    },
    async disposeDatas() {
      let newDatas = [];
      let orderLongList = [];
      let orderShortList = [];

      if (
        ((this.depositsData && this.depositsData.length > 0) ||
          (this.borrowsData && this.borrowsData.length > 0)) &&
        (!this.order || this.order.length <= 0)
      ) {
        this.rotationData();
        return;
      }

      // if (
      //   this.depositsData &&
      //   this.depositsData.length > 0 &&
      //   this.borrowsData &&
      //   this.borrowsData.length > 0
      // ) {
      //   if (
      //     this.cacheData &&
      //     this.cacheData.length > 0 &&
      //     this.accountDepositeStableTokens &&
      //     this.accountDepositeStableTokens.length > 0
      //   ) {
      //     let oldAmount = this.cacheData[0].amount;
      //     let newAmount = this.accountDepositeStableTokens[0].amoun;
      //     console.log(oldAmount === newAmount);
      //     if (oldAmount === newAmount) {
      //       if (this.timer) clearInterval(this.timer);
      //       this.timer = window.setInterval(() => {
      //         this.$store.dispatch(`dsa/${GETUSERORDER}`, {
      //           account: this.dsaAccount,
      //           isSleep: true,
      //         });
      //       });
      //       return;
      //     }

      //   }
      // }

      const listLeverage = await listLeverageToken();
      if (!listLeverage) return newDatas;
      if (this.dsaAccount && this.order && this.order.length > 0) {
        try {
          const symbol = this.toLocaleUpperCase(listLeverage[0].symbol);
          const token = listLeverage[0].token;

          if (this.depositsData && this.depositsData.length > 0 && this.order) {
            const longData = this.filterData(this.depositsData, symbol, "deposits");
            if (longData && longData.length === 1) {
              this.getliquidationPrice("LONG", longData[0].token, longData[0].amountDetail);
            }
            orderLongList = await this.conformityData("LONG", longData, symbol, token);
          }
          if (this.borrowsData && this.borrowsData.length > 0 && this.order) {
            const shortData = this.filterData(this.borrowsData, symbol, "deposits");
            if (shortData && shortData.length === 1) {
              this.getliquidationPrice("SHORT", shortData[0].token, shortData[0].amountDetail);
            }
            orderShortList = await this.conformityData("SHORT", shortData, symbol, token);
          }
          const res = orderLongList.concat(orderShortList);

          this.dataSource = res && res.length > 0 ? res : [];
          this.$store.dispatch(`dsa/${SETORDERDATASOURCES}`, this.dataSource);
        } catch (error) {
          console.log(error);
          this.$store.dispatch(`dsa/${SETORDERDATASOURCES}`, []);
        }
      }
    },
    async getCost(data, token = "token", amount = "amount") {
      let res = 0;
      if (data && data.length > 0) {
        let priceRequestList = [];
        let decimalRequestList = [];
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          priceRequestList.push(fetchTokenPrice(item[token]));
          decimalRequestList.push(getTokenSymbolDecimal(item[token]));
          // const price = await fetchTokenPrice(item[token]);
          // const decimal = await getTokenSymbolDecimal(item.token);
          // const amoun = convertBigNumberToNormal(item[amount], decimal);
          // const cost = new BigNumber(amoun).times(new BigNumber(price)).toFixed();
          // res = new BigNumber(res).plus(new BigNumber(cost)).toFixed();
        }
        const allRquestList = priceRequestList.concat(decimalRequestList);
        const allListRes = await Promise.all(allRquestList);
        // const priceList = await Promise.all(priceRequestList);
        // const decimalList = await Promise.all(decimalRequestList);
        for (let index = 0; index < data.length; index++) {
          let item = data[index];
          let price = allListRes[index];
          let decimal = allListRes[data.length + index];
          const amoun = convertBigNumberToNormal(item[amount], decimal);
          const cost = new BigNumber(amoun).times(new BigNumber(price)).toFixed();
          res = new BigNumber(res).plus(new BigNumber(cost)).toFixed();
        }
      }
      return res;
    },
    async calculateFees() {
      if (
        this.dataSource.length < 1 ||
        this.exhibitData.length < 1 ||
        !this.isGetPosition ||
        this.order.length < 1
      ) {
        return [];
      }

      // let borrow = this.getCost(this.borrowsData, "token", "amountDetail");
      // let deposit = this.getCost(this.depositsData, "token", "amountDetail");

      // (当前aave的borrow的总价值-开仓时放到borrow的数量*当前价格 )-(当前aave的deposit的总价值-开仓时放到deposit的数量*当前价格)
      const borrow = this.exhibitData.filter((item) => item.name && item.name === "BORROWED");
      const deposit = this.exhibitData.filter((item) => item.name && item.name === "COLLATERAL");
      if (!borrow || !deposit) return;
      // 当前aave的borrow的总价值
      const borrowCost = borrow && borrow[0] && borrow[0].amount ? borrow[0].amount : 0;
      // 当前aave的deposit的总价值
      const depositCost = deposit && deposit[0] && deposit[0].amount ? deposit[0].amount : 0;
      // add margin 的总价值；
      const allRuqestList = [
        this.getCost(this.accountDepositeStableTokens),
        this.getCost(this.accountBorrows),
        this.getCost(this.accountDeposits),
      ];
      // const addMarginCost = await this.getCost(this.accountDepositeStableTokens);
      // const openBorrowsCost = await this.getCost(this.accountBorrows);
      // const openDepositCost = await this.getCost(this.accountDeposits);
      const [addMarginCost, openBorrowsCost, openDepositCost] = await Promise.all(allRuqestList);

      // (当前aave的borrow的总价值-开仓时放到borrow的数量*当前价格 )
      const r1 = new BigNumber(borrowCost).minus(new BigNumber(openBorrowsCost)).toFixed();

      // Long: (当前aave的borrow的总价值-开仓时放到borrow的数量*当前价格 ) - (当前aave的deposit的总价值-开仓时放到deposit的数量*当前价格 - accountDepositeStableTokens 接口拿到的Token的价值)  == 原来的Fee + accountDepositeStableTokens 接口拿到的Token的价值
      // Short：(当前aave的borrow的总价值-开仓时放到borrow的数量*当前价格 ) - (当前aave的deposit的总价值 - accountDepositeStableTokens 接口拿到的Token的价值  )
      let r2 =
        this.positonDefType === 1
          ? new BigNumber(depositCost)
              .minus(new BigNumber(openDepositCost))
              .minus(new BigNumber(addMarginCost))
              .toFixed()
          : new BigNumber(depositCost).minus(new BigNumber(addMarginCost)).toFixed();

      const fees = new BigNumber(r1).minus(new BigNumber(r2)).toFixed();
      const fixDFees = fixD(fees, 2);
      const fixDDetailFees = fixD(fees, 5);

      this.fees = Number(fixDFees) === 0 ? "0.00" : fixDFees;
      this.feesDetail = Number(fixDDetailFees) === 0 ? "0.00000" : fixDDetailFees;

      const sumPnl = this.dataSource.reduce(
        (pre, cur) => new BigNumber(pre).plus(cur.pnlDetail).toFixed(),
        0
      );

      const pnlRes = new BigNumber(sumPnl).minus(new BigNumber(fees)).toFixed();
      const fixDPnl = fixD(pnlRes, 2);
      const fixDDetailPnl = fixD(pnlRes, 5);
      const pnl = Number(fixDPnl) === 0 ? "0.00" : fixDPnl;
      const pnlDetail = Number(fixDDetailPnl) === 0 ? "0.00000" : fixDDetailPnl;

      this.totalPNL = {
        pnl: pnl,
        detailPnl: pnlDetail,
      };
    },
    filterData(data, symbol, value) {
      if (!data || !symbol || !value) return [];
      return data.filter((item) => {
        return this.toLocaleUpperCase(symbol) !== this.toLocaleUpperCase(item[value]);
      });
    },
    toLocaleUpperCase(params) {
      if (typeof params === "string") return params.toLocaleUpperCase();
      throw new Error("toLowerCase only allows strings");
    },
    async conformityData(type, data, symbol, token) {
      let newDatas = [];
      if (!type || !data || !symbol || !token) return newDatas;
      const decimalRequestList = [];
      const priceRequestList = [];
      const unitRequestList = [];

      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        decimalRequestList.push(getTokenSymbolDecimal(item.token));
        priceRequestList.push(fetchTokenPrice(item.token));
        unitRequestList.push(getSymbol(item.token));
      }
      let allRquestList = decimalRequestList.concat(priceRequestList).concat(unitRequestList);
      const allListRes = await Promise.all(allRquestList);
      const baseDecimal = await getTokenSymbolDecimal(token);
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        const orderFilterData = this.order.filter(
          (ite) =>
            ite.token.toLocaleUpperCase() === item.token.toLocaleUpperCase() &&
            ite.direction.toLocaleUpperCase() === type
        );

        // const decimal = await getTokenSymbolDecimal(item.token);
        const decimal = allListRes[index];
        const cost = orderFilterData && orderFilterData[0] ? orderFilterData[0].cost : 0;
        const costToNormal = convertBigNumberToNormal(cost, baseDecimal);
        const positionDetail = item.amountDetail;
        // const price = await fetchTokenPrice(item.token);
        const price = allListRes[data.length + index];

        // const unit = await getSymbol(item.token);
        const unit = allListRes[data.length + data.length + index];
        // unit === "WBTC" ? convertBigNumberToNormal(costToNormal, 10) :
        const costRes = costToNormal;
        const allCost = new BigNumber(positionDetail).times(new BigNumber(price)).toFixed();
        // const pnl = new BigNumber(allCost).minus(new BigNumber(costRes)).toFixed();
        const long_pnl = new BigNumber(allCost).minus(new BigNumber(costRes)).toFixed();
        const short_pnl = new BigNumber(costRes).minus(new BigNumber(allCost)).toFixed();
        const pnl = type === "LONG" ? long_pnl : short_pnl;
        newDatas.push({
          value: item.value,
          valueDetail: item.valueDetail,
          baseWorth: allCost,
          fixedWorth: fixD(allCost, 2),
          fixedDetailWorth: fixD(allCost, 5),
          key: `${unit}_${symbol}_${type}_${index}`,
          allCost: allCost,
          symbol: symbol,
          supplyToken: token,
          cost: cost,
          costToNormal: costToNormal,
          decimal: decimal,
          position: toFixed4(positionDetail),
          positionDetail: positionDetail,
          price: price,
          holding: type,
          direction: type,
          token: item.token,
          unit: unit,
          pnl: toFixed4(pnl),
          pnlDetail: pnl,
          iconUrl: require(`../../../../../assets/icon/${symbol}.png`),
        });
      }

      return newDatas;
    },
    actionError(status) {
      this.$message.error({
        content: this.errorMap[status],
        key: "ERROR",
        duration: 2,
      });
    },
    checkToleranceValue() {
      if (Number(this.toleranceValue) < 0.01) {
        this.actionError(0);
        return false;
      }
      if (Number(this.toleranceValue) > 50) {
        this.actionError(1);
        return false;
      }
      return true;
    },
    inputChangeLogic() {
      if (!this.checkToleranceValue()) {
        return;
      }
      this.estimatedLoading = true;
      const params = {
        holding: this.toLocaleUpperCase(this.closePositionData.itemData.holding),
        supplyToken: this.closePositionData.itemData.supplyToken.toLowerCase(),
        collateralToken: this.closePositionData.itemData.token.toLowerCase(),
        collateralAmount: Number(this.closePositionData.itemData.positionDetail),
        swapLossTolerance: this.toleranceValue,
      };
      this.estimatedCloseReturn(params)
        .then((res) => {
          this.estimatedLoading = false;
          this.closePositionData.itemData.estimated = res ? toFixed4(res) : "0";
        })
        .catch((e) => {
          this.estimatedLoading = false;
        });
    },
    beforCloseChangeTolerance() {
      if (Number(this.toleranceValue) < 0.01) {
        this.closeInputData.value = this.closeInputData.defaultValue;
      }
      if (Number(this.toleranceValue) > 50) {
        this.closeInputData.value = 50;
      }
    },
    handleInputChange() {
      this.estimatedLoading = true;
      this.estimatedCloseReturn(this.closePositionData.itemData)
        .then((res) => {
          this.estimatedLoading = false;
          this.closePositionData.itemData.estimated = res ? toFixed4(res) : "0";
        })
        .catch((e) => {
          this.estimatedLoading = false;
        });
    },
    handlePropsInputChange: VueDebounce("inputChangeLogic", 500),
    handleClose(v) {
      this.estimatedLoading = true;
      this.closePositionData.itemData = v;
      const params = {
        holding: this.toLocaleUpperCase(v.holding),
        supplyToken: v.supplyToken.toLowerCase(),
        collateralToken: v.token.toLowerCase(),
        collateralAmount: Number(v.positionDetail),
        swapLossTolerance: this.toleranceValue,
      };
      this.estimatedCloseReturn(params)
        .then((res) => {
          this.estimatedLoading = false;
          this.closePositionData.itemData.estimated = res ? toFixed4(res) : "0";
        })
        .catch((e) => {
          this.estimatedLoading = false;
        });
      this.closePositionFlag = true;
    },
    async estimatedCloseReturn(params) {
      const estimateTokenFun =
        params.holding === "LONG" ? estimatedLongCloseReturn : estimatedShortCloseReturn;
      return await estimateTokenFun(
        params.supplyToken,
        params.collateralToken,
        params.collateralAmount,
        params.swapLossTolerance
      );
    },
    resize() {
      const that = this;
      let screenWidth = document.body.clientWidth;
      let _isMobile = screenWidth <= 750;
      that.isMobile = _isMobile;
      this.curCount = 1;
      window.onresize = () => {
        screenWidth = document.body.clientWidth;
        return (() => {
          this.$nextTick(() => {
            this.curCount += 1;
            _isMobile = screenWidth <= 750;
            that.isMobile = _isMobile;
          });
        })();
      };
    },
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
        const defaultValue = this.tokenList[0].value;
        this.selectDatas = {
          defaultValue: defaultValue,
          optionsData: arr,
        };
        this.seletCurrent = this.selectDatas.optionsData.find(
          (item) => item.value === defaultValue
        );
      }
    },
    handleSelectChange(v) {
      this.seletCurrent = this.selectDatas.optionsData.find((item) => item.value === v);
    },
    testLimit() {
      if (this.addMarginInputData.value > 1000) {
        this.$message.error({
          content: `No more than 1,000 DAI`,
          key: "ERROR",
          duration: 2,
        });
        return false;
      }
      return true;
    },
    handleConfirm() {
      if (!this.addMarginInputData.value) {
        this.$message.error({
          content: "Can't be empty",
          key: "CONFIRM",
          duration: 2,
        });
        return;
      }
      // if (!this.testLimit()) return;
      const callback = {
        onConfirmation: (confirmationNumber) => {
          if (confirmationNumber === 1) {
            this.updateOrder();
            this.marginBtnLoading = false;
            this.$bus.emit("CLOSEFINISH", true);
            this.closePositionFlag = false;
            this.dialogFlag = false;
          }
        },
        onError: () => {
          this.marginBtnLoading = false;
          this.dialogFlag = false;
        },
      };
      try {
        this.marginBtnLoading = true;
        // addMarigin前，缓存一份accountDepositeStableTokens数据,进行刷新后的新数据进行对比；
        this.cacheData = this.accountDepositeStableTokens;
        addMargin(this.seletCurrent.address, Number(this.addMarginInputData.value), callback)
          .then((res) => {})
          .catch((e) => {
            this.marginBtnLoading = false;
          });
      } catch (error) {
        this.marginBtnLoading = false;
      }
    },
    updateOrder() {
      this.$store.dispatch(`dsa/${GETSTKAAVEBALANCE}`);
      this.$store.dispatch(`dsa/${GETDEPOSITSDATA}`, this.currentPositionType);
      this.$store.dispatch(`dsa/${GETBORROWDATA}`, this.currentPositionType);
      this.$store.dispatch(`dsa/${GETUSERORDER}`, {
        account: this.dsaAccount,
        isSleep: true,
      });
      this.$store.dispatch(`dsa/${SETEXHIBITDATA}`);
    },
    loginLogic() {
      this.$bus.emit("showLogin", true);
    },
    addMarginLogic() {
      this.getTokenList();
      // getTokenSymbolName();
      this.dialogFlag = true;
    },
    handleAddMargin() {
      const funMap = new Map([
        [1, () => this.loginLogic()],
        [2, () => this.addMarginLogic()],
      ]);
      return funMap.get(this.currentStatus)();
    },
    handlePopupClose() {
      this.dialogFlag = false;
    },
    handleClosePositionConfirm(inputValue, dialogFlag, { itemData }) {
      if (!this.checkToleranceValue()) {
        return;
      }
      const direction = itemData.direction.toLowerCase();
      const actionFunction = direction === "long" ? "cleanLongPosition" : "cleanShortPosition";
      const params = {
        supplyToken: this.cloasePositionConfirmData.supplyToken,
        collateralToken: this.cloasePositionConfirmData.collateralToken,
        collateralAmount: Number(this.cloasePositionConfirmData.collateralAmount),
        swapLossTolerance: Number(this.cloasePositionConfirmData.swapLossTolerance),
        callback: {
          onConfirmation: (confirmationNumber) => {
            if (confirmationNumber === 1) {
              this.updateOrder();
              this.btnLoading = false;
              this.closePositionFlag = false;
              this.$bus.emit("CLOSEFINISH", true);
            }
          },
          onError: (error) => {
            this.btnLoading = false;
            // this.closePositionFlag = false;
          },
        },
      };
      this.btnLoading = true;
      ChfryDSA[actionFunction](
        params.supplyToken,
        params.collateralToken,
        params.collateralAmount,
        params.swapLossTolerance,
        params.callback
      );
    },
    handlePopupClosePosition() {
      this.beforCloseChangeTolerance();
      this.closePositionFlag = false;
      this.btnLoading = false;
    },
  },
  mounted() {
    // this.isLoading = true;
    this.$nextTick(() => {
      this.resize();
    });
    if (this.dsaAccount) {
      this.$store.dispatch(`dsa/${GETUSERORDER}`, {
        account: this.dsaAccount,
        isSleep: false,
      });
      this.$store.dispatch(`dsa/${SETLIQUIDATIONVALUELONG}`);
      this.$store.dispatch(`dsa/${SETLIQUIDATIONVALUESHORT}`);
    }
    if (this.dsaAccount && this.borrowsData && this.depositsData && this.order) {
      this.disposeDatas();
    }
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
@import "./index.h5.scss";
</style>
<style lang="scss">
.m-close-position-coin {
  .num {
    .ant-spin {
      .ant-spin-dot {
        font-size: 21px !important;
        .ant-spin-dot-item {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
}
</style>
