import Web3 from "web3";
import global from "../common/Global";
import {
  convertBigNumberToNormal,
  mul,
  div,
} from "../sdk/cheese-sdk/lib.utils";
import {
  FRYER,
  ERC20,
  CHEESESTAKEPOOL,
  CHEESEFACTORY,
  UNISWAPV2PAIR,
} from "../sdk/cheese-sdk/lib_abi";
import BigNumber from "bignumber.js";

/**
 *
 * @returns infura url
 */
export const getInfuraUrl = () => {
  const { address } = global.getFryerConfig();
  const { infura } = address;
  return infura;
};
/**
 *
 * @returns web3
 */
export const initialWebProviders = () => {
  const url = getInfuraUrl();
  return new Web3(new Web3.providers.HttpProvider(url));
};

export const infuraWeb3 = initialWebProviders();

/**
 *
 * @param {*} obj
 * @param {*} value
 * @param {*} compare
 * @returns
 */
export const findToken = (obj, value, compare = (a, b) => a === b) => {
  return Object.keys(obj).find((k) => compare(obj[k], value));
};
/**
 *
 * @param {*} token_address
 * @returns
 */
export const getTokenSymbol = (token_address) => {
  const { tokens } = global.getFryerConfig();
  const symbol = findToken(tokens, token_address);
  return symbol || "unknow";
};
/**
 *
 * @param {*} token_address
 * @returns
 */
export const getDecimal = async (token_address) => {
  const web3 = initialWebProviders();
  const tokenContract = new web3.eth.Contract(ERC20, token_address);
  const decimal = await tokenContract.methods.decimals().call();
  return decimal;
};
/**
 *
 * @param {*} token_symbol
 * @returns
 */
export const getTokenAddress = (token_symbol) => {
  const { tokens } = global.getFryerConfig();
  return tokens[token_symbol];
};
/**
 *
 * @param {*} token_address
 * @returns
 */
export const getTotalAmount = async (token_address) => {
  const { address } = global.getFryerConfig();
  const { fryers } = address;
  const token_name = getTokenSymbol(token_address);
  const fryerContract = new infuraWeb3.eth.Contract(
    FRYER,
    fryers[token_name].fryer
  );
  const totalDeposited = await fryerContract.methods.totalDeposited().call();
  const decimal = await getDecimal(token_address);
  return convertBigNumberToNormal(totalDeposited, decimal);
};
/**
 *
 * @returns
 */
export const getOvenBanance = async () => {
  const { tokens, address } = global.getFryerConfig();
  const { fryers } = address;

  const USDTContract = new infuraWeb3.eth.Contract(ERC20, tokens["USDT"]);
  const USDCContract = new infuraWeb3.eth.Contract(ERC20, tokens["USDC"]);
  const DAIContract = new infuraWeb3.eth.Contract(ERC20, tokens["DAI"]);

  const USDTBanance = await USDTContract.methods
    .balanceOf(fryers["USDT"]["oven"])
    .call();
  const USDCBanance = await USDCContract.methods
    .balanceOf(fryers["USDC"]["oven"])
    .call();
  const DAIBanance = await DAIContract.methods
    .balanceOf(fryers["DAI"]["oven"])
    .call();

  const USDTDecimal = await getDecimal(tokens["USDT"]);
  const USDCDecimal = await getDecimal(tokens["USDC"]);
  const DAIDecimal = await getDecimal(tokens["DAI"]);

  const USDTRes = convertBigNumberToNormal(USDTBanance, USDTDecimal);
  const USDCRes = convertBigNumberToNormal(USDCBanance, USDCDecimal);
  const DAIRes = convertBigNumberToNormal(DAIBanance, DAIDecimal);

  const total = new BigNumber(USDTRes)
    .plus(new BigNumber(USDCRes))
    .plus(new BigNumber(DAIRes))
    .toFixed();

  return {
    USDT: USDTRes,
    USDC: USDCRes,
    DAI: DAIRes,
    total,
  };
};

export const getSymbol = async (token_address) => {
  const erc20Contract = new infuraWeb3.eth.Contract(ERC20, token_address);
  return await erc20Contract.methods.symbol().call();
};
async function getCheeseEthLpPrice() {
  const ethPrice = await getSushiPrice(
    getTokenAddress("WETH"),
    getTokenAddress("WETHUSDTSUSHILP")
  );

  const cheeseEthPrice = await getSushiPrice(
    getTokenAddress("CHEESE"),
    getTokenAddress("CHEESEETHLP")
  );

  const token = getTokenAddress("CHEESE").toLowerCase();

  const lpTotal =
    token == cheeseEthPrice.token0
      ? mul(ethPrice.price, cheeseEthPrice.reserve1)
      : mul(ethPrice.price, cheeseEthPrice.reserve0);

  return div(
    mul(lpTotal, "2"),
    convertBigNumberToNormal(cheeseEthPrice.totalSupply, 18)
  );
}

export const getPriceToken = () => {
  const token = (name) => getTokenAddress(name).toLowerCase();
  return {
    CHEESEETHLP: token("CHEESEETHLP"),
    CHEESE: token("CHEESE"),
    FRIESUSD3CRV: token("FRIESUSD3CRV"),
    ALUSD: token("ALUSD"),
    FRIES: token("FRIES"),
    MIM: token("MIM"),
  };
};

