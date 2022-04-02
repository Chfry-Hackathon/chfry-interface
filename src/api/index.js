import { YEARN, HARVEST_VAULTS, HARVEST_POOLS } from "../constant/api";
import axios from "axios";

export const getFryerApy = async () => {
  return await axios.get(YEARN);
};

export const getHarvestVaults = async () => {
  return await axios.get(HARVEST_VAULTS);
};

export const getHarvestPools = async () => {
  return await axios.get(HARVEST_POOLS);
};
