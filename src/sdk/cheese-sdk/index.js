"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashLoanClaimed = exports.flashTotalClaimeds = exports.flashLoanList = exports.test = exports.claim = exports.exchange = exports.ovenExchange = exports.ovenUnstake = exports.ovenStake = exports.teamClaim = exports.teamUnstake = exports.teamStake = exports.userClaim = exports.userUnstake = exports.userStake = exports.repay = exports.liquidate = exports.borrow = exports.withdraw = exports.deposit = exports.approvePoolToken = exports.getOvenPoolInfo = exports.getTeamStakeInfo = exports.getUserStakeInfo = exports.getStakePools = exports.getCheeseEthLpPrice = exports.maxFlashLoan = exports.getPoolinfo = exports.getPoolAllowance = exports.getTokenSymbol = exports.setTokensAddress = exports.setContractAddress = exports.getTokenAddress = exports.rankList = exports.addMetamaskChain = exports.isETHAddress = exports.toPrecision = exports.getBalance = exports.connect = exports.logout = exports.sleep = exports.T = void 0;
const yearnVaultAdapter_ABI = require('../../abi/yearnVaultAdapter.json')
const harvestVaultAdapter_ABI = require('../../abi/harvestVaultAdapter.json')
const tokens_ABI = require('../../abi/token.json')
const lib_abi_1 = require("./lib_abi");
const lib_const_1 = require("./lib_const");
const newFlashBorrower = require('../../abi/newFlashBorrower.json');
const gradualUpdateAbi = require('../../abi/ido.json')
const bpool = require('../../abi/bpool.json')
const web3_1 = __importDefault(require("web3"));
const merkletreejs_1 = require("merkletreejs");
const keccak256_1 = __importDefault(require("keccak256"));
const ethereumjs_abi_1 = require("ethereumjs-abi");
const lib_utils_1 = require("./lib.utils");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const BigNumber = require('bignumber.js');
const LEVERAGEREWARD_ABI = require('../../abi/LeverageReward.json')
const LEVERAGE_ABI = require('../../abi/leverage.json')
const EVENTCENTER_ABI = require('../../abi/eventCenter.json')
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const ABI = require("ethereumjs-abi") ;
const AAVESTAKEREWARD_ABI = require('../../abi/aaveStakeReward.json')

exports.T = lib_utils_1.Trace;
exports.sleep = lib_utils_1.sleep;
exports.logout = lib_utils_1.logout;
exports.connect = lib_utils_1.connect;
exports.getBalance = lib_utils_1.getBalance;
exports.toPrecision = lib_utils_1.toPrecision;
exports.isETHAddress = lib_utils_1.isETHAddress;
exports.addMetamaskChain = lib_utils_1.addMetamaskChain;
exports.convertBigNumberToNormal = lib_abi_1.convertBigNumberToNormal;
exports.lib_utils_1 = lib_utils_1;

async function getAllRewardBalance(account, threshold=0){
    const addr = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].aaveStakeReward;
    const stkAAVE = new lib_utils_1.web3.eth.Contract(AAVESTAKEREWARD_ABI, addr);
    return await stkAAVE.methods.getAllRewardBlanece(account, threshold).call()
}
exports.getAllRewardBalance = getAllRewardBalance;

async function getLongAndShortStkAAVEReward(longAccount, shortAccount) {
    const requestList = [];
    if(longAccount) {
        requestList.push(getAllRewardBalance(longAccount))
    }
    if(shortAccount){
        requestList.push(getAllRewardBalance(shortAccount))
    }
    const result = await Promise.all(requestList);
    const totalReward = result.reduce((pre, cur) => 
        new BigNumber(pre).plus(cur.totalReward).toFixed(),
        0
    );
    return lib_utils_1.convertBigNumberToNormal(totalReward)
}

exports.getLongAndShortStkAAVEReward = getLongAndShortStkAAVEReward;

async function claimAllAaveStakeReward(addressArr,threshold=0,callback){
    const addr = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].aaveStakeReward;
    const stkAAVE = new lib_utils_1.web3.eth.Contract(AAVESTAKEREWARD_ABI, addr);
    return lib_utils_1.executeContract(stkAAVE, "claimAllAaveStakeReward", 0, [addressArr,threshold], callback);
}
exports.claimAllAaveStakeReward = claimAllAaveStakeReward;

async function isApproved(tokenAddr='0xff795577d9ac8bd7d90ee22b6c1703490b6512fd',ownerAddr='0xcb9cc3eb527018fd9a92f434c1a2f9136168e69b',spenderAddr='0xd526377b2d6829aC6bf5F647690B59E6bc113C63'){
    const erc20 = new lib_utils_1.web3.eth.Contract(lib_abi_1.ERC20, tokenAddr);
    const allowance = await erc20.methods.allowance(ownerAddr,spenderAddr).call();
    return allowance != 0;
}
exports.isApproved = isApproved;

const getFetch = async (query,graph) => {
    const url = graph || lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].graph
    let result = await (await fetch(url, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
    })).json();
    return result;
}
async function handlerResult(result) {
    let group = {}
    const list = [];
    let totalAmount = '0'
    result.map(it => {
        if (it.tokenName === 'USDT') {
            it.amount = new BigNumber(it.amount).div(1e6).toFixed()
            it.fee = new BigNumber(it.fee).div(1e6).toFixed()
        }
        if (it.tokenName === 'USDC') {
            it.amount = new BigNumber(it.amount).div(1e6).toFixed()
            it.fee = new BigNumber(it.fee).div(1e6).toFixed()
        }
        if (it.tokenName === 'DAI') {
            it.amount = new BigNumber(it.amount).div(1e18).toFixed()
            it.fee = new BigNumber(it.fee).div(1e18).toFixed()
        }
        return it;
    }).forEach(element => {
        let value = group[element.user] || {
            list: [],
            amount: '0',
            user: element.user
        }
        value.list.push(element);
        value.amount = new BigNumber(value.amount).plus(element.amount).toFixed()
        totalAmount = new BigNumber(totalAmount).plus(element.amount).toFixed()
        group[element.user] = value
        value.user = element.user;
        list.push(value);
    });

    return {
        group, totalAmount, list,
    }
}
const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

const getBorrowsAndDeposit = async (account="",isSleep=false) => {
    const query = `{
        accountBorrows(where: {account: "${account}"}) {
          id
          EOA
          account
          token
          amount
        }
        accountDeposits(where: {account: "${account}"}) {
          id
          EOA
          account
          token
          amount
        }
    }`
     // 延迟加载，graph同步慢
     if(isSleep){
        await sleep(3000);
    }
    const url = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].dsaGraph;
    let result = await getFetch(query, url || 'https://api.thegraph.com/subgraphs/name/z-x-l/center')
    if(result.data && (result.data.accountBorrows || result.data.accountDeposits)) {
        return result.data;
    }
    return []
}
exports.getBorrowsAndDeposit = getBorrowsAndDeposit;

const getProof = (data, epochRound, selectUser) => {
    let proof = "";
    if (data && data.length > 0 && selectUser && selectUser.EOA && selectUser.reward) {
      const elements = data.map((e) => {
        const item = e.RewardList[epochRound-1];
        return keccak256(ABI.solidityPack(["address", "uint256"], [e.EOA, item]));
      });
      const tree = new MerkleTree(elements, keccak256, { sort: true });
      console.log('tree.getHexRoot()',tree.getHexRoot());
      const leaf = keccak256(
        ABI.solidityPack(["address", "uint256"], [selectUser.EOA, selectUser.reward])
      );
      const resultProof = tree.getHexProof(leaf);
      proof = resultProof;
    }
    return proof;
};
exports.getProof = getProof;

const queryBases = async (query) => {
    const url = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].dsaGraph;
    let result = await getFetch(query, url || 'https://api.thegraph.com/subgraphs/name/z-x-l/event')
    if(result.data) {
        return result.data;
    }
    return []
}
exports.queryBases = queryBases;

