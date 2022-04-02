import global from "../common/Global";

const BASE_URL = window.location.href.replace("/#/", "/");
const { tokens } = global.getFryerConfig();
const { FRIES, CHEESE } = tokens;


export const INFURAKEY = "5961ee9234484dc88ecf848d24e25119";


export const configRegisterToken = {
  fusd: {
    address: FRIES,
    symbol: "FUSD",
    decimals: "18",
    image: BASE_URL + require("../assets/chfry/fusd.svg"),
  },
  cheese: {
    address: CHEESE,
    symbol: "CHEESE",
    decimals: "18",
    image: BASE_URL + require("../assets/chfry/cheese.svg"),
  },
};

export const flashBorrower = {
  DAI: "0xbFd94bE0F1010Ff08Da769570c9E40622Bd225e5",
  USDC: "0x6F04397E7AEe546348e3FBb1ea5d74930d30E5DD",
  USDT: "0x25262220Bea4e1F8194823f52d4f69CF372c4298",
};

export const fryers = {
  DAI: "0x4b53c22681328BB1AC8d5a96D8036BB857Bf98aC",
  USDC: "0x2445aAAE6eb4A8da5287333a17938a67B6E57602",
  USDT: "0x87Df549368a7B6a06Bf1B477D7162712F572a7C3",
};


export const CHEESE_FACTORY_CACHE_KEY = 'CHEESE_FACTORY_CACHE_KEY'