import {
  chfryDSAInitital,
  getAccountAddress,
  getUserData,
  getBorrowsData,
  getDepositsData,
  liquidationPriceLong,
  liquidationPriceShort,
  liquidationValueLong,
  getDsaWithTypeID,
  liquidationValueShort,
  isZeroAddr,
} from "../../DSA/index";
import BigNumber from "bignumber.js";
import { thousands, toFixed2 } from "../../utils/tools";
import {
  getUserOrder,
  getAllUserReward,
  getEstimatedReward,
  getLongAndShortStkAAVEReward,
} from "../../sdk/cheese-sdk";
import { fixD } from "../../utils/common-method";
import { convertBigNumberToNormal } from "../../sdk/cheese-sdk/lib.utils";
import moment from "moment";

export const SETDSASTATUS = "SETDSASTATUS";
export const SETDSAACCOUNT = "SETDSAACCOUNT";

export const SETEXHIBITDATA = "SETEXHIBITDATA";
export const SETEXHIBITLOGING = "SETEXHIBITLOGING";

export const GETDEPOSITSDATA = "GETDEPOSITSDATA";
export const SETDEPOSITSLOADING = "SETDEPOSITSLOADING";

export const GETBORROWDATA = "GETBORROWDATA";
export const SETBORROWLOADING = "SETBORROWLOADING";

export const GETUSERORDER = "GETUSERORDER";
export const GETUSERORDERLOADING = "GETUSERORDERLOADING";
export const SETORDERDATASOURCES = "SETORDERDATASOURCES";

export const SETALLLOADING = "SETALLLOADING";

export const SETCURRENTPOSITIONSTATUS = "SETCURRENTPOSITIONSTATUS";

export const SETISAPPROVED = "SETISAPPROVED";

export const SETLIQUIDATIONPRICE = `SETLIQUIDATIONPRICE`;
export const SETLIQUIDATIONVALUELONG = `SETLIQUIDATIONVALUELONG`;
export const SETLIQUIDATIONVALUESHORT = `SETLIQUIDATIONVALUESHORT`;

export const GETUSERREWARD = "GETUSERREWARD";

export const GETSTKAAVEBALANCE = "GETSTKAAVEBALANCE";

const formatDate = (timestamp) => moment.unix(timestamp).utc().format("YYYY-MM-DD");

const rinseData = (data = [], imgWhiteList) => {
  if (!data) return data;
  const datas = JSON.parse(JSON.stringify(data));
  const whitePic = imgWhiteList;
  const arr = [];
  datas.forEach((item) => {
    if (Number(fixD(item.value, 7)) > 0.000001) {
      const pic = item.borrow || item.deposit;
      const value = Number(fixD(item.value, 5)) < 0.00001 ? "<0.00001" : fixD(item.value, 2);
      const valueDetail = Number(fixD(item.value, 5)) < 0.00001 ? "<0.00001" : fixD(item.value, 5);
      arr.push({
        token: item.token,
        key: item.id,
        deposits: item.borrow || item.deposit || "0",
        amount: fixD(item.amount, 2),
        amountDetail: item.amount,
        value: "$" + value,
        valueDetail: "$" + valueDetail,
        initialValue: fixD(item.value, 5),
        apy: fixD(item.apy, 2) + "%",
        apyDetail: fixD(item.apy, 5) + "%",
        apr: fixD(item.incentiveAPR, 2) + "%",
        aprDetail: fixD(item.incentiveAPR, 5) + "%",
        url: require(`../../assets/newFlash/${whitePic.includes(pic) ? pic : "newLogo"}.svg`),
      });
    }
  });
  return arr;
};

const state = {
  // imgWhiteList: ["ETH", "DAI", "WBTC", "USDT", "AAVE", "MKR", "CRV", "MANA", "YFI", "UNI", "USDC"],
  imgWhiteList: ["ETH", "DAI", "WBTC", "USDT", "USDC"],
  dsaAccount: "",
  isApproved: false,
  repayAndWithdrawLimit: 1,
  isLoginDSA: false,
  isCreatedAccount: false,
  initialSuccess: false,
  exhibitData: [],
  exhibitLoding: false,
  borrowsData: [],
  borrowsLoading: false,
  depositsData: [],
  depositsLoading: false,
  order: [],
  orderLoading: false,
  orderDataSources: [],
  accountBorrows: [],
  accountDeposits: [],
  accountDepositeStableTokens: [],
  // 2-long  3-short
  currentPositionType: 1,
  liquidationPrice: 0,
  liquidationValueLong: 0,
  liquidationValueShort: 0,

  userReward: [],
  userTotalReward: 0,
  userRewardLoading: false,
  stkAAVEbalance: 0,
};