const getAllUserReward = async (account) => {
    const queryAccount = `{
        rewards(where: { EOA: "${account}" }) {
            EOA
            RewardList
        }
    }`
    const queryAll = `{
        rewards {
            EOA
            RewardList
        }
    }`
    const query = account ? queryAccount : queryAll;
    return await queryBases(query)
}
exports.getAllUserReward = getAllUserReward;

const getEstimatedReward = async (account) => {
    const accountEOA = account || lib_const_1.userInfo.account
    const query = `{
        totalScoreAndRewards {
            id
            epochRound
            start
            end
            TotalScore
            TotalReward
        }
        rewardsWithClaims(where: { EOA: "${accountEOA}" }) {
            EOA
            RewardList
        }
        rewards(where: { EOA: "${accountEOA}" }) {
            EOA
            RewardList
        }
    }`
    return await queryBases(query)
}
exports.getEstimatedReward = getEstimatedReward;

async function claimPositonReward(v, callback) {
    const address = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID]
    // 获取所有用户的奖励列表
    const { rewards } = await getAllUserReward()
    // 根据所有用户奖励列表和当前用户的奖励-生成证明；lib_const_1.userInfo.account
    const proof = getProof(rewards,v.epochRound, {
        EOA: lib_const_1.userInfo.account,
        reward: v.amount
    })
    // 调取奖励合约，进行领取奖励
    let clarimContract = new lib_utils_1.web3.eth.Contract(LEVERAGEREWARD_ABI, address['leverageReward']);
    console.log([v.epochRound, v.amount, proof]);
    lib_utils_1.executeContract(clarimContract, "claimPositionReward", 0, [v.epochRound, v.amount, proof], callback);
}
exports.claimPositonReward = claimPositonReward;

const getUserReward = async (account="", isSleep=false) => {
    const query = `{
        rewardsWithClaims(where: { EOA: "${account}" }) {
            RewardList
            EOA
        }
    }`
    const url = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].dsaGraph;
    let result = await getFetch(query, url || 'https://api.thegraph.com/subgraphs/name/z-x-l/event')
    if(result.data) {
        return result.data;
    }
    return []
}
exports.getUserReward = getUserReward;

const getUserOrder = async (account="",isSleep=false) => {
    console.log("🚀 ~ file: index.js ~ line 85 ~ getUserOrder ~ account", account)
    const query = `{
        leveragePositions(where: {account:"${account}"}) {
            id
            EOA
            account
            amount
            direction
            token
            cost
        }
        accountBorrows(where: {account: "${account}"}) {
            id
            EOA
            account
            token
            amount
        }
        accountDeposits(where: {account: "${account}"}) {
            id
            EOA
            account
            token
            amount
        }
        accountDepositeStableTokens(where: {account: "${account}"}) {
            id
            EOA
            account
            token
            amount
        }
    }
    `
    const url = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].dsaGraph;
    console.log("🚀 ~ file: index.js ~ line 100 ~ getUserOrder ~ url", url)
    
    // 延迟加载，graph同步慢
    if(isSleep){
        await sleep(3000);
    }
    let result = await getFetch(query, url || 'https://api.thegraph.com/subgraphs/name/z-x-l/center')
    console.log("🚀 ~ file: index.js ~ line 109 ~ getUserOrder ~ result", result)
    if(result.data) {
        return result.data;
    }
    return []
}
exports.getUserOrder = getUserOrder;

const getUseFlashloan = async (start, end) => {
    let list = []
    let skip = 0
    while (true) {
        const query = `{
            useFlashloans(orderBy:time,orderDirection:asc,first:1000,skip:${skip},where:{
               time_gt : ${start},
               time_lte : ${end}
            }){
              user,token,tokenName,amount,fee,time,id
            }
          }`
        let result = await getFetch(query)
        let data = result.data.useFlashloans
        if (data.length === 0) {
            break
        }
        skip += 1000;
        list.push(...data)
    }
    return list;
}
const getQueryBlock = async (time) => {
    let query = `{
        simpleBlocks(orderBy:time,orderDirection:asc,where:{
          time_gte:${time}
        }){
          height
          time
        }
      }`
      const result = await getFetch(query)
    const data = result.data.simpleBlocks
    return data
}
const merkleDistributors = async () => {
    let list = []
    let skip = 0
    while (true) {
        let query = `{
            merkleDistributors(orderBy:index,orderDirection:asc,first:1000,skip:${skip}){
              index,amount,settleBlocNumber
            }
          }
          `
        const result = await getFetch(query)
        const data = result.data.merkleDistributors
        if (data.length === 0) {
            break
        }
        skip += 1000;
        list.push(...data)
    }
    return list;
}
const getFlashLists = async () => {
    let startBlock = {
        time: 0,
        height: 0
    };
    const getTimestamp = parseInt((await lib_utils_1.web3.eth.getBlock('latest')).timestamp.toString()) - 60
    const merkleDistributorsList = await merkleDistributors();
    const queryBlock = await getQueryBlock(getTimestamp);
    const endTime = queryBlock[0].time;
    if (merkleDistributorsList.length > 0) {
        const block = merkleDistributorsList[merkleDistributorsList.length - 1].settleBlocNumber
        const blockResult = await lib_utils_1.web3.eth.getBlock(block)
        startBlock.time = parseInt(blockResult.timestamp.toString())
        startBlock.height = block
    }
    const handler = await handlerResult(await getUseFlashloan(startBlock.time, endTime))
    const group = handler.list
    
    return group;
}
exports.getFlashLists = getFlashLists;

