import { getChainId } from "./getChainId";
import { SUPPORTED_NETWORKS } from "../constant/rpc";

export const registerToken = async (payload) => {
  const tokenAdded = await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: payload,
    },
  });

  return tokenAdded;
};

export const isMetaMaskInScope = !!window.ethereum?.isMetaMask;

export const setupNetwork = async (params) => {
  const provider = window.ethereum;
  if (provider) {
    const isMainnet = () => {
      return params.chainId === "0x1" || Number(params.chainId) === 1 ||  Number(getChainId()) === 1 || Number(params.chainId) === 3
      || Number(params.chainId) === 42
    }
    const chainId = params.chainId.toString().startsWith('0x') ? params.chainId : `0x${parseInt(`${params.chainId}`, 10).toString(16)}`
    const method = isMainnet() ? "wallet_switchEthereumChain" : "wallet_addEthereumChain";
    const param = isMainnet() ? [{ chainId: chainId }] : [{...params,chainId}];
    try {
      await provider.request({
        method: method,
        params: param,
      });
      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the Ethereum network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

export const switchNetwork = async () => {
  const chainId = getChainId();
  const config = SUPPORTED_NETWORKS[chainId];
  await setupNetwork(config);
};
