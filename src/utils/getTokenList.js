import global from "../common/Global";

export const getTokenList = () => {
  const { tokens } = global.getFryerConfig();
  const whiteList = [
    {
      id: 0,
      value: "DAI",
      iconUrl: "",
      address: "",
    },
    {
      id: 1,
      value: "USDC",
      iconUrl: "",
      address: "",
    },
  ];

  whiteList.forEach((item) => {
    item.iconUrl = require(`../assets/icon/${item.value}.svg`);
    item.address = tokens[item.value];
  });

  return whiteList;
};