const getYearnAndHarvestTotalValue = async () => {
    const chainID = lib_const_1.userInfo.chainID
    const fryers = lib_const_1.ContractAddress[chainID].fryers

    const yearnDAIAddress = fryers['DAI']['yearnVaultAdapter']
    const yearnUSDCAddress = fryers['USDC']['yearnVaultAdapter']
    const yearnUSDTAddress = fryers['USDT']['yearnVaultAdapter']

    const yearnDAIAddressDecimal = lib_utils_1.getDecimal(yearnDAIAddress)
    const yearnUSDCAddressDecimal = lib_utils_1.getDecimal(yearnUSDCAddress)
    const yearnUSDTAddressDecimal = lib_utils_1.getDecimal(yearnUSDTAddress)

    const harvestDAIAddress = fryers['DAI']['harvestVaultAdapter']
    const harvestUSDCAddress = fryers['USDC']['harvestVaultAdapter']
    const harvestUSDTAddress = fryers['USDT']['harvestVaultAdapter']

    const harvestDAIAddressDecimal = lib_utils_1.getDecimal(harvestDAIAddress)
    const harvestUSDCAddressDecimal = lib_utils_1.getDecimal(harvestUSDCAddress)
    const harvestUSDTAddressDecimal = lib_utils_1.getDecimal(harvestUSDTAddress)
  
    const  DAIAddress = lib_const_1.tokenAddres[chainID]['DAI']
    const  USDCAddress = lib_const_1.tokenAddres[chainID]['USDC']
    const  USDTAddress = lib_const_1.tokenAddres[chainID]['USDT']

    const DAIAddressDecimal = lib_utils_1.getDecimal(DAIAddress)
    const USDCAddressDecimal = lib_utils_1.getDecimal(USDCAddress)
    const USDTAddressDecimal = lib_utils_1.getDecimal(USDTAddress)
   
    const  DAIFryerAddress = fryers['DAI']['fryer']
    const  USDCFryerAddress = fryers['USDC']['fryer']
    const  USDTFryerAddress = fryers['USDT']['fryer']

    const yearnDAIContract = new lib_utils_1.web3.eth.Contract(yearnVaultAdapter_ABI, yearnDAIAddress)
    const yearnUSDCContract = new lib_utils_1.web3.eth.Contract(yearnVaultAdapter_ABI, yearnUSDCAddress)
    const yearnUSDTContract = new lib_utils_1.web3.eth.Contract(yearnVaultAdapter_ABI, yearnUSDTAddress)

    const harvestDAIContract = new lib_utils_1.web3.eth.Contract(harvestVaultAdapter_ABI, harvestDAIAddress)
    const harvestUSDCContract = new lib_utils_1.web3.eth.Contract(harvestVaultAdapter_ABI, harvestUSDCAddress)
    const harvestUSDTContract = new lib_utils_1.web3.eth.Contract(harvestVaultAdapter_ABI, harvestUSDTAddress)

    const DAIContract = new lib_utils_1.web3.eth.Contract(tokens_ABI, DAIAddress)
    const USDCContract = new lib_utils_1.web3.eth.Contract(tokens_ABI, USDCAddress)
    const USDTContract = new lib_utils_1.web3.eth.Contract(tokens_ABI, USDTAddress)

    const yearnDAITotalValue = yearnDAIContract.methods.totalValue().call()
    const yearnUSDCTotalValue = yearnUSDCContract.methods.totalValue().call()
    const yearnUSDTTotalValue = yearnUSDTContract.methods.totalValue().call()

    const harvestDAITotalValue = harvestDAIContract.methods.totalValue().call()
    const harvestUSDCTotalValue = harvestUSDCContract.methods.totalValue().call()
    const harvestUSDTTotalValue = harvestUSDTContract.methods.totalValue().call()

    const DAIFryerBalance = DAIContract.methods.balanceOf(DAIFryerAddress).call()
    const USDCFryerBalance = USDCContract.methods.balanceOf(USDCFryerAddress).call()
    const USDTFryerBalance = USDTContract.methods.balanceOf(USDTFryerAddress).call()
   

    const requestList = [
        yearnDAITotalValue,
        yearnUSDCTotalValue,
        yearnUSDTTotalValue,

        harvestDAITotalValue,
        harvestUSDCTotalValue,
        harvestUSDTTotalValue,

        DAIFryerBalance,
        USDCFryerBalance,
        USDTFryerBalance,

        //decimal
        yearnDAIAddressDecimal,
        yearnUSDCAddressDecimal,
        yearnUSDTAddressDecimal,

        harvestDAIAddressDecimal,
        harvestUSDCAddressDecimal,
        harvestUSDTAddressDecimal,

        DAIAddressDecimal,
        USDCAddressDecimal,
        USDTAddressDecimal,

    ]
    const requestResult = await Promise.all(requestList)
    
    const result = {
        yearnDAITotalValue: lib_utils_1.convertBigNumberToNormal(requestResult[0], requestResult[9]),
        yearnUSDCTotalValue: lib_utils_1.convertBigNumberToNormal(requestResult[1], requestResult[10]),
        yearnUSDTTotalValue: lib_utils_1.convertBigNumberToNormal(requestResult[2], requestResult[11]),

        harvestDAITotalValue: lib_utils_1.convertBigNumberToNormal(requestResult[3], requestResult[12]),
        harvestUSDCTotalValue: lib_utils_1.convertBigNumberToNormal(requestResult[4], requestResult[13]),
        harvestUSDTTotalValue: lib_utils_1.convertBigNumberToNormal(requestResult[5], requestResult[14]),

        DAIFryerBalance: lib_utils_1.convertBigNumberToNormal(requestResult[6], requestResult[15]),
        USDCFryerBalance: lib_utils_1.convertBigNumberToNormal(requestResult[7], requestResult[16]),
        USDTFryerBalance: lib_utils_1.convertBigNumberToNormal(requestResult[8], requestResult[17]),
    }
    // console.log(result);
    return result
}
exports.getYearnAndHarvestTotalValue = getYearnAndHarvestTotalValue;

const getFlashPoolReward = async () => {
    const contractAddress = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool
    let cheeseStakePoolInc = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESESTAKEPOOL, contractAddress)
    let rewardPerShare = (await cheeseStakePoolInc.methods.currentAllPoolRewardShare().call())._perShare.toString()
    let flashPoolInfo = (await cheeseStakePoolInc.methods.flashloanPool().call())
    let debt = new BigNumber(flashPoolInfo.weight.toString()).multipliedBy(rewardPerShare).div(1e18).dp(0, BigNumber.ROUND_DOWN);
    let poolReward = debt.minus(flashPoolInfo.debt.toString());
    let reward = new BigNumber(flashPoolInfo.reward.toString()).plus(poolReward).toFixed();
    return lib_utils_1.convertBigNumberToNormal(reward);
}
exports.getFlashPoolReward = getFlashPoolReward;

const getFryerApyAddress = (token) => {
    return lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token].yearnVaultMock;
}
exports.getFryerApyAddress = getFryerApyAddress;

async function getLeaderBoardData(){
    const query = `{
        positionScores {
            EOA,
            account,
            positionScoreList
        }
        flashLoanScores{
            EOA,
            id,
            flashLoanScoreList
        }
        rewards{
            id,
            EOA,
            RewardList
        }
    }`
    const url = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].dsaGraph;
    let result = await getFetch(query, url || 'https://api.thegraph.com/subgraphs/name/z-x-l/center')
    if(result.data) {
        return result.data;
    }
    return []
}
exports.getLeaderBoardData = getLeaderBoardData;

async function getCurrentEpochRound() {
    const contractAddress = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].eventCenter
    const Contract = new lib_utils_1.web3.eth.Contract(EVENTCENTER_ABI, contractAddress)
    return await Contract.methods.epochRound().call();
}
exports.getCurrentEpochRound = getCurrentEpochRound;

/**
 * 根据token symbol获取address
 * @param token_symbol
 * @returns
 */
function getTokenAddress(token_symbol) {
    return lib_const_1.tokenAddres[lib_const_1.userInfo.chainID][token_symbol];
}
exports.getTokenAddress = getTokenAddress;
function getDate(timetamp){
    //let myDate = new Date()如果是要获取当前时间的显示就不传参数
    let myDate = new Date(timetamp);  //获取js时间
    let year = myDate.getFullYear(); //获取年
    let month = myDate.getMonth() + 1;//获取月
    let date = myDate.getDate();//获取日
    let  h = myDate.getHours(); //获取小时数(0-23)
    let m = myDate.getMinutes(); //获取分钟数(0-59)
    let s = myDate.getSeconds();
    //获取当前时间连接成的字符串
    let now = year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
    return now
 }
 
 //日期时间处理
 function conver(s) {
 return s < 10 ? '0' + s : s;
 }
/**
 * 获取开始/结束时间
 * 
 * @returns []start,end
 */
async function getGradualUpdate() {
    const contractAddress = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].ido.contractAddress
    const contract = new lib_utils_1.web3.eth.Contract(bpool, contractAddress);
    const res = await contract.methods.gradualUpdate().call();
    const result = res ? [res['0'],res['1']] : [0,0];
    if(!result) return false;
    let startTimestamp = parseInt((await lib_utils_1.web3.eth.getBlock(result[0])).timestamp.toString());
    let lastTimestamp = parseInt((await lib_utils_1.web3.eth.getBlock(result[1])).timestamp.toString());
    return [getDate(startTimestamp*1000),getDate(lastTimestamp*1000)];
}
exports.getGradualUpdate = getGradualUpdate;
/**
 * 获取价格
 * 
 * 
 */
 async function getSpotPrice() {
    const contractAddress = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].ido.contractAddress;
    const spotPriceInAddress = lib_const_1.tokenAddres[lib_const_1.userInfo.chainID].WETH;
    const spotPriceOutAddress = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].ido.spotPriceOut;
    const contract = new lib_utils_1.web3.eth.Contract(bpool,contractAddress);
    const pool = await contract.methods.bPool().call();
    const spotPriceContract = new lib_utils_1.web3.eth.Contract(gradualUpdateAbi,pool) ;
    const inAddress = spotPriceInAddress;
    const outAddress = spotPriceOutAddress;
    const price = await spotPriceContract.methods.getSpotPrice(inAddress,outAddress).call();
    const transformPrice = lib_utils_1.convertBigNumberToNormal(price);
    return transformPrice
}
exports.getSpotPrice = getSpotPrice;
/**
 * try flash loan
 * 
 * 
 * 
 */
