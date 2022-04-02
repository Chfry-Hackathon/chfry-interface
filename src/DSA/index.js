import Web3 from "web3";
import { getChainId } from "../utils/getChainId";
import ChfryDSA from "chfry-dsa";

export const daiAddr = "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd";
export const zeroAddr = "0x0000000000000000000000000000000000000000";
export const ethAddr = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const chainId = getChainId();
let dsa;
let web3 = new Web3(window.ethereum);
const defAccountType = 1;

export async function getDsaWithTypeID(type) {
  return await ChfryDSA.getDsaWithTypeID(type);
}

export async function balanceOf(addr) {
  if (!addr) {
    return await ChfryDSA.getDsaBalance();
  }
  return await ChfryDSA.getDsaErc20Balance(addr);
}

export async function withdraw(parasm) {
  return await ChfryDSA.withdraw(parasm);
}

export async function repay(parasm) {
  return await ChfryDSA.repay(parasm);
}

export async function createSA(params) {
  return await ChfryDSA.createSA(params);
}
export async function isCreateAccount(type = defAccountType) {
  return await ChfryDSA.isCreatedAccount(type);
}

export function isZeroAddr(addr) {
  return zeroAddr.toLocaleUpperCase() === addr.toLocaleUpperCase();
}

export async function getAccountAddress(type = defAccountType) {
  // await ChfryDSA.attachAccount(type);
  return await ChfryDSA.getAccountAddress(type);
}

export async function getUserData() {
  return await ChfryDSA.getUserData();
}

export async function getDepositsData(type = defAccountType) {
  await ChfryDSA.attachAccount(type);
  const res = await ChfryDSA.getDeposits();
  return res;
}

export async function convertToSupplyToken(
  collateralToken,
  collateralAmount,
  supplyToken,
  leverageFactor
) {
  return ChfryDSA.convertToSupplyToken(
    collateralToken,
    collateralAmount,
    supplyToken,
    leverageFactor
  );
}

export async function getBorrowsData(type = defAccountType) {
  await ChfryDSA.attachAccount(type);
  const res = await ChfryDSA.getBorrows();
  return res;
}

export async function getReservesList() {
  return await ChfryDSA.getReservesList();
}

export async function fetchTokenPrice(tokenAddr) {
  try {
    return await ChfryDSA.fetchTokenPrice(tokenAddr);
  } catch (error) {
    return 0;
  }
}

export async function chfryDSAInitital(type = defAccountType) {
  const isTest = chainId !== 1;
  await ChfryDSA.setTestNetwork(isTest, chainId);
  await ChfryDSA.setWeb3(web3);
  dsa = await ChfryDSA.initDSABrowser(chainId);
  window.dsa = dsa;
  try {
    const res = await ChfryDSA.attachAccount(type);
    if (res && res.toLocaleUpperCase() !== zeroAddr.toLocaleUpperCase()) {
      return {
        initialSuccess: true,
        isCreatedAccount: true,
      };
    }
    return {
      initialSuccess: true,
      isCreatedAccount: false,
    };
  } catch (error) {
    return {
      initialSuccess: true,
      isCreatedAccount: false,
    };
  }
}

export async function calculateMaxLeverageLong(
  supplyToken,
  supplyAmount,
  collateralToken,
  swapLossTolerance,
  isInputCollateralToken
) {
  return await ChfryDSA.calculateMaxLeverageLong(
    supplyToken,
    supplyAmount,
    collateralToken,
    swapLossTolerance,
    isInputCollateralToken
  );
}

export async function calculateMaxLeverageShort(
  supplyToken,
  supplyAmount,
  collateralToken,
  swapLossTolerance,
  isInputCollateralToken
) {
  return await ChfryDSA.calculateMaxLeverageShort(
    supplyToken,
    supplyAmount,
    collateralToken,
    swapLossTolerance,
    isInputCollateralToken
  );
}
/**
 *
 * @param {*} supplyToken  address of token to use for leverage. eg. DAI
 * @param {*} supplyAmount   Amount to supply without erc20 decimals
 * @param {*} collateralToken  address of token to use for collateral in Aave . eg ETH.
 * @param {*} leverageFactor The multiplier for leverage . eg 2
 * @param {*} swapLossTolerance  Max allowable loss during swap as percentage
 * @returns
 */

