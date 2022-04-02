import { CHAINID } from "./chainId";

export const SUPPORTED_NETWORKS = {
  [CHAINID.MAINNET]: {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3"],
    blockExplorerUrls: ["https://etherscan.com"],
  },
  [CHAINID.KOVAN]: {
    chainId: 42,
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://eth-kovan.alchemyapi.io/v2/zLIYrNJ8ojafxuDenF9rk9JIVG8uUu7u"],
    blockExplorerUrls: ["https://kovan.etherscan.io"],
  },
  [CHAINID.ROPSTEN]: {
    chainId: 3,
    chainName: "Ropsten",
    nativeCurrency: {
      name: "Ropsten Ether",
      symbol: "ROP",
      decimals: 18,
    },
    rpcUrls: ["https://ropsten.infura.io/v3"],
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
  [CHAINID.FANTOM]: {
    chainId: "0xfa",
    chainName: "Fantom",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpcapi.fantom.network"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  [CHAINID.BSC]: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  [CHAINID.BSC_TESTNET]: {
    chainId: `0x${parseInt(CHAINID.BSC_TESTNET, 10).toString(16)}`,
    chainName: "Binance Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
  [CHAINID.MATIC]: {
    chainId: "0x89",
    chainName: "Matic",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mainnet.maticvigil.com"], // ['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ["https://explorer-mainnet.maticvigil.com"],
  },
  [CHAINID.HECO]: {
    chainId: "0x80",
    chainName: "Heco",
    nativeCurrency: {
      name: "Heco Token",
      symbol: "HT",
      decimals: 18,
    },
    rpcUrls: ["https://http-mainnet.hecochain.com"],
    blockExplorerUrls: ["https://hecoinfo.com"],
  },
  [CHAINID.XDAI]: {
    chainId: "0x64",
    chainName: "xDai",
    nativeCurrency: {
      name: "xDai Token",
      symbol: "xDai",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.xdaichain.com"],
    blockExplorerUrls: ["https://blockscout.com/poa/xdai"],
  },
  [CHAINID.HARMONY]: {
    chainId: "0x63564C40",
    chainName: "Harmony",
    nativeCurrency: {
      name: "One Token",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: [
      "https://api.harmony.one",
      "https://s1.api.harmony.one",
      "https://s2.api.harmony.one",
      "https://s3.api.harmony.one",
    ],
    blockExplorerUrls: ["https://explorer.harmony.one/"],
  },
  [CHAINID.AVALANCHE]: {
    chainId: "0xA86A",
    chainName: "Avalanche",
    nativeCurrency: {
      name: "Avalanche Token",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network"],
  },
  [CHAINID.OKEX]: {
    chainId: "0x42",
    chainName: "OKEx",
    nativeCurrency: {
      name: "OKEx Token",
      symbol: "OKT",
      decimals: 18,
    },
    rpcUrls: ["https://exchainrpc.okex.org"],
    blockExplorerUrls: ["https://www.oklink.com/okexchain"],
  },
  [CHAINID.ARBITRUM]: {
    chainId: "0xA4B1",
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://mainnet-arb-explorer.netlify.app"],
  },
  [CHAINID.CELO]: {
    chainId: "0xA4EC",
    chainName: "Celo",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org"],
  },
  [CHAINID.PALM]: {
    chainId: "0x2A15C308D",
    chainName: "Palm",
    nativeCurrency: {
      name: "Palm",
      symbol: "PALM",
      decimals: 18,
    },
    rpcUrls: [
      "https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267",
    ],
    blockExplorerUrls: ["https://explorer.palm.io"],
  },
};