const mutations = {
  [GETSTKAAVEBALANCE](state, payload) {
    state.stkAAVEbalance = payload;
  },
  [SETDSASTATUS](state, payload) {
    state.initialSuccess = payload.initialSuccess;
    state.isCreatedAccount = payload.isCreatedAccount;
  },
  [GETUSERREWARD](state, payload) {
    const arr = [];
    let userTotalReward = 0;
    state.userRewardLoading = payload.userRewardLoading;
    const mapTime = {};
    // 取时间
    if (
      payload &&
      payload.userReward &&
      payload.userReward.totalScoreAndRewards &&
      payload.userReward.totalScoreAndRewards.length > 0
    ) {
      payload.userReward.totalScoreAndRewards.forEach((item) => {
        mapTime[item.epochRound] = {
          startUnixTimestamp: item.start,
          endUnixTimestamp: item.end,
          startUTCTime: formatDate(item.start),
          endUTCTime: formatDate(item.end),
        };
      });
    }
    //取奖励
    if (payload && payload.userReward) {
      if (payload.userReward.rewardsWithClaims && payload.userReward.rewardsWithClaims.length > 0) {
        payload.userReward.rewardsWithClaims.forEach((item) => {
          if (item && item.RewardList && item.RewardList.length > 0) {
            item.RewardList.forEach((itemReward, index) => {
              if (
                Number(itemReward) > 0 &&
                fixD(convertBigNumberToNormal(itemReward), 5) > 0.00001
              ) {
                const currentEpoch = index + 1;
                const currentEpochTime = mapTime[currentEpoch];
                const timeText = currentEpochTime.startUTCTime
                  ? `${currentEpochTime.startUTCTime} ~ ${currentEpochTime.endUTCTime}`
                  : `EPOCH: ${currentEpoch}`;
                arr.push({
                  EOA: item.EOA,
                  RewardList: item.RewardList,
                  epochRound: currentEpoch,
                  id: item.EOA,
                  isBorder: false,
                  time: timeText,
                  title: "CLAIMABLE REWARDS",
                  amount: itemReward,
                  buttonText: "CLAIM",
                  url: require("../../assets/icon/CHEESE.svg"),
                  loading: false,
                  disabled: false,
                  isShowButton: true,
                });
              }
              userTotalReward = new BigNumber(userTotalReward)
                .plus(new BigNumber(itemReward))
                .toFixed();
            });
          }
        });
      }
      //取预估奖励
      if (
        payload.userReward.rewards &&
        payload.userReward.rewards.length > 0 &&
        payload.userReward.rewards[0] &&
        payload.userReward.rewards[0].RewardList &&
        payload.userReward.rewards[0].RewardList.length > 0
      ) {
        // 获取rewardsWithClaims的length
        const rewardListIndex = payload.userReward.rewardsWithClaims[0].RewardList.length - 1;
        payload.userReward.rewards[0].RewardList.forEach((item, index) => {
          /**
           * 如果rewards接口中有，rewardsWithClaims没有，则相加
           * rewards必定有，rewardsWithClaims不一定有；
           * rewardsWithClaims中没有的原因的在当前周期，还没有发放奖励
           */
          if (index > rewardListIndex) {
            userTotalReward = new BigNumber(userTotalReward).plus(new BigNumber(item)).toFixed();
          }
        });
        let estimatedRewardArr = [
          {
            isBorder: true,
            title: "ESTIMATED REWARDS",
            amount: userTotalReward,
            buttonText: "CLAIM",
            url: require("../../assets/icon/CHEESE.svg"),
            loading: false,
            disabled: false,
            isShowButton: false,
          },
        ];
        state.userTotalReward = fixD(convertBigNumberToNormal(userTotalReward), 2);
        state.userReward = estimatedRewardArr.concat(arr);
      } else {
        state.userReward = arr;
      }
    }
  },

  [SETLIQUIDATIONVALUELONG](state, payload) {
    state.liquidationValueLong = payload;
  },
  [SETLIQUIDATIONVALUESHORT](state, payload) {
    state.liquidationValueShort = payload;
  },
  [SETLIQUIDATIONPRICE](state, payload) {
    state.liquidationPrice = payload;
  },
  [SETISAPPROVED](state, payload) {
    state.isApproved = payload;
  },
  [SETCURRENTPOSITIONSTATUS](state, payload) {
    state.currentPositionType = payload;
  },
  [SETEXHIBITLOGING](state, payload) {
    state.exhibitLoding = payload;
  },
  [SETDSAACCOUNT](state, payload) {
    state.dsaAccount = payload;
  },
  [SETEXHIBITDATA](state, payload) {
    state.exhibitData = payload;
  },
  [GETDEPOSITSDATA](state, payload) {
    state.depositsData = payload;
  },
  [GETBORROWDATA](state, payload) {
    state.borrowsData = payload;
  },

  [SETBORROWLOADING](state, payload) {
    state.borrowsLoading = payload;
  },
  [SETDEPOSITSLOADING](state, payload) {
    state.depositsLoading = payload;
  },
  [SETORDERDATASOURCES](state, payload) {
    state.orderDataSources = payload;
  },
  // order
  [GETUSERORDER](state, payload) {
    if (payload && payload.leveragePositions && payload.leveragePositions.length > 0) {
      state.order = payload.leveragePositions;
    } else {
      state.order = [];
    }
    if (payload && payload.accountBorrows && payload.accountBorrows.length > 0) {
      state.accountBorrows = payload.accountBorrows;
    } else {
      state.accountBorrows = [];
    }
    if (payload && payload.accountDeposits && payload.accountDeposits.length > 0) {
      state.accountDeposits = payload.accountDeposits;
    } else {
      state.accountDeposits = [];
    }
    if (
      payload &&
      payload.accountDepositeStableTokens &&
      payload.accountDepositeStableTokens.length > 0
    ) {
      state.accountDepositeStableTokens = payload.accountDepositeStableTokens;
    } else {
      state.accountDepositeStableTokens = [];
    }
  },
  [GETUSERORDERLOADING](state, payload) {
    state.orderLoading = payload;
  },
};