async function tryFlashloan (currentSymbol,amount,callback) {
    const {index, symbol} = currentSymbol;
    console.table(currentSymbol);
    const address = getFlashLoanDestinaAddress();
    const tokenAddress = getFlashLoanTokenAddress(symbol);
    let fryerContract = new lib_utils_1.web3.eth.Contract(newFlashBorrower, address);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, await lib_utils_1.getDecimal(tokenAddress));
    lib_utils_1.executeContract(fryerContract, "flashBorrow", 0, [index,tokenAddress,bigAmount], callback);

}
exports.tryFlashloan = tryFlashloan;

/**
 * flashloan
 * 根据token symbol获取address
 * @param token_symbol
 * @returns
 */
function getFlashLoanTokenAddress(token_symbol) {
    if(
        token_symbol &&
        lib_const_1 && 
        lib_const_1.userInfo &&
        lib_const_1.userInfo.chainID && 
        lib_const_1.ContractAddress && 
        lib_const_1.ContractAddress[lib_const_1.userInfo.chainID] && 
        lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].flashBorrower && 
        lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].flashBorrower[token_symbol]
    ) 
    {
        return lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].flashBorrower[token_symbol]
    }
    return ''
}
exports.getFlashLoanTokenAddress = getFlashLoanTokenAddress;

/**
 * flashloan
 * 获取目标地址
 * @param token_symbol
 * @returns
 */
 function getFlashLoanDestinaAddress() {
    if(
        lib_const_1 && 
        lib_const_1.userInfo &&
        lib_const_1.userInfo.chainID && 
        lib_const_1.ContractAddress && 
        lib_const_1.ContractAddress[lib_const_1.userInfo.chainID] && 
        lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].flashBorrower && 
        lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].flashBorrower.contractAddress
    ) 
    {
        return lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].flashBorrower.contractAddress
    }
    return ''
}
exports.getFlashLoanDestinaAddress = getFlashLoanDestinaAddress;

/**
 * 设置合约地址
 * @param key
 * @param obj
 */
function setContractAddress(key, obj) {
    lib_const_1.ContractAddress[key] = obj;
}
exports.setContractAddress = setContractAddress;
/**
 * 设置token地址
 * @param key
 * @param obj
 */
function setTokensAddress(key, obj) {
    lib_const_1.tokenAddres[key] = obj;
}
exports.setTokensAddress = setTokensAddress;
/**
 * 根据token address,获取symbol
 * @param token_address
 * @returns
 */
function getTokenSymbol(token_address) {
    let symbol = lib_utils_1.findToken(lib_const_1.tokenAddres[lib_const_1.userInfo.chainID], token_address);
    return symbol || "unknow";
}
exports.getTokenSymbol = getTokenSymbol;
/**
 * 获取pool授权值
 * @param token_address
 * @param otherToken
 * @param type
 * @returns
 */
 async function getPoolAllowance(token_address, otherToken, type, isV2=false) {
    if (type === "fryer") {
        let token_name = getTokenSymbol(token_address);
        let destina_address = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer;
        if (otherToken === lib_const_1.tokenAddres[lib_const_1.userInfo.chainID].FRIES) {
            token_address = otherToken;
        }
        let res = await lib_utils_1.getAllowance(token_address, destina_address);
        return res;
    }
    else if (type === "cheese") {
        let destina_address = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool;
        let res = await lib_utils_1.getAllowance(otherToken, destina_address);
        return res;
    }
    else if (type === "team") {
        let destina_address = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseTeamStakePool;
        let res = await lib_utils_1.getAllowance(lib_const_1.tokenAddres[lib_const_1.userInfo.chainID].CHEESE, destina_address);
        return res;
    }
    else if (type === "oven") {
        let token_name = getTokenSymbol(token_address);
        const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
        const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
        let destina_address = contractAddress;
        token_address = otherToken;
        let res = await lib_utils_1.getAllowance(token_address, destina_address);
        return res;
    }
    else if(type === 'flashloan') {
        return await lib_utils_1.getAllowance(otherToken,token_address);
    }
}
exports.getPoolAllowance = getPoolAllowance;
/**
 * 获取pool的信息
 * @param token_address pool address
 * @returns
 */
async function getPoolinfo(token_address) {
    let token_name = getTokenSymbol(token_address);
    let balance = await exports.getBalance(token_address);
    let decimal = await lib_utils_1.getDecimal(token_address);
    let fryerContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer);
    let _TotalDebt = await fryerContract.methods
        .getCdpTotalDebt(lib_const_1.userInfo.account)
        .call();
    let TotalDebt = lib_utils_1.convertBigNumberToNormal(_TotalDebt, decimal);
    let _TotalCredit = await fryerContract.methods.getCdpTotalCredit(lib_const_1.userInfo.account).call();
    let _TotalDeposited = await fryerContract.methods.getCdpTotalDeposited(lib_const_1.userInfo.account).call();
    let TotalDeposited = lib_utils_1.convertBigNumberToNormal(_TotalDeposited, decimal);
    let collaterLimit = await fryerContract.methods.collateralizationLimit().call();
    let ltv = +lib_utils_1.convertBigNumberToNormal(collaterLimit, 18) / 4;
    let TotalCredit = lib_utils_1.convertBigNumberToNormal(_TotalCredit, decimal);
    let maxWithdraw = +TotalDebt == 0 ? TotalDeposited : +TotalDeposited - 4 * ltv * +TotalDebt;
    let maxDebt = (+TotalDeposited) * ltv - (+TotalDebt) + (+TotalCredit);
    return {
        data: {
            balance: balance,
            maxDebt: maxDebt,
            TotalDebt: TotalDebt,
            maxWithdraw: maxWithdraw,
            TotalDeposited: TotalDeposited,
            TotalCredit: TotalCredit,
        },
    };
}
exports.getPoolinfo = getPoolinfo;
/**
 * 拿闪电贷额度
 * @returns
 */
