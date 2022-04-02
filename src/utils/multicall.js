import { Contract, Provider } from "ethers-multicall";
import { ethers } from "ethers";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { INFURAKEY } from "../constant/index";
import {
  FRYER,
  ERC20,
  CHEESESTAKEPOOL,
  CHEESEFACTORY,
  UNISWAPV2PAIR,
} from "../sdk/cheese-sdk/lib_abi";
import global from "../common/Global";

import {
  convertBigNumberToNormal,
  mul,
  div,
} from "../sdk/cheese-sdk/lib.utils";

const provider = new ethers.providers.InfuraProvider("mainnet", INFURAKEY);

console.log(ethers);
export const getInfuraUrl = () => {
  const { address } = global.getFryerConfig();
  const { infura } = address;
  return infura;
};

export const initialWebProviders = () => {
  const url = getInfuraUrl();
  return new Web3(new Web3.providers.HttpProvider(url));
};

export const infuraWeb3 = initialWebProviders();

/**
 *
 * @param {*} token_address
 * @returns
 */
export const getDecimal = (token_address) => {
  const tokenContract = new Contract(token_address, ERC20);
  return tokenContract.decimals();
};

/**
 *
 * @param {*} WETHUSDTSUSHILP
 * @param {*} CHEESEETHLP
 * @returns
 */
export function getSushiPriceRequestList(WETHUSDTSUSHILP, CHEESEETHLP) {
  const { address } = global.getFryerConfig();
  const { cheeseFactory } = address;
  const cheeseFactoryContract = new Contract(cheeseFactory, CHEESEFACTORY);

  const start = cheeseFactoryContract.startTimestamp();

  if (!WETHUSDTSUSHILP) return { price: 0 };
  if (!CHEESEETHLP) return { price: 0 };

  const WETHContract = new Contract(WETHUSDTSUSHILP, UNISWAPV2PAIR);
  let reserves_method_WETH = WETHContract.getReserves();
  let totalSupply_method_WETH = WETHContract.totalSupply();
  let token0_method_WETH = WETHContract.token0();
  let token1_method_WETH = WETHContract.token1();

  const CHEESEContract = new Contract(CHEESEETHLP, UNISWAPV2PAIR);
  let reserves_method_CHEESE = CHEESEContract.getReserves();
  let totalSupply_method_CHEESE = CHEESEContract.totalSupply();
  let token0_method_CHEESE = CHEESEContract.token0();
  let token1_method_CHEESE = CHEESEContract.token1();

  return [
    reserves_method_WETH,
    totalSupply_method_WETH,
    token0_method_WETH,
    token1_method_WETH,

    reserves_method_CHEESE,
    totalSupply_method_CHEESE,
    token0_method_CHEESE,
    token1_method_CHEESE,

    start,
  ];
}
async function getSushiPrice(
  reserves_WETH,
  totalSupply_WETH,
  token0_WETH,
  token1_WETH,

  reserves_CHEESE,
  totalSupply_CHEESE,
  token0_CHEESE,
  token1_CHEESE,

  startTime,

  WETH,
  CHEESE,

  ethcallProvider
) {
  let tokenWETH = WETH ? WETH.toLowerCase() : "";
  let tokenCHEESE = CHEESE ? CHEESE.toLowerCase() : "";

  const token0_WETH_LowerCase = token0_WETH.toLowerCase();
  const token1_WETH_LowerCase = token1_WETH.toLowerCase();
  const token0_CHEESE_LowerCase = token0_CHEESE.toLowerCase();
  const token1_CHEESE_LowerCase = token1_CHEESE.toLowerCase();

  let reserves_WETH_obj = {};
  for (var item in reserves_WETH) {
    reserves_WETH_obj[item] = reserves_WETH[item];
  }

  let reserves_CHEESE_obj = {};
  for (var ite in reserves_CHEESE) {
    reserves_CHEESE_obj[ite] = reserves_CHEESE[ite];
  }

  const [token0D_WETH, token1D_WETH, token0D_CHEESE, token1D_CHEESE] = [
    18, 6, 18, 18,
  ];
  // await ethcallProvider.all([
  //   getDecimal(token0_WETH),
  //   getDecimal(token1_WETH),
  //   getDecimal(token0_CHEESE),
  //   getDecimal(token1_CHEESE),
  // ]);
  // console.log(token0D_WETH, token1D_WETH, token0D_CHEESE, token1D_CHEESE);
  let token0Decimal_WETH = parseInt(token0D_WETH);
  let token1Decimal_WETH = parseInt(token1D_WETH);

  let token0Decimal_CHEESE = parseInt(token0D_CHEESE);
  let token1Decimal_CHEESE = parseInt(token1D_CHEESE);

  let price_WETH = "0";
  let price_CHEESE = "0";

  if (tokenWETH == token0_WETH_LowerCase) {
    price_WETH = div(
      convertBigNumberToNormal(
        reserves_WETH_obj._reserve1.toString(),
        token1Decimal_WETH
      ),
      convertBigNumberToNormal(
        reserves_WETH_obj._reserve0.toString(),
        token0Decimal_WETH
      )
    );
  }

  if (tokenWETH === token1_WETH_LowerCase) {
    price_WETH = div(
      convertBigNumberToNormal(
        reserves_WETH_obj._reserve0.toString(),
        token0Decimal_WETH
      ),
      convertBigNumberToNormal(
        reserves_WETH_obj._reserve1.toString(),
        token1Decimal_WETH
      )
    );
  }

  if (tokenCHEESE == token0_CHEESE_LowerCase) {
    price_CHEESE = div(
      convertBigNumberToNormal(
        reserves_CHEESE_obj._reserve1.toString(),
        token1Decimal_CHEESE
      ),
      convertBigNumberToNormal(
        reserves_CHEESE_obj._reserve0.toString(),
        token0Decimal_CHEESE
      )
    );
  }

  if (tokenCHEESE === token1_CHEESE_LowerCase) {
    price_CHEESE = div(
      convertBigNumberToNormal(
        reserves_CHEESE_obj._reserve0.toString(),
        token0Decimal_CHEESE
      ),
      convertBigNumberToNormal(
        reserves_CHEESE_obj._reserve1.toString(),
        token1Decimal_CHEESE
      )
    );
  }

  return {
    WETH: {
      price: price_WETH,
      token0Decimal: token0Decimal_WETH,
      token1Decimal: token1Decimal_WETH,
      token0: token0_WETH_LowerCase,
      token1: token1_WETH_LowerCase,
      reserve0: convertBigNumberToNormal(
        reserves_WETH._reserve0.toString(),
        token1Decimal_WETH
      ),
      reserve1: convertBigNumberToNormal(
        reserves_WETH._reserve1.toString(),
        token1Decimal_WETH
      ),
      totalSupply: totalSupply_WETH.toString(),
    },
    CHEESE: {
      price: price_CHEESE,
      token0Decimal: token0Decimal_CHEESE,
      token1Decimal: token1Decimal_CHEESE,
      token0: token0_CHEESE_LowerCase,
      token1: token1_CHEESE_LowerCase,
      reserve0: convertBigNumberToNormal(
        reserves_CHEESE._reserve0.toString(),
        token1Decimal_CHEESE
      ),
      reserve1: convertBigNumberToNormal(
        reserves_CHEESE._reserve1.toString(),
        token1Decimal_CHEESE
      ),
      totalSupply: totalSupply_CHEESE.toString(),
    },
    startTime,
  };
}

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
 * @returns
 */