const getPrice = async (poolToken, cheesePrice) => {
  const token = getPriceToken();
  switch (poolToken) {
    case token.CHEESEETHLP:
      return await getCheeseEthLpPrice();
    case token.CHEESE:
      return cheesePrice;
    case token.FRIESUSD3CRV:
      return 1;
    case token.ALUSD:
      return 1;
    case token.FRIES:
      return 1;
    case token.MIM:
      return 1;
    default:
      return 1;
  }
};

async function getApr(cheesePrice, poolYield, poolTokenAmount, poolToken) {
  const pool = poolToken.toLowerCase();
  const price = await getPrice(pool, cheesePrice);

  const tvl = new BigNumber(poolTokenAmount)
    .times(new BigNumber(price))
    .toFixed();

  const apr =
    price === "0"
      ? "0"
      : new BigNumber(cheesePrice)
          .multipliedBy(new BigNumber(poolYield))
          .div(new BigNumber(price).multipliedBy(poolTokenAmount))
          .multipliedBy(100)
          .toFixed(2, BigNumber.ROUND_DOWN);

  return { apr, tvl };
}

async function getSushiPrice(token, pair) {
  token = token ? token.toLowerCase() : '';
  if(!pair) return { price: 0 }
  let pairContract = new infuraWeb3.eth.Contract(UNISWAPV2PAIR, pair);
  let reserves = await pairContract.methods.getReserves().call();
  let totalSupply = await pairContract.methods.totalSupply().call();
  let token0 = (await pairContract.methods.token0().call()).toLowerCase();
  let token1 = (await pairContract.methods.token1().call()).toLowerCase();
  let token0Decimal = parseInt(await getDecimal(token0));
  let token1Decimal = parseInt(await getDecimal(token1));
  // cheese / eth
  // token = cheese
  // token0 = cheese
  // token1 = eth
  // return 1 cheese = x eth => x = eth / cheese
  let price = "0";
  if (token == token0) {
    price = div(
      convertBigNumberToNormal(reserves._reserve1.toString(), token1Decimal),
      convertBigNumberToNormal(reserves._reserve0.toString(), token0Decimal)
    );
  }
  if (token === token1) {
    price = div(
      convertBigNumberToNormal(reserves._reserve0.toString(), token0Decimal),
      convertBigNumberToNormal(reserves._reserve1.toString(), token1Decimal)
    );
  }
  return {
    price: price,
    token0Decimal: token0Decimal,
    token1Decimal: token1Decimal,
    token0: token0,
    token1: token1,
    reserve0: convertBigNumberToNormal(
      reserves._reserve0.toString(),
      token0Decimal
    ),
    reserve1: convertBigNumberToNormal(
      reserves._reserve1.toString(),
      token1Decimal
    ),
    totalSupply: totalSupply.toString(),
  };
}

async function getCheesePrice() {
  let ethPrice = await getSushiPrice(
    getTokenAddress("WETH"),
    getTokenAddress("WETHUSDTSUSHILP")
  );
  let cheeseEthPrice = await getSushiPrice(
    getTokenAddress("CHEESE"),
    getTokenAddress("CHEESEETHLP")
  );
  return mul(ethPrice.price.toString(), cheeseEthPrice.price.toString());
}

export const getStakePoolsApr = async (pools, totalWeight) => {
  try {
  const { address } = global.getFryerConfig();
  const { cheeseFactory } = address;

  let cheeseFactoryContract = new infuraWeb3.eth.Contract(
    CHEESEFACTORY,
    cheeseFactory
  );

  const startT = (
    await cheeseFactoryContract.methods.startTimestamp().call()
  ).toString();
  const startTimestamp = parseInt(startT);

  const lastT = (await infuraWeb3.eth.getBlock("latest")).timestamp.toString();
  const lastTimestamp = parseInt(lastT);

  if (lastTimestamp > startTimestamp && startTimestamp !== 0) {
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
        const result = await getApr(
          cheesePrice,
          convertBigNumberToNormal(
            ((stakePoolYear * iterator.weight) / totalWeight).toString(),
            18
          ),
          iterator.totalAmount,
          iterator.token
        );
        iterator.apr = result.apr;
        iterator.tvl = result.tvl;
      }
    }
  }
  return pools;
  } catch (error) {
    console.log(error);
    return pools;
  }
};

export const getStakePools = async () => {
  const { address } = global.getFryerConfig();
  const { cheeseStakePool } = address;
  let pools = [];

  const cheeseStakePoolContract = new infuraWeb3.eth.Contract(
    CHEESESTAKEPOOL,
    cheeseStakePool
  );

  const res = await cheeseStakePoolContract.methods.getPoolInfos().call();
  const weight = (
    await cheeseStakePoolContract.methods.totalWeight().call()
  ).toString();
  const totalWeight = parseInt(weight);

  for (let i = 0; i < res._pid.length; i++) {
    pools.push({
      pid: res._pid[i],
      weight: res._weight[i],
      token: res._token[i],
      symbol: await getSymbol(res._token[i]),
      totalAmount: convertBigNumberToNormal(res._totalAmount[i], 18),
      lastBlockTimeStamp: res._lastBlockTimeStamp[i],
      apr: 0,
    });
  }
  const data = await getStakePoolsApr(pools, totalWeight);
  return { data };
};

export function getCheesePools(token) {
  const { cheesePools } = global.getFryerConfig();
  return cheesePools[token];
}