export async function longLeverage(
  supplyToken,
  supplyAmount,
  collateralToken,
  leverageFactor,
  swapLossTolerance,
  callbackParams = {},
  isInputCollateralToken
) {
  return await ChfryDSA.longLeverage(
    supplyToken,
    supplyAmount,
    collateralToken,
    leverageFactor,
    swapLossTolerance,
    callbackParams,
    isInputCollateralToken
  );
}
export async function shortLeverage(
  supplyToken,
  supplyAmount,
  collateralToken,
  leverageFactor,
  swapLossTolerance,
  callbackParams = {},
  isInputCollateralToken
) {
  return await ChfryDSA.shortLeverage(
    supplyToken,
    supplyAmount,
    collateralToken,
    leverageFactor,
    swapLossTolerance,
    callbackParams,
    isInputCollateralToken
  );
}

export async function approveToken(tokenAddr, spenderAddr, callback = {}) {
  return await ChfryDSA.approveToken(tokenAddr, spenderAddr, callback);
}
export async function isApproved(tokenAddr, ownerAddr, spenderAddr) {
  return await ChfryDSA.isApproved(tokenAddr, ownerAddr, spenderAddr);
}
export async function addMargin(supplyToken, supplyAmount, callback) {
  return await ChfryDSA.addMargin(supplyToken, supplyAmount, callback);
}

export async function closeLongPosition(
  supplyToken,
  collateralToken,
  collateralAmount,
  swapLossTolerance,
  onConfirmation,
  onError
) {
  return await ChfryDSA.cleanLongPosition(
    supplyToken,
    collateralToken,
    collateralAmount,
    swapLossTolerance,
    onConfirmation,
    onError
  );
}
export async function closeShortPosition(
  supplyToken,
  collateralToken,
  collateralAmount,
  swapLossTolerance,
  onConfirmation,
  onError
) {
  return await ChfryDSA.cleanShortPosition(
    supplyToken,
    collateralToken,
    collateralAmount,
    swapLossTolerance,
    onConfirmation,
    onError
  );
}
export async function listLongToken() {
  return await ChfryDSA.listLongToken();
}
export async function listShortToken() {
  return await ChfryDSA.listShortToken();
}

export async function listLeverageToken() {
  return await ChfryDSA.listLeverageToken();
}
export async function getAPYAndAPR(addr) {
  return await ChfryDSA.getAPYAndAPR(addr);
}

export async function estimatedLongCollateralAmount(
  supplyToken,
  supplyAmount,
  collateralToken,
  leverageFactor
) {
  return await ChfryDSA.estimatedLongCollateralAmount(
    supplyToken,
    supplyAmount,
    collateralToken,
    leverageFactor
  );
}

export async function estimatedShortCollateralAmount(
  supplyToken,
  supplyAmount,
  collateralToken,
  leverageFactor
) {
  return await ChfryDSA.estimatedShortCollateralAmount(
    supplyToken,
    supplyAmount,
    collateralToken,
    leverageFactor
  );
}

export async function getTokenSymbolName(tokenAddr) {
  return await ChfryDSA.getTokenSymbolName(tokenAddr);
}

export async function getTokenSymbolDecimal(tokenAddr) {
  try {
    return await ChfryDSA.getDecimals(tokenAddr);
  } catch (error) {
    return 18;
  }
}

export async function estimatedLongCloseReturn(
  supplyToken,
  collateralToken,
  collateralAmount,
  swapLossTolerance
) {
  return await ChfryDSA.estimatedLongCloseReturn(
    supplyToken,
    collateralToken,
    collateralAmount,
    swapLossTolerance
  );
}
export async function estimatedShortCloseReturn(
  supplyToken,
  collateralToken,
  collateralAmount,
  swapLossTolerance
) {
  return await ChfryDSA.estimatedShortCloseReturn(
    supplyToken,
    collateralToken,
    collateralAmount,
    swapLossTolerance
  );
}

export async function withdrawFromDSA(token, amount, withdrawTo) {
  return await ChfryDSA.withdrawFromDSA(token, amount, withdrawTo);
}

export async function liquidationPriceLong(collateralToken, collateralAmount) {
  return await ChfryDSA.liquidationPriceLong(collateralToken, collateralAmount);
}
export async function liquidationPriceShort(collateralToken, collateralAmount) {
  return await ChfryDSA.liquidationPriceShort(collateralToken, collateralAmount);
}
export async function liquidationValueLong(collateralToken, collateralAmount) {
  return await ChfryDSA.liquidationValueLong(collateralToken, collateralAmount);
}
export async function liquidationValueShort(collateralToken, collateralAmount) {
  return await ChfryDSA.liquidationValueShort(collateralToken, collateralAmount);
}