async function maxFlashLoan() {
    let fryerContractUSDC = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers["USDC"].fryer);
    let maxFlashLoanUSDC = await fryerContractUSDC.methods
        .maxFlashLoan(getTokenAddress("USDC"))
        .call();
    let decimalUSDC = await lib_utils_1.getDecimal(getTokenAddress("USDC"));
    let fryerContractUSDT = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers["USDT"].fryer);
    let maxFlashLoanUSDT = await fryerContractUSDT.methods
        .maxFlashLoan(getTokenAddress("USDT"))
        .call();
    let decimalUSDT = await lib_utils_1.getDecimal(getTokenAddress("USDT"));
    let fryerContractDAI = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers["DAI"].fryer);
    let maxFlashLoanDAI = await fryerContractDAI.methods
        .maxFlashLoan(getTokenAddress("DAI"))
        .call();
    let decimalDAI = await lib_utils_1.getDecimal(getTokenAddress("DAI"));
    let totalCheeseClaimed = await flashTotalClaimeds();
    return {
        data: {
            USDC: lib_utils_1.convertBigNumberToNormal(maxFlashLoanUSDC, decimalUSDC),
            USDT: lib_utils_1.convertBigNumberToNormal(maxFlashLoanUSDT, decimalUSDT),
            DAI: lib_utils_1.convertBigNumberToNormal(maxFlashLoanDAI, decimalDAI),
            totalCheeseClaimed: totalCheeseClaimed.data,
        },
    };
}
exports.maxFlashLoan = maxFlashLoan;
async function getSushiPrice(token, pair) {
    token = token.toLowerCase();
    let pairContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.UNISWAPV2PAIR, pair);
    let reserves = await pairContract.methods.getReserves().call();
    let totalSupply = await pairContract.methods.totalSupply().call();
    let token0 = (await pairContract.methods.token0().call()).toLowerCase();
    let token1 = (await pairContract.methods.token1().call()).toLowerCase();
    let token0Decimal = parseInt(await lib_utils_1.getDecimal(token0));
    let token1Decimal = parseInt(await lib_utils_1.getDecimal(token1));
    // cheese / eth 
    // token = cheese
    // token0 = cheese
    // token1 = eth
    // return 1 cheese = x eth => x = eth / cheese
    let price = "0";
    if (token == token0) {
        price = lib_utils_1.div(lib_utils_1.convertBigNumberToNormal(reserves._reserve1.toString(), token1Decimal), lib_utils_1.convertBigNumberToNormal(reserves._reserve0.toString(), token0Decimal));
    }
    else if (token === token1) {
        price = lib_utils_1.div(lib_utils_1.convertBigNumberToNormal(reserves._reserve0.toString(), token0Decimal), lib_utils_1.convertBigNumberToNormal(reserves._reserve1.toString(), token1Decimal));
    }
    return {
        price: price,
        token0Decimal: token0Decimal,
        token1Decimal: token1Decimal,
        token0: token0,
        token1: token1,
        reserve0: lib_utils_1.convertBigNumberToNormal(reserves._reserve0.toString(), token0Decimal),
        reserve1: lib_utils_1.convertBigNumberToNormal(reserves._reserve1.toString(), token1Decimal),
        totalSupply: totalSupply.toString(),
    };
}
async function getCheesePrice() {
    let ethPrice = await getSushiPrice(getTokenAddress("WETH"), getTokenAddress("WETHUSDTSUSHILP"));
    let cheeseEthPrice = await getSushiPrice(getTokenAddress("CHEESE"), getTokenAddress("CHEESEETHLP"));
    return lib_utils_1.mul(ethPrice.price.toString(), cheeseEthPrice.price.toString());
}
async function getCheeseEthLpPrice() {
    let ethPrice = await getSushiPrice(getTokenAddress("WETH"), getTokenAddress("WETHUSDTSUSHILP"));
    let cheeseEthPrice = await getSushiPrice(getTokenAddress("CHEESE"), getTokenAddress("CHEESEETHLP"));
    let token = getTokenAddress("CHEESE").toLowerCase();
    let lpTotal = '0';
    if (token == cheeseEthPrice.token0) {
        lpTotal = lib_utils_1.mul(ethPrice.price, cheeseEthPrice.reserve1);
    }
    else {
        lpTotal = lib_utils_1.mul(ethPrice.price, cheeseEthPrice.reserve0);
    }
    let lpPrice = lib_utils_1.div(lib_utils_1.mul(lpTotal, '2'), lib_utils_1.convertBigNumberToNormal(cheeseEthPrice.totalSupply, 18));
    return lpPrice;
}
exports.getCheeseEthLpPrice = getCheeseEthLpPrice;
async function getApr(cheesePrice, poolYield, poolTokenAmount, poolToken) {
    let price = '0';
    if (poolToken.toLowerCase() === getTokenAddress("CHEESEETHLP").toLowerCase()) {
        price = await getCheeseEthLpPrice();
    }
    if (poolToken.toLowerCase() === getTokenAddress("CHEESE").toLowerCase()) {
        price = cheesePrice;
    }

    if (poolToken.toLowerCase() === getTokenAddress("FRIESUSD3CRV").toLowerCase()) {
        price = 1; // todo ,the price will not peg to 1usd in future with the 3pool yield comes
    }

    if (poolToken.toLowerCase() === getTokenAddress("ALUSD").toLowerCase()) {
        price = 1;
    }

    if (poolToken.toLowerCase() === getTokenAddress("FRIES").toLowerCase()) {
        price = 1;
    }

    if (poolToken.toLowerCase() === getTokenAddress("MIM").toLowerCase()) {
        price = 1;
    }

    const tvl = new BigNumber(poolTokenAmount).times(new BigNumber(price)).toFixed()
    let apr = price === '0' ? '0' : new bignumber_js_1.default(cheesePrice).multipliedBy(poolYield).div(new bignumber_js_1.default(price).multipliedBy(poolTokenAmount)).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN);
    return { apr, tvl };
}
async function getStakePoolsApr(pools, totalWeight) {
    let cheeseFactoryContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESEFACTORY, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseFactory);
    let startTimestamp = parseInt((await cheeseFactoryContract.methods.startTimestamp().call()).toString());
    let lastTimestamp = parseInt((await lib_utils_1.web3.eth.getBlock("latest")).timestamp.toString());
    if (lastTimestamp > startTimestamp && startTimestamp !== 0 && lib_const_1.userInfo.chainID === 1) {
        let MAX_WEEK = 156;
        let d = 390 * 10 ** 18;
        let a1 = 75000 * 10 ** 18;
        let stakePoolWeight = 0.9;
        let dayTime = 60 * 60 * 24;
        let weekTimestamp = dayTime * 7;
        let time = lastTimestamp - startTimestamp;
        if (time <= MAX_WEEK * weekTimestamp) {
            let n = parseInt((time / weekTimestamp).toString());
            //an =a1-(n)*d d<0
            //=> a1+(n)*(-d)
            // 一周的产量
            let an = a1 - n * d;
            // 当前cheese 一年的产量
            let cheeseYear = (an / 7) * 365;
            let stakePoolYear = cheeseYear * stakePoolWeight;
            let cheesePrice = await getCheesePrice();
            for (const iterator of pools) {
                const result = await getApr(cheesePrice, lib_utils_1.convertBigNumberToNormal((stakePoolYear * iterator.weight / totalWeight).toString(), 18), iterator.totalAmount, iterator.token);
                iterator.apr = result.apr;
                iterator.tvl = result.tvl;
            }
        }
    }
    return pools;
}
/**
 * 拿stake pools
 * @returns
 */
async function getStakePools() {
    let pools = [];
    let cheeseStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESESTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool);
    let res = await cheeseStakePoolContract.methods.getPoolInfos().call();
    let totalWeight = parseInt((await cheeseStakePoolContract.methods.totalWeight().call()).toString());
    for (let i = 0; i < res._pid.length; i++) {
        pools.push({
            pid: res._pid[i],
            weight: res._weight[i],
            token: res._token[i],
            symbol: await getSymbol(res._token[i]),
            totalAmount: lib_utils_1.convertBigNumberToNormal(res._totalAmount[i], 18),
            lastBlockTimeStamp: res._lastBlockTimeStamp[i],
            apr: 0,
        });
    }
    return { data: await getStakePoolsApr(pools, totalWeight) };
}
exports.getStakePools = getStakePools;
async function getSymbol(token_address) {
   try {
    let erc20Contract = new lib_utils_1.web3.eth.Contract(lib_abi_1.ERC20, token_address);
    let res = await erc20Contract.methods.symbol().call();
    return res;
   } catch (error) {
       return 'ETH'
   }
}
exports.getSymbol = getSymbol;

async function getOvenBanance() {
    const USDT = lib_const_1.tokenAddres[lib_const_1.userInfo.chainID]['USDT']
    const USDC = lib_const_1.tokenAddres[lib_const_1.userInfo.chainID]['USDC']
    const DAI = lib_const_1.tokenAddres[lib_const_1.userInfo.chainID]['DAI']

    const USDTOven = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers['USDT']['oven']
    const USDCOven = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers['USDC']['oven']
    const DAIOven = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers['DAI']['oven']

    const USDTContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.ERC20, USDT);
    const USDCContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.ERC20, USDC);
    const DAIContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.ERC20, DAI);

    const USDTBanance = await USDTContract.methods.balanceOf(USDTOven).call();
    const USDCBanance = await USDCContract.methods.balanceOf(USDCOven).call();
    const DAIBanance = await DAIContract.methods.balanceOf(DAIOven).call();
    
    const USDTRes = lib_utils_1.convertBigNumberToNormal(USDTBanance, await lib_utils_1.getDecimal(USDT))
    const USDCRes = lib_utils_1.convertBigNumberToNormal(USDCBanance, await lib_utils_1.getDecimal(USDC))
    const DAIRes = lib_utils_1.convertBigNumberToNormal(DAIBanance, await lib_utils_1.getDecimal(DAI))

    const total = new bignumber_js_1.default(USDTRes).plus(new bignumber_js_1.default(USDCRes)).plus(new bignumber_js_1.default(DAIRes)).toFixed();

    return {
        USDT: USDTRes,
        USDC: USDCRes,
        DAI: DAIRes,
        total,
    }
}
exports.getOvenBanance = getOvenBanance;
/**
 * 用户对应pool收益信息
 * @param pid pool编号
 * @returns
 */
