"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradablegovernance = void 0;
exports.upgradablegovernance = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_oldGovernor", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_newGovernor", "type": "address" }], "name": "GovernorChanged", "type": "event" }, { "inputs": [], "name": "governor", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newGovernor", "type": "address" }], "name": "upgradeGovernance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
//# sourceMappingURL=upgradablegovernance.js.map