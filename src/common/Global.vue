<script>
import {setContractAddress, setTokensAddress} from "../sdk/cheese-sdk";
import {trace} from "../utils/tools";

const isClose = false;
const openLog = false;
const poundage = 0.0006;

let version = "";
const pathList = {
  buyCheese: "https://app.sushi.com/swap?inputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&outputCurrency=0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59 ",
  buyFryusd: "https://curve.fi/factory/45",
  Medium:' https://medium.com/@chfry_finance',
  Discord: "https://discord.gg/E2N7XRVxqx",
  Telegram: "https://t.me/ChfryFinance",
  Twitter: "https://twitter.com/ChfryFinance",
  Immunefi: "https://immunefi.com/bounty/chfryfinance",
  Github: " https://github.com/chfry-finance",
  Gitbook: "https://docs-chfry.gitbook.io",
  Audit: "https://github.com/chfry-finance/chfry-protocol/blob/master/docs/PeckShield-Audit-Report-Chfry-v1.0.pdf",
  WhitePaper: "https://github.com/chfry-finance/chfry-protocol/blob/master/docs/CHFRY%20-%20Whitepaper.pdf",
  EventLink: "https://sweepwidget.com/view/38816-2k0ldzt7",
};

let cheesePools={};

const TEST =  {
  chainID: 3,
  address: {
    graph: 'https://test-api.chfry.finance/subgraphs/name/chfry/test/graphql',
    infura: "https://ropsten.infura.io/v3/cbefa182812d408f9eba8447c34ae811",
    multiSigWal: "0xf5F0379338e6c906f5D4e05f6F48f61A32AA429E",
    tokenTimelockManager: "0x9DF6113A673A742e8dfFfbC57E64158294704B57",
    cheeseFactory: "0xc84aF5408200956e1e72A65E4a141e4F50449f57",
    cheeseStakePool: "0x4d7a5ECc57127268aFF27dBb23C708b9eC9023D9",
    cheeseTeamStakePool: "0x150b39a7866655c2183fE970643321c28B7dB25f",
    ido:{
      // contractAddress: '0xf657666c7823c68dcca168c4c1c9a28d9d04ec29',
      contractAddress: '0x368c8ab95a668b18af9ad302e14da43693a1a902',
      spotPriceOut:'0x767fe9edc9e0df98e07454847909b5e959d7ca0e'
    },
    flashBorrower: {
      "contractAddress":"0x67C3BcCd89D4A73b6DA50373D1EB82A6E52d9D67",
      "DAI": "0x68d2f039Ed0D5460E1979aFA5De848C76784764e",
      "USDC": "0x2F1E8F36a874dCd056d5Cb3dA67f0ffc96044B81",
      "USDT": "0x7A4AD37dbEc5A362C8b6A5bb51062ccB715fBa52",
    },
    fryers: {
      "DAI": {
        "name": "DAI",
        "fryerConfig": "0xA16d45631ef9B35691991BD09B5220fc69f9408D",
        "fryer": "0xebC02CCD85791a010330b8C483D263693A804B3F",
        "oven": "0xe531833152c53d8531170E2102525681e214FE73",
        "yearnControllerMock": "0x40480bd93611F6dDBAD884Fe1E4fdbf06ece3b96",
        "yearnVaultMock": "0x2033B9ddA1C5270788FaA3751627aF87d7174eab",
        "yearnVaultAdapter": "0x52004B4599882345cc29716A347502ff9718D74D",
      },
      "USDC": {
        "name": "USDC",
        "fryerConfig": "0x893Fa6124e8A43f6C5526514FCc64896bDB928fe",
        "fryer": "0x28e0faf5a9B2F6151be1CEc73DDD0AE9Becbbc63",
        "oven": "0xF4133Af2A11E22381c3aB107c0c1dD0D5DF72AAF",
        "yearnControllerMock": "0x6afb85B5a23A8f32e17Fd1520D715F8f6a1A22A2",
        "yearnVaultMock": "0x367eb7b5F66CB1bA0a3e3D6bfb4bfBd74aE0066d",
        "yearnVaultAdapter": "0xAe952D048331C9c88065E081C4ac2E768ACec9e0",
      },
      "USDT": {
        "name": "USDT",
        "fryerConfig": "0x8033AEcC99a5e5f41d3a8949E4a12D8a8EbED76C",
        "fryer": "0x61C732422404e6A60cCcFd2De9589aC87c3309Fc",
        "oven": "0x60aE8758dC55b89A3C203Ae770043721C85454a6",
        "yearnControllerMock": "0x5Fac23E09aE86F9ca5A5651ce6463dF993255C51",
        "yearnVaultMock": "0x5E3c6528708C5E0A482c061af7BE5Ac3e93201E0",
        "yearnVaultAdapter": "0xb386e9340c8E4e60912bD0e9A1111C01d8728A7F",
      }
    }
  },
  tokens: {
    DAI: "0x04aa61306D49183857CaD4dd66C415e24E094867",
    USDT: "0x7f617A31bcf8C92A58be547d427F6AE78B22fEe2",
    USDC: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
    FRIES: "0xDf1888F2190E34AbB32b4CB1ae0815B1F6CAbC94",
    CHEESE: "0x708A7efd23db1C2fD5C9f7534dF5c9cEc1B31056",
    FRIESUSD3CRV: "0xd1605c9d48c8883200b39813A464a884812C0341",
    CHEESEETHLP: "0x61B21f5a80A60aE6Cf6547a30bc64b206Bd7EEf1",
    ALUSD: "0x97cc4E4B211648c8380E208bA37fC602e6c65731",
  },
  cheesePools : {
    "0xd1605c9d48c8883200b39813A464a884812C0341": {
      symbol: "fUSD 3CRV",
      icon: "fUSD3CRV.svg",
      icon2: "fUSD3CRV_T.png",
    },
    "0xDf1888F2190E34AbB32b4CB1ae0815B1F6CAbC94": {
      symbol: "fUSD",
      icon: "FRIES.svg",
      icon2: "FRIES_T.png",
    },
    "0x61B21f5a80A60aE6Cf6547a30bc64b206Bd7EEf1": {
      symbol: "CheeseEthLP",
      icon: "Cheese-ETH LP.svg",
      icon2: "Cheese-ETH LP_T.png",
    },
    "0x708A7efd23db1C2fD5C9f7534dF5c9cEc1B31056": {
      symbol: "CHEESE TOKEN",
      icon: "CHEESE.svg",
      icon2: "CHEESE_T.png",
    },
    "0x97cc4E4B211648c8380E208bA37fC602e6c65731": {
      symbol: "ALUSD",
      icon: "ALUSD.svg",
      icon2: "ALUSD_T.png",
    },
  }
};