async function getUserStakeInfo(pid) {
    let cheeseStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESESTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool);
    let res = await cheeseStakePoolContract.methods
        .getUserInfo(pid, lib_const_1.userInfo.account)
        .call();
    let income = await cheeseStakePoolContract.methods
        .calculateIncome(pid, lib_const_1.userInfo.account)
        .call();
    return {
        data: {
            amount: lib_utils_1.convertBigNumberToNormal(res._amount, 18),
            debt: lib_utils_1.convertBigNumberToNormal(res._debt, 18),
            income: lib_utils_1.convertBigNumberToNormal(income, 18),
            reward: lib_utils_1.convertBigNumberToNormal(res._reward, 18),
            totalIncome: lib_utils_1.convertBigNumberToNormal(res._totalIncome, 18),
        },
    };
}
exports.getUserStakeInfo = getUserStakeInfo;
/**
 * tema stake 信息
 * @returns
 */
async function getTeamStakeInfo() {
    let cheeseTeamStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESETEAMSTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseTeamStakePool);
    let res = await cheeseTeamStakePoolContract.methods
        .getUserInfo(lib_const_1.userInfo.account)
        .call();
    let income = await cheeseTeamStakePoolContract.methods
        .calculateIncome(lib_const_1.userInfo.account)
        .call();
    return {
        data: {
            amount: lib_utils_1.convertBigNumberToNormal(res.amount, 18),
            debt: lib_utils_1.convertBigNumberToNormal(res.debt, 18),
            income: lib_utils_1.convertBigNumberToNormal(income, 18),
            reward: lib_utils_1.convertBigNumberToNormal(res.reward, 18),
            totalIncome: lib_utils_1.convertBigNumberToNormal(res.totalIncome, 18),
        },
    };
}
exports.getTeamStakeInfo = getTeamStakeInfo;
/**
 * 拿ovenpool的信息
 * @param token_address
 */
 async function getOvenPoolInfo(token_address, isV2=false, isFusdBanance=false) {
    let token_name = getTokenSymbol(token_address);
    const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    let ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);
    let res = await ovenContract.methods.userInfo(lib_const_1.userInfo.account).call();

    // Read FUSD to optimize performance
    if(isFusdBanance) {
        return lib_utils_1.convertBigNumberToNormal(res.depositedToken, 18)
    }
    let _totalSupplyFriesTokens = await ovenContract.methods
        .totalSupplyFriesTokens()
        .call();
    let totalSupplyFriesTokens = lib_utils_1.convertBigNumberToNormal(_totalSupplyFriesTokens, 18);
    let decimal = await lib_utils_1.getDecimal(token_address);
    let _buffer = await ovenContract.methods.buffer().call();
    let buffer = lib_utils_1.convertBigNumberToNormal(_buffer, decimal);
    let EXCHANGE_PERIOD = await ovenContract.methods.EXCHANGE_PERIOD().call();
    let _realised = lib_utils_1.convertBigNumberToNormal(res.realised, decimal);
    let _pendingdivs = lib_utils_1.convertBigNumberToNormal(res.pendingdivs, decimal);
    let _inbucket = lib_utils_1.convertBigNumberToNormal(res.inbucket, decimal);
    return {
        data: {
            buffer: buffer,
            totalSupplyFriesTokens: totalSupplyFriesTokens,
            EXCHANGE_PERIOD: EXCHANGE_PERIOD,
            ESTIMATED_DAILY_YIELD: (+buffer / EXCHANGE_PERIOD) * 5760,
            pendingdivs: _pendingdivs,
            depositedAl: lib_utils_1.convertBigNumberToNormal(res.depositedToken, 18),
            inbucket: _inbucket,
            realised: _realised,
            exchangeAmount: +_realised + +_inbucket + +_pendingdivs,
            GrillableTokens: +_inbucket + +_pendingdivs,
            withdrawAmount: _realised,
        },
    };
}
exports.getOvenPoolInfo = getOvenPoolInfo;
//---------------------------------------------------上查下操作------------------------------------------------------
/**
 * 对token pool授权
 * @param token_address  pool token
 * @param otherToken
 * @param callback
 */
 async function approvePoolToken(token_address, otherToken, type, callback, isV2 = false) {
    if (type === "fryer") {
        let token_name = getTokenSymbol(token_address);
        let destina_address = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer;
        if (otherToken === lib_const_1.tokenAddres[lib_const_1.userInfo.chainID].FRIES) {
            token_address = otherToken;
        }
        lib_utils_1.approveToken(token_address, destina_address, callback);
    }
    else if (type === "cheese") {
        let destina_address = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool;
        lib_utils_1.approveToken(otherToken, destina_address, callback);
    }
    else if (type === "team") {
        let destina_address = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseTeamStakePool;
        lib_utils_1.approveToken(lib_const_1.tokenAddres[lib_const_1.userInfo.chainID].CHEESE, destina_address, callback);
    }
    else if (type === "oven") {
        let token_name = getTokenSymbol(token_address);
        const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
        const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
        let destina_address = contractAddress;
        token_address = otherToken;
        lib_utils_1.approveToken(token_address, destina_address, callback);
    }
    else if(type === 'flashloan') {
        lib_utils_1.approveToken(token_address, otherToken, callback);
    }
}
exports.approvePoolToken = approvePoolToken;

async function getTotalAmount(token_address) {
    let token_name = getTokenSymbol(token_address);
    let fryerContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer);
    // let totalDeposited = await fryerContract.methods.totalDeposited().call()
    // let decimal = await lib_utils_1.getDecimal(token_address)
    const [totalDeposited,decimal] = await Promise.all([
        fryerContract.methods.totalDeposited().call(),
        lib_utils_1.getDecimal(token_address)
    ])
    return lib_utils_1.convertBigNumberToNormal(totalDeposited, decimal );
}
exports.getTotalAmount = getTotalAmount;
/**
 * deposit 存(dai/usdt/usdc)
 * @param token_address pool token
 * @param amount
 * @param callback
 */
async function deposit(token_address, amount, callback) {
    let token_name = getTokenSymbol(token_address);
    let fryerContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer);
    console.log('fryerContract',fryerContract,'fryerContract');
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, await lib_utils_1.getDecimal(token_address));
    lib_utils_1.executeContract(fryerContract, "deposit", 0, [bigAmount], callback);
}
exports.deposit = deposit;
/**
 * withdraw 取(dai/usdt/usdc)
 * @param token_address pool token
 * @param amount
 * @param callback
 */
async function withdraw(token_address, amount, callback) {
    let token_name = getTokenSymbol(token_address);
    let fryerContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, await lib_utils_1.getDecimal(token_address));
    lib_utils_1.executeContract(fryerContract, "withdraw", 0, [bigAmount], callback);
}
exports.withdraw = withdraw;
/**
 * borrow 借币(friesUsd)
 * @param token_address pool token
 * @param amount
 * @param callback
 */
async function borrow(token_address, amount, callback) {
    let token_name = getTokenSymbol(token_address);
    let fryerContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, await lib_utils_1.getDecimal(token_address));
    lib_utils_1.executeContract(fryerContract, "borrow", 0, [bigAmount], callback);
}
exports.borrow = borrow;
/**
 * liquidate 用我抵押的钱（dai/usdt/usdc）来还借出来的(friesUsd)
 * @param token_address pool token
 * @param amount
 * @param callback
 */
