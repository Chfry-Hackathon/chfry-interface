"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAddres = exports.ContractAddress = exports.userInfo = exports.chainIdDict = void 0;
exports.chainIdDict = {
    1: "Ethereum",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    42: "Kovan",
    56: "BSC",
    97: "BSCTest",
    128: "HECO",
};
exports.userInfo = {
    account: "",
    chainID: 1,
    chain: "Ethereum",
};
//每次部署需要配置,对应合约地址
exports.ContractAddress = {
    /*
    1: {
        graph: "https://m.lihang2021.cf:28080/subgraphs/name/chfry/chfry",
        multiSigWal: "",
        tokenTimelockManager: "",
        cheeseFactory: "0x73eaEE79563A06b57a879621d205C5BB662596B1",
        cheeseStakePool: "0x37D92576C4db8f4317b3438e90f01074D51196ED",
        cheeseTeamStakePool: "0x7D40d5ecf31Af9C7a7E32aa5d7b34CdCC930a647",
        fryers: {
            "DAI": {
                "name": "DAI",
                "fryerConfig": "0x6cEEbbEC738C3b880E2a8C779846BCEA92FFb608",
                "fryer": "0x18A6B56eEf252abF858B0f1b4209846D5bB1fF0F",
                "oven": "0x54aD414094aD5A9e38330cb915A191E13Cc288Ac",
                "yearnControllerMock": "",
                "yearnVaultMock": "0x19D3364A399d251E894aC732651be8B0E4e85001",
                "yearnVaultAdapter": "0xee877B56453b2592250A64876fA549D452ff3Fc4"
            },
            "USDC": {
                "name": "USDC",
                "fryerConfig": "0x066Ab32ac25C359a91E81c31862D0A2D55598bf1",
                "fryer": "0x4A0Ab5f62124A7fC263875CC07753966B7aB0688",
                "oven": "0xDA756E819F5953Fe459c13338114aDdECAE7884F",
                "yearnControllerMock": "",
                "yearnVaultMock": "0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9",
                "yearnVaultAdapter": "0x2F5C6d3FB841f22431AF7bBb39037D927279e70C"
            },
            "USDT": {
                "name": "USDT",
                "fryerConfig": "0xB6cADB64b72A64AA1e9768d3D70958069D64B011",
                "fryer": "0x36951ad303068F7965E4df62A730e3338acF0504",
                "oven": "0x8775327D913568c49F327Aa5e4BC2Bfd01bFA520",
                "yearnControllerMock": "",
                "yearnVaultMock": "0x7Da96a3891Add058AdA2E826306D812C638D87a7",
                "yearnVaultAdapter": "0x157D97975dD32D64B2EFcFBC9b9Ff958dbDa1aEd"
            }
        }
    },
    4: {
        graph: 'https://m.lihang2021.cf:28080/subgraphs/name/chfry/chfry',
        multiSigWal: "0xEe91186b322e2a9D103a448237761b24b13be99F",
        tokenTimelockManager: "0xc8400490BD68A76FC7D7aa9533dbBC239324e337",
        cheeseFactory: "0x80d5535260D899693c4CA3897dd7b44Ba41Cfb7C",
        cheeseStakePool: "0xe75f1cd42bC91D4e7E6D4CdF999F68a1E788559c",
        cheeseTeamStakePool: "0x44909da1600a2eC7940c81E8E5074264a0C5C016",
        fryers: {
            "DAI": {
                "name": "DAI",
                "fryerConfig": "0x587B15F59741b2a7EfEE3Ab70b93dC08c7bA39Fd",
                "fryer": "0x4b53c22681328BB1AC8d5a96D8036BB857Bf98aC",
                "oven": "0xfFCd4366f96Bf3E3b14514A658483CeA77474d14",
                "yearnControllerMock": "0xA7D92dDEE9A631c9A1085DBC97184D270D33d590",
                "yearnVaultMock": "0x65aa683b4165AFf9aF57F45BDE2d69004C96AA1F",
                "yearnVaultAdapter": "0xcC3a17Fa9cABA4A00F093Afe160E444Dc7624915"
            },
            "USDC": {
                "name": "USDC",
                "fryerConfig": "0x26D15f5Bf328784DE4D088c82f1E569257CE7AFE",
                "fryer": "0x2445aAAE6eb4A8da5287333a17938a67B6E57602",
                "oven": "0x0163c6B03eeBc9E0DF58F86D57bc9eF81fB3c71a",
                "yearnControllerMock": "0x35Eb58A12e57798F01667D13d777439b86De97F5",
                "yearnVaultMock": "0xCCE22d435cFE8d8a6CAF9C498A659d9D789aF9DE",
                "yearnVaultAdapter": "0xC825888F3b27DE2557eFB351E2961418371C2285"
            },
            "USDT": {
                "name": "USDT",
                "fryerConfig": "0xE95ae5B2F81AD3d698f8b14D66a946807345c771",
                "fryer": "0x87Df549368a7B6a06Bf1B477D7162712F572a7C3",
                "oven": "0xAE3bf5A48C7DD3d98e22157F2D6563F0348534B5",
                "yearnControllerMock": "0x3782F6a5Bc391fFB53BF5074973c5b3a70232D85",
                "yearnVaultMock": "0x9cFa65A773B110b994b53fF30b6e4f66B7bAf44d",
                "yearnVaultAdapter": "0x76BE11efcD25dE05ba226Cb6bF561356ce413C7b"
            }
        }
    },
    97: {
        graph: 'https://m.lihang2021.cf:28080/subgraphs/name/chfry/chfry',
        multiSigWal: "0xEe91186b322e2a9D103a448237761b24b13be99F",
        tokenTimelockManager: "0xc8400490BD68A76FC7D7aa9533dbBC239324e337",
        cheeseFactory: "0x80d5535260D899693c4CA3897dd7b44Ba41Cfb7C",
        cheeseStakePool: "0xe75f1cd42bC91D4e7E6D4CdF999F68a1E788559c",
        cheeseTeamStakePool: "0x44909da1600a2eC7940c81E8E5074264a0C5C016",
        fryers: {
            "DAI": {
                "name": "DAI",
                "fryerConfig": "0x587B15F59741b2a7EfEE3Ab70b93dC08c7bA39Fd",
                "fryer": "0x4b53c22681328BB1AC8d5a96D8036BB857Bf98aC",
                "oven": "0xfFCd4366f96Bf3E3b14514A658483CeA77474d14",
                "yearnControllerMock": "0xA7D92dDEE9A631c9A1085DBC97184D270D33d590",
                "yearnVaultMock": "0x65aa683b4165AFf9aF57F45BDE2d69004C96AA1F",
                "yearnVaultAdapter": "0xcC3a17Fa9cABA4A00F093Afe160E444Dc7624915"
            },
            "USDC": {
                "name": "USDC",
                "fryerConfig": "0x26D15f5Bf328784DE4D088c82f1E569257CE7AFE",
                "fryer": "0x2445aAAE6eb4A8da5287333a17938a67B6E57602",
                "oven": "0x0163c6B03eeBc9E0DF58F86D57bc9eF81fB3c71a",
                "yearnControllerMock": "0x35Eb58A12e57798F01667D13d777439b86De97F5",
                "yearnVaultMock": "0xCCE22d435cFE8d8a6CAF9C498A659d9D789aF9DE",
                "yearnVaultAdapter": "0xC825888F3b27DE2557eFB351E2961418371C2285"
            },
            "USDT": {
                "name": "USDT",
                "fryerConfig": "0xE95ae5B2F81AD3d698f8b14D66a946807345c771",
                "fryer": "0x87Df549368a7B6a06Bf1B477D7162712F572a7C3",
                "oven": "0xAE3bf5A48C7DD3d98e22157F2D6563F0348534B5",
                "yearnControllerMock": "0x3782F6a5Bc391fFB53BF5074973c5b3a70232D85",
                "yearnVaultMock": "0x9cFa65A773B110b994b53fF30b6e4f66B7bAf44d",
                "yearnVaultAdapter": "0x76BE11efcD25dE05ba226Cb6bF561356ce413C7b"
            }
        }
    },
    128: {
        graph: 'https://m.lihang2021.cf:28080/subgraphs/name/chfry/chfry',
        multiSigWal: "0xEe91186b322e2a9D103a448237761b24b13be99F",
        tokenTimelockManager: "0xc8400490BD68A76FC7D7aa9533dbBC239324e337",
        cheeseFactory: "0x80d5535260D899693c4CA3897dd7b44Ba41Cfb7C",
        cheeseStakePool: "0xe75f1cd42bC91D4e7E6D4CdF999F68a1E788559c",
        cheeseTeamStakePool: "0x44909da1600a2eC7940c81E8E5074264a0C5C016",
        fryers: {
            "DAI": {
                "name": "DAI",
                "fryerConfig": "0x587B15F59741b2a7EfEE3Ab70b93dC08c7bA39Fd",
                "fryer": "0x4b53c22681328BB1AC8d5a96D8036BB857Bf98aC",
                "oven": "0xfFCd4366f96Bf3E3b14514A658483CeA77474d14",
                "yearnControllerMock": "0xA7D92dDEE9A631c9A1085DBC97184D270D33d590",
                "yearnVaultMock": "0x65aa683b4165AFf9aF57F45BDE2d69004C96AA1F",
                "yearnVaultAdapter": "0xcC3a17Fa9cABA4A00F093Afe160E444Dc7624915"
            },
            "USDC": {
                "name": "USDC",
                "fryerConfig": "0x26D15f5Bf328784DE4D088c82f1E569257CE7AFE",
                "fryer": "0x2445aAAE6eb4A8da5287333a17938a67B6E57602",
                "oven": "0x0163c6B03eeBc9E0DF58F86D57bc9eF81fB3c71a",
                "yearnControllerMock": "0x35Eb58A12e57798F01667D13d777439b86De97F5",
                "yearnVaultMock": "0xCCE22d435cFE8d8a6CAF9C498A659d9D789aF9DE",
                "yearnVaultAdapter": "0xC825888F3b27DE2557eFB351E2961418371C2285"
            },
            "USDT": {
                "name": "USDT",
                "fryerConfig": "0xE95ae5B2F81AD3d698f8b14D66a946807345c771",
                "fryer": "0x87Df549368a7B6a06Bf1B477D7162712F572a7C3",
                "oven": "0xAE3bf5A48C7DD3d98e22157F2D6563F0348534B5",
                "yearnControllerMock": "0x3782F6a5Bc391fFB53BF5074973c5b3a70232D85",
                "yearnVaultMock": "0x9cFa65A773B110b994b53fF30b6e4f66B7bAf44d",
                "yearnVaultAdapter": "0x76BE11efcD25dE05ba226Cb6bF561356ce413C7b"
            }
        }
    }

     */
};
//每次部署需要配置,普通币的地址
exports.tokenAddres = {
/*
1: {
    DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
    USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    FRIES: "0xf6226fe14df431c2c8de9b3215b3dda9eba3ab3b",
    CHEESE: "0x79ebf91e22ee6064a94D10489Dd39Ed0A638FcD7",
    FRIESUSD3CRV: "",
    ALUSD: "",
    CHEESEETHLP: "0xfDE6236e842334B10A739a0e29db5a2eB80d299C",
    WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    WETHUSDTSUSHILP: "0x06da0fd433C1A5d7a4faa01111c044910A184553",
},
4: {
    DAI: "0x951346391259F533C69a5fE11b912f1a9A147725",
    USDT: "0x431A2Ca02e558a8dC4dADB18F125eC966Cc7eAd6",
    USDC: "0x52d3503B221012f91394ec6c02cC02A75Ba9Cc3c",
    FRIES: "0x046598FC6611E6668D1D146686864bcD0761f66D",
    CHEESE: "0x977D1650E793F10fEa9148307cfd4991F55f7c05",
    FRIESUSD3CRV: "0x239Fe6BfA3d2b0A963513628b5bBC2f90FfC2709",
    CHEESEETHLP: "0x74597D4035052A651C74c7790630EEa0aCcc3886",
    ALUSD: "0x804E6224c79EfaB69347ae59be1612A9a47405F5",
},
97: {
    DAI: "0x951346391259F533C69a5fE11b912f1a9A147725",
    USDT: "0x431A2Ca02e558a8dC4dADB18F125eC966Cc7eAd6",
    USDC: "0x52d3503B221012f91394ec6c02cC02A75Ba9Cc3c",
    FRIES: "0x046598FC6611E6668D1D146686864bcD0761f66D",
    CHEESE: "0x977D1650E793F10fEa9148307cfd4991F55f7c05",
    FRIESUSD3CRV: "0x239Fe6BfA3d2b0A963513628b5bBC2f90FfC2709",
    CHEESEETHLP: "0x74597D4035052A651C74c7790630EEa0aCcc3886",
    ALUSD: "0x804E6224c79EfaB69347ae59be1612A9a47405F5",
},
128: {
    DAI: "0x951346391259F533C69a5fE11b912f1a9A147725",
    USDT: "0x431A2Ca02e558a8dC4dADB18F125eC966Cc7eAd6",
    USDC: "0x52d3503B221012f91394ec6c02cC02A75Ba9Cc3c",
    FRIES: "0x046598FC6611E6668D1D146686864bcD0761f66D",
    CHEESE: "0x977D1650E793F10fEa9148307cfd4991F55f7c05",
    FRIESUSD3CRV: "0x239Fe6BfA3d2b0A963513628b5bBC2f90FfC2709",
    CHEESEETHLP: "0x74597D4035052A651C74c7790630EEa0aCcc3886",
    ALUSD: "0x804E6224c79EfaB69347ae59be1612A9a47405F5",
},
 */
};
//# sourceMappingURL=lib_const.js.map