// const DEMO =  {
//   chainID: 97,
//   address: {
//     graph: 'https://demo-api.chfry.finance/subgraphs/name/chfry/demo',
//     infura: "https://data-seed-prebsc-1-s2.binance.org:8545/",
//     multiSigWal: "0xEe91186b322e2a9D103a448237761b24b13be99F",
//     tokenTimelockManager: "0xc8400490BD68A76FC7D7aa9533dbBC239324e337",
//     cheeseFactory: "0x80d5535260D899693c4CA3897dd7b44Ba41Cfb7C",
//     cheeseStakePool: "0xe75f1cd42bC91D4e7E6D4CdF999F68a1E788559c",
//     cheeseTeamStakePool: "0x44909da1600a2eC7940c81E8E5074264a0C5C016",
//     ido:{
//       contractAddress: '0xf657666c7823c68dcca168c4c1c9a28d9d04ec29',
//       spotPriceOut:'0x767fe9edc9e0df98e07454847909b5e959d7ca0e'
//     },
//     flashBorrower: {
//       "contractAddress": "0x67C3BcCd89D4A73b6DA50373D1EB82A6E52d9D67",
//       "DAI": "0x951346391259F533C69a5fE11b912f1a9A147725",
//       "USDC": "0x52d3503B221012f91394ec6c02cC02A75Ba9Cc3c",
//       "USDT": "0x431A2Ca02e558a8dC4dADB18F125eC966Cc7eAd6",
//     },
//     fryers: {
//       "DAI": {
//         "name": "DAI",
//         "fryerConfig": "0x587B15F59741b2a7EfEE3Ab70b93dC08c7bA39Fd",
//         "fryer": "0x4b53c22681328BB1AC8d5a96D8036BB857Bf98aC",
//         "oven": "0xfFCd4366f96Bf3E3b14514A658483CeA77474d14",
//         "yearnControllerMock": "0xA7D92dDEE9A631c9A1085DBC97184D270D33d590",
//         "yearnVaultMock": "0x65aa683b4165AFf9aF57F45BDE2d69004C96AA1F",
//         "yearnVaultAdapter": "0xcC3a17Fa9cABA4A00F093Afe160E444Dc7624915",
//       },
//       "USDC": {
//         "name": "USDC",
//         "fryerConfig": "0x26D15f5Bf328784DE4D088c82f1E569257CE7AFE",
//         "fryer": "0x2445aAAE6eb4A8da5287333a17938a67B6E57602",
//         "oven": "0x0163c6B03eeBc9E0DF58F86D57bc9eF81fB3c71a",
//         "yearnControllerMock": "0x35Eb58A12e57798F01667D13d777439b86De97F5",
//         "yearnVaultMock": "0xCCE22d435cFE8d8a6CAF9C498A659d9D789aF9DE",
//         "yearnVaultAdapter": "0xC825888F3b27DE2557eFB351E2961418371C2285",
//       },
//       "USDT": {
//         "name": "USDT",
//         "fryerConfig": "0xE95ae5B2F81AD3d698f8b14D66a946807345c771",
//         "fryer": "0x87Df549368a7B6a06Bf1B477D7162712F572a7C3",
//         "oven": "0xAE3bf5A48C7DD3d98e22157F2D6563F0348534B5",
//         "yearnControllerMock": "0x3782F6a5Bc391fFB53BF5074973c5b3a70232D85",
//         "yearnVaultMock": "0x9cFa65A773B110b994b53fF30b6e4f66B7bAf44d",
//         "yearnVaultAdapter": "0x76BE11efcD25dE05ba226Cb6bF561356ce413C7b",
//       }
//     }
//   },
//   tokens: {
//     DAI: "0x951346391259F533C69a5fE11b912f1a9A147725",
//     USDT: "0x431A2Ca02e558a8dC4dADB18F125eC966Cc7eAd6",
//     USDC: "0x52d3503B221012f91394ec6c02cC02A75Ba9Cc3c",
//     FRIES: "0x046598FC6611E6668D1D146686864bcD0761f66D",
//     CHEESE: "0x977D1650E793F10fEa9148307cfd4991F55f7c05",
//     FRIESUSD3CRV: "0x239Fe6BfA3d2b0A963513628b5bBC2f90FfC2709",
//     CHEESEETHLP: "0x74597D4035052A651C74c7790630EEa0aCcc3886",
//     ALUSD: "0x804E6224c79EfaB69347ae59be1612A9a47405F5",
//     MIM: "0x34039F6d79De9DD540168aD60C9aA704015fA568",
//   },
//   cheesePools : {
//     "0x239Fe6BfA3d2b0A963513628b5bBC2f90FfC2709": {
//       symbol: "fUSD 3CRV",
//       icon: "fUSD3CRV.svg",
//       icon2: "fUSD3CRV_T.png",
//     },
//     "0x046598FC6611E6668D1D146686864bcD0761f66D": {
//       symbol: "fUSD",
//       icon: "FRIES.svg",
//       icon2: "FRIES_T.png",
//     },
//     "0x74597D4035052A651C74c7790630EEa0aCcc3886": {
//       symbol: "CheeseEthLP",
//       icon: "Cheese-ETH LP.svg",
//       icon2: "Cheese-ETH LP_T.png",
//     },
//     "0x977D1650E793F10fEa9148307cfd4991F55f7c05": {
//       symbol: "CHEESE TOKEN",
//       icon: "CHEESE.svg",
//       icon2: "CHEESE_T.png",
//     },
//     "0x804E6224c79EfaB69347ae59be1612A9a47405F5": {
//       symbol: "ALUSD",
//       icon: "ALUSD.svg",
//       icon2: "ALUSD_T.png",
//     },
//     "0x34039F6d79De9DD540168aD60C9aA704015fA568": {
//       symbol: "MIM TOKEN",
//       icon: "MIM.png",
//       icon2: "MIM_T.png",
//     },
//   }
// };
const DEMO =  {
  chainID: 97,
  address: {
    graph: 'https://demo-api.chfry.finance/subgraphs/name/chfry/demo',
    infura: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    multiSigWal: "0xEe91186b322e2a9D103a448237761b24b13be99F",
    tokenTimelockManager: "0xc8400490BD68A76FC7D7aa9533dbBC239324e337",
    cheeseFactory: "0x80d5535260D899693c4CA3897dd7b44Ba41Cfb7C",
    cheeseStakePool: "0xe75f1cd42bC91D4e7E6D4CdF999F68a1E788559c",
    cheeseTeamStakePool: "0x44909da1600a2eC7940c81E8E5074264a0C5C016",
    ido:{
      contractAddress: '0xf657666c7823c68dcca168c4c1c9a28d9d04ec29',
      spotPriceOut:'0x767fe9edc9e0df98e07454847909b5e959d7ca0e'
    },
    flashBorrower: {
      "contractAddress": "0x67C3BcCd89D4A73b6DA50373D1EB82A6E52d9D67",
      "DAI": "0x951346391259F533C69a5fE11b912f1a9A147725",
      "USDC": "0x52d3503B221012f91394ec6c02cC02A75Ba9Cc3c",
      "USDT": "0x431A2Ca02e558a8dC4dADB18F125eC966Cc7eAd6",
    },
    fryers: {
      "DAI": {
        "name": "DAI",
        "fryerConfig": "0x587B15F59741b2a7EfEE3Ab70b93dC08c7bA39Fd",
        "fryer": "0x0ea14eb8316ef0CCD54EB9a840B9c3F4CE26a2F8",
        "oven": "0xfFCd4366f96Bf3E3b14514A658483CeA77474d14",
        "ovenV2": "0x6Ca613C4a42085a829C504b06C7b5F72F43bd8bD",
        "yearnControllerMock": "0x37AE7ba8B89179897E9a65Eb631EBC1716d8e7ab",
        "yearnVaultMock": "0xA8DCc451685cff21e5ded625259c875003EE1a7A",
        "yearnVaultAdapter": "0x5BE7b51252457a53094455C8e76a5ACE6D58c9D6",
      },
      "USDC": {
        "name": "USDC",
        "fryerConfig": "0x26D15f5Bf328784DE4D088c82f1E569257CE7AFE",
        "fryer": "0x2445aAAE6eb4A8da5287333a17938a67B6E57602",
        "oven": "0x0163c6B03eeBc9E0DF58F86D57bc9eF81fB3c71a",
        "ovenV2": "0x0163c6B03eeBc9E0DF58F86D57bc9eF81fB3c71a",
        "yearnControllerMock": "0x35Eb58A12e57798F01667D13d777439b86De97F5",
        "yearnVaultMock": "0xCCE22d435cFE8d8a6CAF9C498A659d9D789aF9DE",
        "yearnVaultAdapter": "0xC825888F3b27DE2557eFB351E2961418371C2285",
      },
       "USDT": {
        "name": "USDT",
        "fryerConfig": "0xE95ae5B2F81AD3d698f8b14D66a946807345c771",
        "fryer": "0x3fAf38ABC1EfFC94A2DE031636Feb9B4c118f489",
        "oven": "0xAE3bf5A48C7DD3d98e22157F2D6563F0348534B5",
        "ovenV2": "0x2bcbFE17597957f6a34d580B0A99802f3E8F629e",
        "yearnControllerMock": "0x9e6a9d3FC2D4cD793CDB030067eBCf2B8d53dF23",
        "yearnVaultMock": "0x0ae683cC0468e318b1d86152a9b0651B0Fa70FE2",
        "yearnVaultAdapter": "0x36EBB6cE4e4829F6dEB4E88fEF4773EE113b7f09",
      },
    }
  },
  tokens: {
    DAI: "0x951346391259F533C69a5fE11b912f1a9A147725",
    USDT: "0x431A2Ca02e558a8dC4dADB18F125eC966Cc7eAd6",
    USDC: "0x52d3503B221012f91394ec6c02cC02A75Ba9Cc3c",
    FRIES: "0x046598FC6611E6668D1D146686864bcD0761f66D",
    CHEESE: "0x977D1650E793F10fEa9148307cfd4991F55f7c05",
    FRIESUSD3CRV: "0x239Fe6BfA3d2b0A963513628b5bBC2f90FfC2709",
    CHEESEETHLP: "0x74597D4035052A651C74c7790630EEa0aCcc3886",
    ALUSD: "0x804E6224c79EfaB69347ae59be1612A9a47405F5",
    MIM: "0x34039F6d79De9DD540168aD60C9aA704015fA568",
  },
  cheesePools : {
    "0x239Fe6BfA3d2b0A963513628b5bBC2f90FfC2709": {
      symbol: "fUSD 3CRV",
      icon: "fUSD3CRV.svg",
      icon2: "fUSD3CRV_T.png",
    },
    "0x046598FC6611E6668D1D146686864bcD0761f66D": {
      symbol: "fUSD",
      icon: "FRIES.svg",
      icon2: "FRIES_T.png",
    },
    "0x74597D4035052A651C74c7790630EEa0aCcc3886": {
      symbol: "CheeseEthLP",
      icon: "Cheese-ETH LP.svg",
      icon2: "Cheese-ETH LP_T.png",
    },
    "0x977D1650E793F10fEa9148307cfd4991F55f7c05": {
      symbol: "CHEESE TOKEN",
      icon: "CHEESE.svg",
      icon2: "CHEESE_T.png",
    },
    "0x804E6224c79EfaB69347ae59be1612A9a47405F5": {
      symbol: "ALUSD",
      icon: "ALUSD.svg",
      icon2: "ALUSD_T.png",
    },
    "0x34039F6d79De9DD540168aD60C9aA704015fA568": {
      symbol: "MIM TOKEN",
      icon: "MIM.png",
      icon2: "MIM_T.png",
    },
  }
};
const TESTNET =  {
  chainID: 1,
  address: {
    graph:'https://testnet-api.chfry.finance/subgraphs/name/chfry/testnet',
    // graph: "https://testnet-api.chfry.finance/subgraphs/name/chfry/testnet/graphql",
    infura: "https://mainnet.infura.io/v3/5961ee9234484dc88ecf848d24e25119",
    dsaGraph: "https://stagging-eth-api.chfry.finance/subgraphs/name/chfry-dsa/mainnet-beta",
    aaveStakeReward: "0x960d7F7dB1aba1A8099cBdA0a16F676c6CC057ed",
    leverageReward:'0x6bDAF242f044Eb3a715CAaf741D89DaB46394294',
    eventCenter:"0x6BeE23658787a61f843C58c74b2F0Ff49917C74b",
    multiSigWal: "",
    tokenTimelockManager: "",
    cheeseFactory: "0x73eaEE79563A06b57a879621d205C5BB662596B1",
    cheeseStakePool: "0x37D92576C4db8f4317b3438e90f01074D51196ED",
    cheeseTeamStakePool: "0x7D40d5ecf31Af9C7a7E32aa5d7b34CdCC930a647",
    flashBorrower: {
      "contractAddress": "0x4EF9C46cfCeE9fC93c828c3754C6b9E1b88b0554",
      "DAI": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "USDC": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "USDT": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    ido:{
      contractAddress: '0xf657666c7823c68dcca168c4c1c9a28d9d04ec29',
      // contractAddress: '0x368c8ab95a668b18af9ad302e14da43693a1a902',
      spotPriceOut:'0x79ebf91e22ee6064a94D10489Dd39Ed0A638FcD7'
    },
    fryers: {
      "DAI": {
        "name": "DAI",
        "fryerConfig": "0x6cEEbbEC738C3b880E2a8C779846BCEA92FFb608",
        "fryer": "0x18A6B56eEf252abF858B0f1b4209846D5bB1fF0F",
        "oven": "0x0F768cE5053753B29047732ca7eeb0c8BFC78672",
        "yearnControllerMock": "",
        "yearnVaultMock": "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
        "yearnVaultAdapter": "0xDc63eD5288F1057Afd093A26d616077089C09a2B",
      },
      "USDC": {
        "name": "USDC",
        "fryerConfig": "0x066Ab32ac25C359a91E81c31862D0A2D55598bf1",
        "fryer": "0x4A0Ab5f62124A7fC263875CC07753966B7aB0688",
        "oven": "0xEd037f1c609A7bA4bD12ef317ce599923203c0e9",
        "yearnControllerMock": "",
        "yearnVaultMock": "0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9",
        "yearnVaultAdapter": "0x2F5C6d3FB841f22431AF7bBb39037D927279e70C",
      },
      "USDT": {
        "name": "USDT",
        "fryerConfig": "0xB6cADB64b72A64AA1e9768d3D70958069D64B011",
        "fryer": "0x36951ad303068F7965E4df62A730e3338acF0504",
        "oven": "0x6F7B469b72f5627B3D663B4D1580622E6A7F7841",
        "yearnControllerMock": "",
        "yearnVaultMock": "0x7Da96a3891Add058AdA2E826306D812C638D87a7",
        "yearnVaultAdapter": "0x157D97975dD32D64B2EFcFBC9b9Ff958dbDa1aEd",
      }
    }
  },
  tokens: {
    DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
    USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    FRIES: "0xf6226fe14df431c2c8de9b3215b3dda9eba3ab3b",
    CHEESE: "0x79ebf91e22ee6064a94D10489Dd39Ed0A638FcD7",
    FRIESUSD3CRV: "0xac5f019a302c4c8caac0a7f28183ac62e6e80034",
    ALUSD: "",
    CHEESEETHLP: "0xfDE6236e842334B10A739a0e29db5a2eB80d299C",
    WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    WETHUSDTSUSHILP: "0x06da0fd433C1A5d7a4faa01111c044910A184553",
    MIM: "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3",
  },
  cheesePools : {
     "0xAc5f019a302c4c8caAC0a7F28183ac62E6e80034": {
      symbol: "fUSD 3CRV",
      icon: "fUSD3CRV.svg",
      icon2: "fUSD3CRV_T.png",
    },
    "0xfDE6236e842334B10A739a0e29db5a2eB80d299C": {
      symbol: "CheeseEthLP",
      icon: "Cheese-ETH LP.svg",
      icon2: "Cheese-ETH LP_T.png",
    },
    "0x79ebf91e22ee6064a94D10489Dd39Ed0A638FcD7": {
      symbol: "CHEESE TOKEN",
      icon: "CHEESE.svg",
      icon2: "CHEESE_T.png",
    },
    "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3": {
      symbol: "MIM TOKEN",
      icon: "MIM.png",
      icon2: "MIM_T.png",
    },
  }
};

const PROD = {
  chainID: 1,
  address: {
    graph: "https://api.chfry.finance/subgraphs/name/chfry/prod",
    infura: "https://mainnet.infura.io/v3/5961ee9234484dc88ecf848d24e25119",
    dsaGraph: "https://eth-api.chfry.finance/subgraphs/name/chfry-dsa/main",
    aaveStakeReward: "0x960d7F7dB1aba1A8099cBdA0a16F676c6CC057ed",
    leverageReward:'0x8b2B3fA916fEaEAEEC652b6DBbE84e1855ebc39d',
    eventCenter:"0x2E3Ba70AFbe3d2687eea2cA072357D0a60D30Fc9",
    multiSigWal: "",
    tokenTimelockManager: "",
    cheeseFactory: "0x689e42b8febcd66D48539Cd0fA18cA13d79b9822",
    cheeseStakePool: "0xC9E86C84c343E2aA0EB8259152F87291dbf8186f",
    cheeseTeamStakePool: "0x85Cfd17E40A6D369620515c6b580322dC60b0a98",
    flashBorrower: {
      "contractAddress": "0x1fef181bc1969d24d7a4b170bcd7e671ed9f4075",
      "DAI": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "USDC": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "USDT": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    ido:{
      // contractAddress: '0xf657666c7823c68dcca168c4c1c9a28d9d04ec29',
      contractAddress: '0x368c8ab95a668b18af9ad302e14da43693a1a902',
      spotPriceOut:'0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59'
    },
    fryers: {
      "DAI": {
        "name": "DAI",
        "fryerConfig": "0x78001C780563291ED1224c997b6785e28886F642",
        "fryer": "0x87F6fAA87358B628498E8DCD4E30b0378fEaFD07",
        "oven": "0x0F768cE5053753B29047732ca7eeb0c8BFC78672",
        "yearnControllerMock": "",
        "yearnVaultMock": "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
        "yearnVaultAdapter": "0xd5F38f4F1e0c157dd1AE8Fd66EE2761A14eF7324",
        "harvestVaultAdapter": "0x28C85c2406a5E9a21C9b8E9d59F30E6375Fb9c3a"
      },
      "USDC": {
        "name": "USDC",
        "fryerConfig": "0x0824A617A6Cb87C79E50A14B51c7932A56827763",
        "fryer": "0x7E271Eb034dFc47B041ADf74b24Fb88E687abA9C",
        "oven": "0xEd037f1c609A7bA4bD12ef317ce599923203c0e9",
        "yearnControllerMock": "",
        "yearnVaultMock": "0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE",
        "yearnVaultAdapter": "0x782bc9B1F11cDBa13aCb030cDab04f04FB667846",
        "harvestVaultAdapter": "0x6E9Cb5b16278A12Fd4459483AB6DE157c7894104"

      },
      "USDT": {
        "name": "USDT",
        "fryerConfig": "0x51749319266A3eEdd77CD17d994860a11Fb26591",
        "fryer": "0xd1ffa2cbAE34FF85CeFecdAb0b33E7B1DC19024b",
        "oven": "0x6F7B469b72f5627B3D663B4D1580622E6A7F7841",
        "yearnControllerMock": "",
        "yearnVaultMock": "0x7Da96a3891Add058AdA2E826306D812C638D87a7",
        "yearnVaultAdapter": "0x87e51ebF96eEB023eCc28536Ad0DBca83dEE0203",
        "harvestVaultAdapter": "0x093ba6569ea6288Aa6C1c94c9A50E329b0997874"

      }
    }
  },
  tokens: {
    DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
    USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    FRIES: "0x42ef9077d8e79689799673ae588E046f8832CB95",//
    CHEESE: "0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59",//
    FRIESUSD3CRV: "0xC2F5FeA5197a3d92736500Fd7733Fcc7a3bBDf3F",
    ALUSD: "0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9",
    CHEESEETHLP: "0x1ca8B9a61FDbe55bc038a90297278C080Ad1B9fD",
    WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    WETHUSDTSUSHILP: "0x06da0fd433C1A5d7a4faa01111c044910A184553",
    MIM: "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3",
  },
  cheesePools : {
     "0xC2F5FeA5197a3d92736500Fd7733Fcc7a3bBDf3F": {
      symbol: "fUSD 3CRV",
      icon: "fUSD3CRV.svg",
      icon2: "fUSD3CRV_T.png",
    },
    "0x42ef9077d8e79689799673ae588E046f8832CB95": {
      symbol: "fUSD",
      icon: "FRIES.svg",
      icon2: "FRIES_T.png",
    },
    "0x1ca8B9a61FDbe55bc038a90297278C080Ad1B9fD": {
      symbol: "CheeseEthLP",
      icon: "Cheese-ETH LP.svg",
      icon2: "Cheese-ETH LP_T.png",
    },
    "0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59": {
      symbol: "CHEESE TOKEN",
      icon: "CHEESE.svg",
      icon2: "CHEESE_T.png",
    },
    "0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9": {
      symbol: "ALUSD",
      icon: "ALUSD.svg",
      icon2: "ALUSD_T.png",
    },
    "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3": {
      symbol: "MIM TOKEN",
      icon: "MIM.png",
      icon2: "MIM_T.png",
    },
  }
};

const testkovan = {
  chainID: 42,
  address: {
    graph: "https://api.thegraph.com/subgraphs/name/dukedaily/chfrydec17kovan",
    infura: "https://eth-kovan.alchemyapi.io/v2/zLIYrNJ8ojafxuDenF9rk9JIVG8uUu7u",
    // dsaGraph: "https://api.thegraph.com/subgraphs/name/z-x-l/center",
    // dsaGraph: "https://api.thegraph.com/subgraphs/name/z-x-l/event",
    dsaGraph: "https://kovan2-api.chfry.finance/subgraphs/name/chfry-dsa/kovan-testing",
    leverageReward:'0xBD44eb28Bc009d24DdADCEac5A73afB1D53020dC',
    leverage:"0xbC95c27821f16AF28Ab5Ca007e59A9a9FbC600A1",
    eventCenter:"0x4Cc969B88E99Ed712885bAc0a0b67D1F4F1c84Ce",

    multiSigWal: "",
    tokenTimelockManager: "",
    cheeseFactory: "0x11a1C4503EeB490D837a65E7b9f09E4C864a77a7",
    cheeseStakePool: "0x7a41cDFC589De7FC9b889030e2769DD5aD152e42",
    cheeseTeamStakePool: "0xb0D392cafE33431A883daCfc129FCd6734a7Fa7C",
    flashBorrower: {
      "contractAddress": "0xD9201395C48C5ea9C70B4e0D5c93239D49D96BE1",
      "DAI": "0x749B1c911170A5aFEb68d4B278cD5405C718fc7F",
      "USDC": "0x81a1e832f0684864cec2A4801471B496D83E1A70",
      "USDT": "0x7d680bf06F3Ad6C0cBd5E28B5f32C372b0fdF55A",
    },
    ido:{
      // contractAddress: '0xf657666c7823c68dcca168c4c1c9a28d9d04ec29',
      contractAddress: '0x368c8ab95a668b18af9ad302e14da43693a1a902',
      spotPriceOut:'0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59'
    },
    fryers: {
      "DAI": {
        "name": "DAI",
        "fryerConfig": "0x4855184BbDa789aC316360c9eAbD986537A07454",
        "fryer": "0x56555a7e5fD498f4Ee9d0143C17e5f83B2176BE7",
        // "oven": "0x84c6C1586c1594826985576e61f68442Cf4C3cd2",
        "oven": "0x6AD529412bCee908215E5a411F858Ab4eD39035A",
        "ovenV2": "0x6AD529412bCee908215E5a411F858Ab4eD39035A",
        "yearnControllerMock": "0xDC37D25069F4948Ed3df504e1855ab8Ad5951868",
        "yearnVaultMock": "0x104a25b8b2fFe8E5574e16D26ce7F9A850909f76",
        "yearnVaultAdapter": "0x66d70F274468327F24D37156D7E328220D337F35",
      },
      "USDC": {
        "name": "USDC",
        "fryerConfig": "0x4B6dF87C4d03c8664B267832F62F259be66Dae69",
        "fryer": "0x7139a5901E3EDFA2385F0Ec7A77F51C900ef0Cff",
        // "oven": "0x997A3b24f7C1D75986E391235B2a5a9e77b28a68",
        "oven": "0xDfBaDff1eE7028ED05ab0c6FcDB86Ab41B746BE7",
        "ovenV2": "0xDfBaDff1eE7028ED05ab0c6FcDB86Ab41B746BE7",
        "yearnControllerMock": "0xA515C20da48DeE9c892Ef0aAD11D40931bBA6096",
        "yearnVaultMock": "0x1fda3A946Fec29fF44254a3f015DCc16BF3220DF",
        "yearnVaultAdapter": "0xa81f469160CdDa6b486A7c010181B8F3E97A387C",
      },
      "USDT": {
        "name": "USDT",
        "fryerConfig": "0x439536bBce409f69cBB5D364B31d5BC47E66a480",
        "fryer": "0x2E55d8514C41018ae5EC02298f128c61bB09B599",
        // "oven": "0xD334739B8C94a4B8Ae9ea468Aea97C8260187D58",
        "oven": "0x2aB20081f50adBB0157Adf85bCCE7FA34Dbad258",
        "ovenV2": "0x2aB20081f50adBB0157Adf85bCCE7FA34Dbad258",
        "yearnControllerMock": "0x8f0C469Ac322F6C88776063C2cCe8A65041dB8C1",
        "yearnVaultMock": "0x3546c3c5a07E3FfE592116a6447522fE222031D1",
        "yearnVaultAdapter": "0xC165991f8046382E7b4c666D807F28C10520d33d",
      }
    }
  },
  tokens: {
    DAI: "0x749B1c911170A5aFEb68d4B278cD5405C718fc7F",
    USDT: "0x7d680bf06F3Ad6C0cBd5E28B5f32C372b0fdF55A",
    USDC: "0x81a1e832f0684864cec2A4801471B496D83E1A70",
    FRIES: "0x65F79Cd3a05e35a6133106BAce2B2CaC246F6f28",//
    CHEESE: "0xBa744B0d75FeEF90557834c63f11fc2A75462c39",//
    FRIESUSD3CRV: "0xe62F4B50C29E8B2835dEA0da854c99912F991065",
    ALUSD: "0x4383A289275ae30f9240A07f8b975FD0cf4f9C62",
    CHEESEETHLP: "0xBfcDeC52C4a189E61FB08CDF27b8Bff74Be85D70",
    WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    WETHUSDTSUSHILP: "0x06da0fd433C1A5d7a4faa01111c044910A184553",
    MIM: "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3",
  },
  cheesePools : {
     "0xe62F4B50C29E8B2835dEA0da854c99912F991065": {
      symbol: "fUSD 3CRV",
      icon: "fUSD3CRV.svg",
      icon2: "fUSD3CRV_T.png",
    },
    "0x42ef9077d8e79689799673ae588E046f8832CB95": {
      symbol: "fUSD",
      icon: "FRIES.svg",
      icon2: "FRIES_T.png",
    },
    "0xBfcDeC52C4a189E61FB08CDF27b8Bff74Be85D70": {
      symbol: "CheeseEthLP",
      icon: "Cheese-ETH LP.svg",
      icon2: "Cheese-ETH LP_T.png",
    },
    "0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59": {
      symbol: "CHEESE TOKEN",
      icon: "CHEESE.svg",
      icon2: "CHEESE_T.png",
    },
    "0x4383A289275ae30f9240A07f8b975FD0cf4f9C62": {
      symbol: "ALUSD",
      icon: "ALUSD.svg",
      icon2: "ALUSD_T.png",
    },
    "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3": {
      symbol: "MIM TOKEN",
      icon: "MIM.png",
      icon2: "MIM_T.png",
    },
  }
};
const config = {

  test: {
    list: [
        TEST
    ],
  },

  demo: {
    list: [
      DEMO
    ],
  },

  testnet: {
    list: [
      TESTNET
    ],
  },

  prod: {
    list: [
      PROD
    ],
  },

  testkovan: {
    list: [
      testkovan
    ],
  },

}

const getFryerConfig = () => {
  const env = process.env.VUE_APP_BUILD_ENV;
  const curConfig = config[env];
  return curConfig.list[0];
}

const initConfig = function (_version) {   //test demo testnet prod
  version = _version;
  let obj = config[version];
  for (let i = 0; i < obj.list.length; i++) {
    setContractAddress(obj.list[i].chainID, obj.list[i].address);
    setTokensAddress(obj.list[i].chainID, obj.list[i].tokens)
  }

}

const configCheesePools = function (chainID){
  let obj = config[version];
  let currentConfig = obj.list.find((item)=>{
    return item.chainID == chainID;
  })
  if(currentConfig) {
    cheesePools = currentConfig.cheesePools;
    return true;
  };
  return  false
}

const getCheesePools = function (){

  return cheesePools;
}



export default {
  getFryerConfig,
  isClose,
  poundage,
  pathList,
  openLog,
  getCheesePools,
  // cheesePools,
  initConfig,
  configCheesePools
}
</script>