async function liquidate(token_address, amount, callback) {
    let token_name = getTokenSymbol(token_address);
    let fryerContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, await lib_utils_1.getDecimal(token_address));
    lib_utils_1.executeContract(fryerContract, "liquidate", 0, [bigAmount], callback);
}
exports.liquidate = liquidate;
/**
 * repay （dai/usdt/usdc）+friesUsd 还款
 * @param token_address pool address
 * @param amount
 * @param amountfries
 * @param callback
 */
async function repay(token_address, amount, amountfries, callback) {
    let token_name = getTokenSymbol(token_address);
    let fryerContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.FRYER, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name].fryer);
    let bigAmountfries = lib_utils_1.convertNormalToBigNumber(amountfries, await lib_utils_1.getDecimal(lib_const_1.tokenAddres[lib_const_1.userInfo.chainID].FRIES));
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, await lib_utils_1.getDecimal(token_address));
    lib_utils_1.executeContract(fryerContract, "repay", 0, [bigAmount, bigAmountfries], callback);
}
exports.repay = repay;
/**
 * 用户质押
 * @param pid 编号
 * @param amount
 * @param callback
 */
async function userStake(pid, amount, callback) {
    let cheeseStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESESTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, 18);
    lib_utils_1.executeContract(cheeseStakePoolContract, "stake", 0, [pid, bigAmount], callback);
}
exports.userStake = userStake;
/**
 *  用户取出
 * @param pid
 * @param amount
 * @param callback
 */
async function userUnstake(pid, amount, callback) {
    let cheeseStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESESTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, 18);
    lib_utils_1.executeContract(cheeseStakePoolContract, "withdraw", 0, [pid, bigAmount], callback);
}
exports.userUnstake = userUnstake;
/**
 * 收取收益
 * @param pid
 * @param callback
 */
async function userClaim(pid, callback) {
    let cheeseStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESESTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool);
    lib_utils_1.executeContract(cheeseStakePoolContract, "claim", 0, [pid], callback);
}
exports.userClaim = userClaim;
/**
 * teamStake
 * @param amount
 * @param callback
 */
async function teamStake(amount, callback) {
    let cheeseTeamStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESETEAMSTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseTeamStakePool);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, 18);
    lib_utils_1.executeContract(cheeseTeamStakePoolContract, "stake", 0, [bigAmount], callback);
}
exports.teamStake = teamStake;
/**
 * teamUnstake
 * @param amount
 * @param callback
 */
async function teamUnstake(amount, callback) {
    let cheeseTeamStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESETEAMSTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseTeamStakePool);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, 18);
    lib_utils_1.executeContract(cheeseTeamStakePoolContract, "withdraw", 0, [bigAmount], callback);
}
exports.teamUnstake = teamUnstake;
/**
 * teamClaim
 * @param callback
 */
async function teamClaim(callback) {
    let cheeseTeamStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESETEAMSTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseTeamStakePool);
    lib_utils_1.executeContract(cheeseTeamStakePoolContract, "claim", 0, [], callback);
}
exports.teamClaim = teamClaim;
/**
 * oven ovenStake
 * @param amount
 * @param callback
 */
async function ovenStake(token_address, amount, callback, isV2=false) {
    let token_name = getTokenSymbol(token_address);
    const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    let ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, 18);
    lib_utils_1.executeContract(ovenContract, "stake", 0, [bigAmount], callback);
}
exports.ovenStake = ovenStake;

async function isNeedmigrationOven(token_name, isV2 = false) {

    const chainID = lib_const_1.userInfo.chainID
    const fryers = lib_const_1.ContractAddress[chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    const account = lib_const_1.userInfo.account
    const ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);

    const tokenAddress = getTokenAddress(token_name);
    const coinDecimal = await lib_utils_1.getDecimal(tokenAddress)

    const { depositedToken, pendingdivs, inbucket, realised} = await ovenContract.methods.userInfo(account).call();

    const amount = lib_utils_1.convertBigNumberToNormal(depositedToken, 18)
    const _pendingdivs = lib_utils_1.convertBigNumberToNormal(pendingdivs, coinDecimal);
    const _inbucket = lib_utils_1.convertBigNumberToNormal(inbucket, coinDecimal);
    const _realised = lib_utils_1.convertBigNumberToNormal(realised, coinDecimal);

    const grillableToken = +_inbucket + +_pendingdivs;
    // grill => exchange
    // withdraw => claim
    // unstake => ovenUnstake

    // GrillableTokens: +_inbucket + +_pendingdivs,
    // withdrawAmount: _realised,

    // this.grill_data.disabled = (pool.GrillableTokens<=0);
    // this.withdraw_data.disabled = (pool.withdrawAmount<=0);
    

    const isExchangeTrans = (((+_pendingdivs) + (+_inbucket)) > 0)
    const isClaimTrans = (_realised > 0);
    const isUnstakeTrans = (amount > 0);
    

    return {
        isExchangeTrans,
        isClaimTrans,
        isUnstakeTrans,
        tokenAddress,
        amount,
        _pendingdivs,
        _inbucket,
        _realised,
        grillableToken,
        coinDecimal,
    }

}
exports.isNeedmigrationOven = isNeedmigrationOven;

async function migrationOven(token_name, callback, isV2 = false) {

    const { isExchangeTrans, isClaimTrans, isUnstakeTrans, tokenAddress, amount, grillableToken, coinDecimal } = await isNeedmigrationOven(token_name, isV2)

    // 采用状态模式，进行递归
    let performStatus = {
        exchange: 0,
        claim: 0,
        unstake: 0,
        approve: 0,
        stake: 0,
        all: 0,
        exchangeAndClaim: 0,
    }

    const setPerformStatus = (type) => {
        performStatus[type] = 1;
        callback(performStatus)
    };

    // withfraw
    isClaimTrans ? claim(tokenAddress, () => setPerformStatus('claim'), isV2) : setPerformStatus('claim')

    const curAmount = amount;

    //unstake 
    if(isUnstakeTrans) {
        const fryUSD = getTokenAddress("FRIES");
        const balance = await lib_utils_1.getBalance(fryUSD);//stake

        if(!isExchangeTrans) {
            ovenUnstake(tokenAddress, curAmount, () => setPerformStatus('unstake'), isV2) 
        }
        // grillable < stake
        else if(isExchangeTrans && balance < grillableToken) {
            ovenExchangeClaimAndWithdraw(tokenAddress, () => setPerformStatus('all'), isV2)
        }
        else {
            transmuteAndClaim(tokenAddress, () => setPerformStatus('exchangeAndClaim'), isV2)
        }
    }

    // // 1 exchange
    // isExchangeTrans ? exchange(tokenAddress, () => setPerformStatus('exchange'), isV2) : setPerformStatus('exchange');

    // const curAmount = amount;

    // // 2 unstake
    //  isUnstakeTrans ? ovenUnstake(tokenAddress, amount, () => setPerformStatus('unstake'), isV2) : setPerformStatus('unstake');

    // // 3 claim
    // (isClaimTrans > 0) ? claim(tokenAddress, () => setPerformStatus('claim'), isV2) : setPerformStatus('claim');

   // 4 stake
   const fryUSD = getTokenAddress("FRIES");
    // const balance = await lib_utils_1.getBalance(fryUSD)
   const allowance = await getPoolAllowance(tokenAddress, fryUSD, "oven", true);
   if (Number(allowance) < 1) {
        approvePoolToken(tokenAddress, fryUSD, "oven", (code) => {
            setPerformStatus('approve')
            if (code == 1) {
                ovenStake(tokenAddress, curAmount, (code) => {
                    setPerformStatus('stake')
                },true);
            }
        },true);
   } else if(curAmount > 0) {
        setPerformStatus('approve')
        ovenStake(tokenAddress, curAmount, (code) => {
            setPerformStatus('stake')
        },true);
   }
}

exports.migrationOven = migrationOven;

