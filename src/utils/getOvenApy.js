import { getHarvestVaults, getHarvestPools } from "../api/index";
import { getYearnAndHarvestTotalValue } from "../sdk/cheese-sdk/index";
import BigNumber from "bignumber.js";
import { getChainId } from "./getChainId";
import { toFixed2 } from '../utils/tools'
/**
 * APY = (APY_now * total_principle + APY_harvest * harvest_principle) / total_principle
 * total principle = assets in yfi  +  assets in flash fryer （不包含oven的）
 *    assets in yfi： yfiAdapter.totalValue()
 *    assets in flash fryer: stableToken.balanceOf(fryer)
 *
 * APY_harvest(check harvest api）（仅Vault）
 * harvest_principle：harvestAdapter.totalValue()
 */
export async function getOvenAPY(
  params = {
    DAI: 0,
    USDT: 0,
    USDC: 0,
  }
) {
  // -- 后续写入配置global
  const addreses = {
    DAI: "0xab7FA2B2985BCcfC13c6D86b1D5A17486ab1e04C",
    USDT: "0x053c80eA73Dc6941F518a68E2FC52Ac45BDE7c9C",
    USDC: "0xf0358e8c3cd5fa238a29301d0bea3d63a17bedbe",
  };
  const chainID = getChainId();

  const network = chainID == 1 ? "eth" : chainID == 56 ? "bsc" : 1;

  const [harvestVaults, harvestPools] = await Promise.all([getHarvestVaults(), getHarvestPools()]);

  const {
    yearnDAITotalValue,
    yearnUSDCTotalValue,
    yearnUSDTTotalValue,
    harvestDAITotalValue,
    harvestUSDCTotalValue,
    harvestUSDTTotalValue,
    DAIFryerBalance,
    USDCFryerBalance,
    USDTFryerBalance,
  } = await getYearnAndHarvestTotalValue();

  const totalPrincipleDAI = new BigNumber(yearnDAITotalValue)
    .plus(new BigNumber(DAIFryerBalance))
    .toFixed();
  const totalPrincipleUSDC = new BigNumber(yearnUSDCTotalValue)
    .plus(new BigNumber(USDCFryerBalance))
    .toFixed();
  const totalPrincipleUSDT = new BigNumber(yearnUSDTTotalValue)
    .plus(new BigNumber(USDTFryerBalance))
    .toFixed();

  const harvestVaultsAPYData =
    harvestVaults.status === 200 ? harvestVaults["data"][network] : { estimatedApy: 0 };
  const harvestPoolsAPYData =
    harvestPools.status === 200 ? harvestPools["data"][network] : { estimatedApy: 0 };

  const harvestVaultsDAIAPY = harvestVaultsAPYData["DAI"].estimatedApy;
  const harvestVaultsUSDCAPY = harvestVaultsAPYData["USDC"].estimatedApy;
  const harvestVaultsUSDTAPY = harvestVaultsAPYData["USDT"].estimatedApy;

  let harvestPoolsDAIAPY = 0;
  let harvestPoolsUSDCAPY = 0;
  let harvestPoolsUSDTAPY = 0;

  if (harvestPoolsAPYData && harvestPoolsAPYData.length > 0) {
    harvestPoolsAPYData.forEach((item) => {
      const currentAddress = item.collateralAddress.toLocaleLowerCase();
      if (currentAddress === addreses["DAI"].toLocaleLowerCase()) {
        harvestPoolsDAIAPY = item.rewardAPY[0];
      } else if (currentAddress === addreses["USDC"].toLocaleLowerCase()) {
        harvestPoolsUSDCAPY = item.rewardAPY[0];
      } else if (currentAddress === addreses["USDT"].toLocaleLowerCase()) {
        harvestPoolsUSDTAPY = item.rewardAPY[0];
      }
    });
  }
  const harvestDAIAPY = new BigNumber(harvestVaultsDAIAPY)
    .plus(new BigNumber(harvestPoolsDAIAPY))
    .toFixed();
  const harvestUSDCAPY = new BigNumber(harvestVaultsUSDCAPY)
    .plus(new BigNumber(harvestPoolsUSDCAPY))
    .toFixed();
  const harvestUSDTAPY = new BigNumber(harvestVaultsUSDTAPY)
    .plus(new BigNumber(harvestPoolsUSDTAPY))
    .toFixed();

  const r1DAI = new BigNumber(params["DAI"]).times(new BigNumber(totalPrincipleDAI)).toFixed();
  const r2DAI = new BigNumber(harvestDAIAPY).times(new BigNumber(harvestDAITotalValue)).toFixed();
  const DAI_APY = new BigNumber(r1DAI)
    .plus(new BigNumber(r2DAI))
    .div(new BigNumber(totalPrincipleDAI))
    .toFixed();

  const r1USDC = new BigNumber(params["USDC"]).times(new BigNumber(totalPrincipleUSDC)).toFixed();
  const r2USDC = new BigNumber(harvestUSDCAPY)
    .times(new BigNumber(harvestUSDCTotalValue))
    .toFixed();
  const USDC_APY = new BigNumber(r1USDC)
    .plus(new BigNumber(r2USDC))
    .div(new BigNumber(totalPrincipleUSDC))
    .toFixed();

  const r1USDT = new BigNumber(params["USDT"]).times(new BigNumber(totalPrincipleUSDT)).toFixed();
  const r2USDT = new BigNumber(harvestUSDTAPY)
    .times(new BigNumber(harvestUSDTTotalValue))
    .toFixed();
  const USDT_APY = new BigNumber(r1USDT)
    .plus(new BigNumber(r2USDT))
    .div(new BigNumber(totalPrincipleUSDT))
    .toFixed();

  return {
    DAI: toFixed2(DAI_APY),
    USDC: toFixed2(USDC_APY),
    USDT: toFixed2(USDT_APY),
  };
}
