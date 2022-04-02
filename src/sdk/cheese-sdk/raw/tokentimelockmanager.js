"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokentimelockmanager = void 0;
exports.tokentimelockmanager = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "timeLock", "type": "address" }, { "indexed": false, "internalType": "address", "name": "beneficiary", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "releaseTime", "type": "uint256" }], "name": "CreateTokenTimeLock", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_oldImpl", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_newImpl", "type": "address" }], "name": "ImplChanged", "type": "event" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token_", "type": "address" }, { "internalType": "address", "name": "beneficiary_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" }, { "internalType": "uint256", "name": "releaseTime_", "type": "uint256" }], "name": "create", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getTokenTimeLocks", "outputs": [{ "internalType": "uint256", "name": "count", "type": "uint256" }, { "internalType": "uint256[]", "name": "index", "type": "uint256[]" }, { "internalType": "address[]", "name": "lockAddress", "type": "address[]" }, { "internalType": "address[]", "name": "token", "type": "address[]" }, { "internalType": "address[]", "name": "beneficiary", "type": "address[]" }, { "internalType": "uint256[]", "name": "income", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "total", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "releaseTime", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "impl", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "tokenTimeReleaseList", "outputs": [{ "internalType": "contract TokenTimeRelease", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newImpl", "type": "address" }], "name": "upgradeImpl", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
//# sourceMappingURL=tokentimelockmanager.js.map