import sample from "lodash/sample";

const NODE_1 = "https://bsc-dataseed1.ninicoin.io";

const NODE_2 = "https://bsc-dataseed1.defibit.io";

const NODE_3 = "https://bsc-dataseed.binance.org";

// Array of available nodes to connect to
export const nodes = [NODE_1, NODE_2, NODE_3];

const getNodeUrl = () => {
  return sample(nodes);
};

export default getNodeUrl;