async function ovenExchangeClaimAndWithdraw(token_address, callback, isV2=false) {
    const token_name = getTokenSymbol(token_address);
    const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    const ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);
    lib_utils_1.executeContract(ovenContract, "exchangeClaimAndWithdraw", 0, [], callback);
}
exports.ovenExchangeClaimAndWithdraw = ovenExchangeClaimAndWithdraw;

/**
 * oven ovenUnstake
 * @param amount
 * @param callback
 */
 async function ovenUnstake(token_address, amount, callback, isV2=false) {
    let token_name = getTokenSymbol(token_address);
    const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    let ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);
    let bigAmount = lib_utils_1.convertNormalToBigNumber(amount, 18);
    lib_utils_1.executeContract(ovenContract, "unstake", 0, [bigAmount], callback);
}
exports.ovenUnstake = ovenUnstake;
/**
 * oven ovenExchange
 * @param callback
 */
 async function ovenExchange(token_address, callback, isV2=false) {
    let token_name = getTokenSymbol(token_address);
    const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    let ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);
    lib_utils_1.executeContract(ovenContract, "exchangeAndClaim", 0, [], callback);
}
exports.ovenExchange = ovenExchange;
/**
 * oven  transmuteAndClaim
 * @param callback
 */
 async function transmuteAndClaim(token_address, callback, isV2=false) {
    let token_name = getTokenSymbol(token_address);
    const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    let ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);
    lib_utils_1.executeContract(ovenContract, "transmuteAndClaim", 0, [], callback);
}
exports.transmuteAndClaim = transmuteAndClaim;
/**
 * oven转换
 * @param token_address
 * @param callback
 */
 async function exchange(token_address, callback, isV2=false) {
    let token_name = getTokenSymbol(token_address);
    const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    let ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);
    lib_utils_1.executeContract(ovenContract, "exchange", 0, [], callback);
}
exports.exchange = exchange;
/**
 * oven收割
 * @param token_address
 * @param callback
 */
 async function claim(token_address, callback, isV2=false) {
    let token_name = getTokenSymbol(token_address);
    const fryers = lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].fryers[token_name];
    const contractAddress = isV2 ? fryers.ovenV2 : fryers.oven
    let ovenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.OVEN, contractAddress);
    lib_utils_1.executeContract(ovenContract, "claim", 0, [], callback);
}
exports.claim = claim;
/**
 * test
 * @param callback
 */
async function test(callback) {
    let tokenContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.ERC20, "0xae9269f27437f0fcbc232d39ec814844a51d6b8f");
    let bigAmount = lib_utils_1.convertNormalToBigNumber("500000000000", await lib_utils_1.getDecimal("0xae9269f27437f0fcbc232d39ec814844a51d6b8f"));
    lib_utils_1.executeContract(tokenContract, "approve", 0, ["0xA94507E3bd5e3Cd414b37456ba716A92F4877d6e", bigAmount], callback);
}
exports.test = test;
//----------------------------------------服务器信息-----------------------------------------------------------
/**
 * 获取闪电贷列表
 * @param offset
 * @param size
 * @returns
 */
async function flashLoanList(offset, size) {
    let data = [];
    const query = `
    {
      flashloanRewards(orderBy:index,orderDirection:asc,first:${size},skip:${offset}){
        index,
        amount,
        totalAmount,
        settleBlocNumber,
        flashloanTotalAmount,
        list(where:{user:"${lib_const_1.userInfo.account}"}){
          user,
          reward,
          flashloan
        }
      }
    }
    `;
    let res = await (await fetch(lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].graph, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
    })).json();
    console.log(res,'CHEESESTAKEPOOL');
    data.push(...res.data.flashloanRewards);
    let result = [];
    let cheeseStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESESTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool);
    for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let endBlock = await lib_utils_1.web3.eth.getBlock(temp.settleBlocNumber);
        let reward = "0";
        let flashloan = "0";
        let claimed = true;
        if (temp.list.length > 0) {
            reward = lib_utils_1.convertBigNumberToNormal(temp.list[0].reward, 18);
            flashloan = lib_utils_1.convertBigNumberToNormal(temp.list[0].flashloan, 18);
            claimed = await cheeseStakePoolContract.methods
                .isClaimedFlashLoan(temp.index, temp.list[0].user)
                .call();
        }
        result.push({
            startTime: i > 0 ? result[i - 1].endTime : 0,
            endTime: parseInt(endBlock.timestamp.toString()),
            reward,
            flashloan,
            index: temp.index,
            claimed,
        });
    }
    return {
        data: result,
    };
}
exports.flashLoanList = flashLoanList;

const getUseFlashloans = async (time_gt, time_lt) => {
    let data = [];

    let end = parseInt((await lib_utils_1.web3.eth.getBlock('latest')).timestamp.toString());
    let start = end - 60 * 60 * 24 * 14;

    const startTimestamp = time_gt || start;
    const endTimestamp = time_lt || end;

    const query = `
     {
       useFlashloans(where:{time_gt:${startTimestamp},time_lt:${endTimestamp}}){
         user,
         amount,
         tokenName,
        }
     }
    `;

    let res = await (await fetch(lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].graph, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
    })).json();
    const useFlashloans = res.data.useFlashloans;
    if(useFlashloans) {
        useFlashloans.map(async item => {
            item.decimal = await lib_utils_1.getDecimal(getTokenAddress(item.tokenName))
        })
        const result = await Promise.all(useFlashloans);
        data.push(...result)
    }
    return data;
    
}
exports.getUseFlashloans = getUseFlashloans;
/**
 * 获取闪电贷总领取的收益
 * @returns
 */
async function flashTotalClaimeds() {
    const query = `
  {
    flashTotalClaimeds{
      amount
    }
  }
    `;
    let res = await (await fetch(lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].graph, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
    })).json();
    let list = res.data.flashTotalClaimeds;
    let amount = "0";
    if (list.length > 0) {
        amount = lib_utils_1.convertBigNumberToNormal(list[0].amount, 18);
    }
    return {
        data: amount,
    };
}
exports.flashTotalClaimeds = flashTotalClaimeds;
/**
 * 根据期领取收益
 * @param index 列表中的index
 * @param callback
 */
async function flashLoanClaimed(index, callback) {
    let cheeseStakePoolContract = new lib_utils_1.web3.eth.Contract(lib_abi_1.CHEESESTAKEPOOL, lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].cheeseStakePool);
    let claimed = await cheeseStakePoolContract.methods
        .isClaimedFlashLoan(index, lib_const_1.userInfo.account)
        .call();
    if (claimed === true) {
        throw "!claimed";
    }
    let data = [];
    let skip = 0;
    while (true) {
        const query = `
  {
  
    flashloanRewards(where:{index:"${index}"}){
      list(first:1000,skip:${skip}){
        user,
        reward
      }
    }
  }
    `;
        let res = await (await fetch(lib_const_1.ContractAddress[lib_const_1.userInfo.chainID].graph, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ query }),
        })).json();
        let list = res.data.flashloanRewards[0].list;
        data.push(...list);
        if (list.length === 0) {
            break;
        }
        skip += 1000;
    }
    let selectUser = data.find((it) => it.user.toLowerCase() === lib_const_1.userInfo.account.toLowerCase());
    if (selectUser == null) {
        throw "user == null";
    }
    const elements = data.map((e) => {
        return keccak256_1.default(ethereumjs_abi_1.solidityPack(["uint256", "address", "uint256"], [index, e.user, e.reward]));
    });
    const tree = new merkletreejs_1.MerkleTree(elements, keccak256_1.default, { sort: true });
    const leaf = keccak256_1.default(ethereumjs_abi_1.solidityPack(["uint256", "address", "uint256"], [index, selectUser.user, selectUser.reward]));
    const proof = tree.getHexProof(leaf);
    lib_utils_1.executeContract(cheeseStakePoolContract, "claimFlashLoan", 0, [index, selectUser.reward, proof], callback);
}
exports.flashLoanClaimed = flashLoanClaimed;
//# sourceMappingURL=index.js.map