const actions = {
  [GETSTKAAVEBALANCE]({ commit }) {
    Promise.all([getDsaWithTypeID(1), getDsaWithTypeID(2)]).then((result) => {
      const [account1, account2] = result;
      const addr1 = isZeroAddr(account1) ? undefined : account1;
      const addr2 = isZeroAddr(account2) ? undefined : account2;
      getLongAndShortStkAAVEReward(addr1, addr2).then((res) => {
        commit(GETSTKAAVEBALANCE, res);
      });
    });
  },
  [SETDSASTATUS]({ commit }, type) {
    commit(SETDSASTATUS, {
      initialSuccess: false,
      isCreatedAccount: false,
    });
    chfryDSAInitital(type).then((res) => {
      commit(SETDSASTATUS, res);
    });
  },
  [GETUSERREWARD]({ commit }, account) {
    commit(GETUSERREWARD, {
      userReward: [],
      userRewardLoading: true,
    });

    getEstimatedReward(account)
      .then((res) => {
        commit(GETUSERREWARD, {
          userReward: res,
          userRewardLoading: false,
        });
      })
      .catch(() => {
        commit(GETUSERREWARD, {
          userReward: [],
          userRewardLoading: false,
        });
      });
  },

  [SETLIQUIDATIONPRICE]({ commit }, payload) {
    commit(SETLIQUIDATIONPRICE, payload);
  },
  [SETLIQUIDATIONVALUELONG]({ commit }, payload) {
    liquidationValueLong()
      .then((res) => {
        commit(SETLIQUIDATIONVALUELONG, res);
      })
      .catch(() => {
        commit(SETLIQUIDATIONVALUELONG, 0);
      });
  },
  [SETLIQUIDATIONVALUESHORT]({ commit }, payload) {
    liquidationValueShort()
      .then((res) => {
        commit(SETLIQUIDATIONVALUESHORT, res);
      })
      .catch(() => {
        commit(SETLIQUIDATIONVALUESHORT, 0);
      });
  },
  [SETISAPPROVED]({ commit }, payload) {
    commit(SETISAPPROVED, payload);
  },
  [SETCURRENTPOSITIONSTATUS]({ commit }, type) {
    commit(SETCURRENTPOSITIONSTATUS, type);
  },
  [SETORDERDATASOURCES]({ commit }, data) {
    commit(SETORDERDATASOURCES, data);
  },
  [GETUSERORDER]({ commit }, { account, isSleep }) {
    commit(GETUSERORDER, []);
    commit(GETUSERORDERLOADING, true);
    getUserOrder(account, isSleep)
      .then((res) => {
        commit(GETUSERORDERLOADING, false);
        commit(GETUSERORDER, res);
      })
      .catch(() => {
        commit(GETUSERORDERLOADING, false);
      });
  },
  [SETDSAACCOUNT]({ commit }, accountType) {
    getAccountAddress(accountType).then((res) => {
      commit(SETDSAACCOUNT, res);
    });
  },
  [GETDEPOSITSDATA]({ commit, state }, type) {
    commit(GETDEPOSITSDATA, []);
    commit(SETDEPOSITSLOADING, true);
    const { imgWhiteList } = state;
    getDepositsData(type)
      .then((res) => {
        const data = rinseData(res, imgWhiteList);
        commit(GETDEPOSITSDATA, data);
        commit(SETDEPOSITSLOADING, false);
      })
      .catch(() => {
        commit(SETDEPOSITSLOADING, false);
      });
  },
  [GETBORROWDATA]({ commit, state }, type) {
    commit(GETBORROWDATA, []);
    commit(SETBORROWLOADING, true);
    const { imgWhiteList } = state;
    getBorrowsData(type)
      .then((res) => {
        const data = rinseData(res, imgWhiteList);
        commit(SETBORROWLOADING, false);
        commit(GETBORROWDATA, data);
      })
      .catch(() => {
        commit(SETBORROWLOADING, false);
      });
  },
  [SETEXHIBITDATA]({ commit }) {
    commit(SETEXHIBITLOGING, true);
    commit(SETEXHIBITDATA, []);

    getUserData()
      .then((res) => {
        if (res.length > 0) {
          let arr = [];
          const arrPushFun = (item, title, params) => {
            const amount = new BigNumber(item.value || 0).toFixed(2);
            const percentageWhiteList = [4, 5, 6];
            const isPercentage = percentageWhiteList.includes(params.sort);

            const percentage = isPercentage ? "%" : params.sort === 3 ? "" : "$";
            const amountThousands = !isPercentage
              ? `${percentage}${thousands(amount)}`
              : `${thousands(amount)}${percentage}`;
            arr.push({
              number: item.value,
              amount: item.value || 0 + percentage,
              amountThousands: amountThousands,
              title: title,
              name: item.name,
              ...params,
            });
          };
          const popoverText = (text, popover = true) => {
            return {
              popover: popover,
              popoverText: [
                {
                  text: text,
                },
              ],
            };
          };
          res.forEach((item) => {
            if (item.name === "COLLATERAL") {
              arrPushFun(item, "COLLATERAL", {
                sort: 1,
              });
            }
            if (item.name === "HEALTH_FACTOR") {
              const text = popoverText(
                "The health factor represents the safety of your loan derived from the proportion of collateral versus amount borrowed. Keep it above 1 to avoid liquidation."
              );
              arrPushFun(item, "HEALTH FACTOR", {
                ...text,
                sort: 3,
              });
            }
            if (item.name === "LIQUIDATION_THRESHOLD") {
              arrPushFun(item, "LIQUIDATION THRESHOLD", {
                sort: 6,
              });
            }
            if (item.name === "BORROWED") {
              arrPushFun(item, "BORROWED", {
                sort: 2,
              });
            }
            if (item.name === "CURRENT_LTV") {
              arrPushFun(item, "CURRENT LTV", {
                sort: 4,
              });
            }
            if (item.name === "MAX_LTV") {
              const text = popoverText(
                "The Maximum Loan-to-Value ratio represents the maximum borrowing power of a specific collateral. For example, if a collateral has a LTV of 75%, the user can borrow up to 0.75 worth of ETH in the principal currency for every 1 ETH worth of collateral."
              );
              arrPushFun(item, "MAXIMUM  LTV", {
                ...text,
                sort: 5,
              });
            }
          });
          const sortDatas = arr.sort((a, b) => {
            return a.sort - b.sort;
          });
          commit(SETEXHIBITDATA, sortDatas);
          commit(SETEXHIBITLOGING, false);
        }
      })
      .catch((e) => {
        commit(SETEXHIBITLOGING, false);
        console.log(e);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