export function getAllPriceRequestList() {
  const WETHUSDTSUSHILP = getTokenAddress("WETHUSDTSUSHILP");
  const CHEESEETHLP = getTokenAddress("CHEESEETHLP");

  return getSushiPriceRequestList(WETHUSDTSUSHILP, CHEESEETHLP);
}
function getAllPrice(params) {
  let { WETH, CHEESE, startTime } = params;
  const token = getTokenAddress("CHEESE").toLowerCase();

  const lpTotal =
    token == CHEESE.token0
      ? mul(WETH.price, CHEESE.reserve1)
      : mul(WETH.price, CHEESE.reserve0);

  return {
    cheesePrice: mul(WETH.price.toString(), CHEESE.price.toString()),
    cheeseEthLpPrice: div(
      mul(lpTotal, "2"),
      convertBigNumberToNormal(CHEESE.totalSupply, 18)
    ),
    startTime,
  };
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

/**
 *
 * @param {*} token
 * @param {*} poolToken
 * @param {*} cheesePrice
 * @param {*} cheeseEthLpPrice
 * @returns
 */
const getPrice = (token, poolToken, cheesePrice, cheeseEthLpPrice) => {
  switch (poolToken) {
    case token.CHEESEETHLP:
      return cheeseEthLpPrice;
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

/**
 *
 * @param {*} cheesePrice
 * @param {*} cheeseEthLpPrice
 * @param {*} poolYield
 * @param {*} poolTokenAmount
 * @param {*} poolToken
 * @returns
 */
function getApr(
  cheesePrice,
  cheeseEthLpPrice,
  poolYield,
  poolTokenAmount,
  poolToken
) {
  const pool = poolToken.toLowerCase();
  const token = getPriceToken();
  const price = getPrice(token, pool, cheesePrice, cheeseEthLpPrice);

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

/**
 *
 * @param {*} pools
 * @param {*} totalWeight
 * @param {*} priceData
 * @param {*} ethcallProvider
 * @returns
 */
export const getStakePoolsApr = async (
  pools,
  totalWeight,
  priceData,
  ethcallProvider
) => {
  try {
    const { cheesePrice, cheeseEthLpPrice, startTime } = priceData;

    const lastT = (
      await infuraWeb3.eth.getBlock("latest")
    ).timestamp.toString();
    const startT = startTime.toString();
    const startTimestamp = parseInt(startT);
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

        //   const resultApr = pools.map(item=> )
        for (const iterator of pools) {
          const result = getApr(
            cheesePrice,
            cheeseEthLpPrice,
            convertBigNumberToNormal(
              ((stakePoolYear * iterator.weight) / totalWeight).toString(),
              18
            ),
            iterator.totalAmount,
            iterator.token,
            ethcallProvider
          );
          iterator.apr = result.apr;
          iterator.tvl = result.tvl;
        }
      }
    }
    return pools;
  } catch (error) {
    return pools;
  }
};
/**
 *
 * @param {*} token_address
 * @returns
 */
const getSymbol = (token_address) => {
  const erc20Contract = new Contract(token_address, ERC20);
  return erc20Contract.symbol();
};

/**
 *
 * @param {*} isOven
 * @param {*} isFryer
 * @returns
 */
export async function getStakePools(isOven, isFryer, isFetchSymbol = true) {
  const { address } = global.getFryerConfig();
  const { cheeseStakePool } = address;

  const ethcallProvider = new Provider(provider);
  await ethcallProvider.init();

  let pools = [];

  const cheeseStakePoolContract = new Contract(
    cheeseStakePool,
    CHEESESTAKEPOOL
  );

  const getPoolInfosCall = cheeseStakePoolContract.getPoolInfos();
  const weightCall = cheeseStakePoolContract.totalWeight();

  let requetList = [getPoolInfosCall, weightCall];

  const getPriceList = getAllPriceRequestList();
  requetList.push.apply(requetList, getPriceList);

  if (isOven) {
    const ovenRequestList = getOvenRequestList(ethcallProvider);
    requetList.push.apply(requetList, ovenRequestList);
  }

  if (isFryer) {
    const fryerRequestList = getTotalAmountRequestList(ethcallProvider);
    requetList.push.apply(requetList, fryerRequestList);
  }

  const [
    poolInfos,
    weight,
    //getPrice
    //WETH
    reserves_WETH,
    totalSupply_WETH,
    token0_WETH,
    token1_WETH,
    //Chesse
    reserves_CHEESE,
    totalSupply_CHEESE,
    token0_CHEESE,
    token1_CHEESE,

    startTime,
    // oven
    USDTBanance,
    USDCBanance,
    DAIBanance,
    USDTDecimal,
    USDCDecimal,
    DAIDecimal,
    //fryer
    totalDepositedDAI,
    totalDepositedUSDC,
    totalDepositedUSDT,
    decimalDAI,
    decimalUSDC,
    decimalUSDT,
  ] = await ethcallProvider.all(requetList);

  const WETH = getTokenAddress("WETH");
  const CHEESE = getTokenAddress("CHEESE");

  const price = await getSushiPrice(
    reserves_WETH,
    totalSupply_WETH,
    token0_WETH,
    token1_WETH,

    reserves_CHEESE,
    totalSupply_CHEESE,
    token0_CHEESE,
    token1_CHEESE,

    startTime,

    WETH,
    CHEESE,

    ethcallProvider
  );

  const priceData = getAllPrice(price);

  const totalWeight = parseInt(weight.toString());

  let obj = {};

  for (var item in poolInfos) {
    obj[item] = poolInfos[item];
  }
  let length = obj._pid.length;

  if (isFetchSymbol) {
    const poolInfosSymbolArr = [];

    for (let i = 0; i < length; i++) {
      poolInfosSymbolArr.push(getSymbol(obj._token[i].toString()));
    }

    const resPoolInfosSymbolArr = await ethcallProvider.all([
      ...poolInfosSymbolArr,
    ]);
    for (let i = 0; i < length; i++) {
      resPoolInfosSymbolArr.forEach((item, index) => {
        if (i == index) {
          pools.push({
            pid: poolInfos._pid[i].toString(),
            weight: poolInfos._weight[i].toString(),
            token: poolInfos._token[i].toString(),
            symbol: item,
            totalAmount: convertBigNumberToNormal(
              poolInfos._totalAmount[i].toString(),
              18
            ),
            lastBlockTimeStamp: poolInfos._lastBlockTimeStamp[i].toString(),
            apr: 0,
          });
        }
      });
    }
  } else {
    for (let i = 0; i < length; i++) {
      pools.push({
        pid: poolInfos._pid[i].toString(),
        weight: poolInfos._weight[i].toString(),
        token: poolInfos._token[i].toString(),
        symbol: "",
        totalAmount: convertBigNumberToNormal(
          poolInfos._totalAmount[i].toString(),
          18
        ),
        lastBlockTimeStamp: poolInfos._lastBlockTimeStamp[i].toString(),
        apr: 0,
      });
    }
  }

  const data = await getStakePoolsApr(
    pools,
    totalWeight,
    priceData,
    ethcallProvider
  );

  if (isOven || isFryer) {
    let ovenData = {};
    let fryerData = {};

    if (isOven) {
      const USDTRes = convertBigNumberToNormal(
        USDTBanance.toString(),
        USDTDecimal
      );

      const USDCRes = convertBigNumberToNormal(
        USDCBanance.toString(),
        USDCDecimal
      );

      const DAIRes = convertBigNumberToNormal(
        DAIBanance.toString(),
        DAIDecimal
      );

      const total = new BigNumber(USDTRes)
        .plus(new BigNumber(USDCRes))
        .plus(new BigNumber(DAIRes))
        .toFixed();

      ovenData = {
        USDT: USDTRes,
        USDC: USDCRes,
        DAI: DAIRes,
        total,
      };
    }

    if (isFryer) {
      let DAI = convertBigNumberToNormal(
        totalDepositedDAI.toString(),
        decimalDAI
      );

      let USDC = convertBigNumberToNormal(
        totalDepositedUSDC.toString(),
        decimalUSDC
      );

      let USDT = convertBigNumberToNormal(
        totalDepositedUSDT.toString(),
        decimalUSDT
      );

      fryerData = {
        DAI,
        USDC,
        USDT,
      };
    }

    return {
      data,
      oven: ovenData,
      fryer: fryerData,
    };
  }
  return { data };
}

export const getOvenRequestList = () => {
  const { tokens, address } = global.getFryerConfig();
  const { fryers } = address;

  const USDTContract = new Contract(tokens["USDT"], ERC20);
  const USDCContract = new Contract(tokens["USDC"], ERC20);
  const DAIContract = new Contract(tokens["DAI"], ERC20);

  return [
    USDTContract.balanceOf(fryers["USDT"]["oven"]),
    USDCContract.balanceOf(fryers["USDC"]["oven"]),
    DAIContract.balanceOf(fryers["DAI"]["oven"]),
    getDecimal(tokens["USDT"]),
    getDecimal(tokens["USDC"]),
    getDecimal(tokens["DAI"]),
  ];
};

export const getOvenBanance = async () => {
  const ethcallProvider = new Provider(provider);
  await ethcallProvider.init();

  const ovenRequestList = getOvenRequestList(ethcallProvider);

  const [
    USDTBanance,
    USDCBanance,
    DAIBanance,
    USDTDecimal,
    USDCDecimal,
    DAIDecimal,
  ] = await ethcallProvider.all(ovenRequestList);

  const USDTRes = convertBigNumberToNormal(USDTBanance.toString(), USDTDecimal);
  const USDCRes = convertBigNumberToNormal(USDCBanance.toString(), USDCDecimal);
  const DAIRes = convertBigNumberToNormal(DAIBanance.toString(), DAIDecimal);

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

export const getTotalAmountRequestList = () => {
  const { address } = global.getFryerConfig();
  const { fryers } = address;

  const DAI = getTokenAddress("DAI");
  const USDC = getTokenAddress("USDC");
  const USDT = getTokenAddress("USDT");

  const fryerContractDAI = new Contract(
    fryers[getTokenSymbol(DAI)].fryer,
    FRYER
  );

  const fryerContractUSDC = new Contract(
    fryers[getTokenSymbol(USDC)].fryer,
    FRYER
  );

  const fryerContractUSDT = new Contract(
    fryers[getTokenSymbol(USDT)].fryer,
    FRYER
  );

  const totalDepositedDAI = fryerContractDAI.totalDeposited();
  const totalDepositedUSDC = fryerContractUSDC.totalDeposited();
  const totalDepositedUSDT = fryerContractUSDT.totalDeposited();

  const decimalDAI = getDecimal(DAI);
  const decimalUSDC = getDecimal(USDC);
  const decimalUSDT = getDecimal(USDT);

  return [
    totalDepositedDAI,
    totalDepositedUSDC,
    totalDepositedUSDT,
    decimalDAI,
    decimalUSDC,
    decimalUSDT,
  ];
};

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

export const findToken = (obj, value, compare = (a, b) => a === b) => {
  return Object.keys(obj).find((k) => compare(obj[k], value));
};

export const getTokenSymbol = (token_address) => {
  const { tokens } = global.getFryerConfig();
  const symbol = findToken(tokens, token_address);
  return symbol || "unknow";
};

export function getCheesePools(token) {
  const { cheesePools } = global.getFryerConfig();
  return cheesePools[token];
}
