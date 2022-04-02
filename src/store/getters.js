const getters = {
  account: (state) => state.user.account, //用户账号
  config: (state) => state.user.config, //链 配置{ chain:"",chainID:0,}
  balances: (state) => state.user.balances, //用户token 列表
  isLogin: (state) => state.user.isLogin, //
  curFryerAddress: (state) => state.user.curFryerAddress, //
  curOvenAddress: (state) => state.user.curOvenAddress, //
  curPoolAddress: (state) => state.user.curPoolAddress, //
  cheesePools: (state) => state.user.cheesePools, //
  curCheesePool: (state) => state.user.curCheesePool, //
  isMobile: (state) => state.user.isMobile,
  isLoginDSA: (state) => state.dsa.isLoginDSA, //
  dsaAccount: (state) => state.dsa.dsaAccount, //
  exhibitData: (state) => state.dsa.exhibitData, //
  isCreatedAccount: (state) => state.dsa.isCreatedAccount, //
  initialSuccess: (state) => state.dsa.initialSuccess, //
  isApproved: (state) => state.dsa.isApproved, //

  imgWhiteList: (state) => state.dsa.imgWhiteList, //
  borrowsData: (state) => state.dsa.borrowsData, //
  borrowsLoading: (state) => state.dsa.borrowsLoading, //
  depositsData: (state) => state.dsa.depositsData, //
  depositsLoading: (state) => state.dsa.depositsLoading, //
  order: (state) => state.dsa.order, //
  orderLoading: (state) => state.dsa.orderLoading, //
  exhibitLoding: (state) => state.dsa.exhibitLoding, //
  accountBorrows: (state) => state.dsa.accountBorrows, //
  accountDeposits: (state) => state.dsa.accountDeposits, //
  accountDepositeStableTokens: (state) => state.dsa.accountDepositeStableTokens, //
  currentPositionType: (state) => state.dsa.currentPositionType, //
  liquidationValueLong: (state) => state.dsa.liquidationValueLong, //
  liquidationValueShort: (state) => state.dsa.liquidationValueShort, //

  userReward: (state) => state.dsa.userReward, //
  userRewardLoading: (state) => state.dsa.userRewardLoading, //
  orderDataSources: (state) => state.dsa.orderDataSources, //
  repayAndWithdrawLimit: (state) => state.dsa.repayAndWithdrawLimit, //
  userTotalReward: (state) => state.dsa.userTotalReward, //

  stkAAVEbalance: (state) => state.dsa.stkAAVEbalance, //
};
export default getters;
