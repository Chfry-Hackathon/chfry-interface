export const environment = {
  test: 3,
  testnet: 1,
  prod: 1,
  demo: 97,
  testkovan: 42,
};

export const getEnv = () => {
  return process.env.VUE_APP_BUILD_ENV || "prod";
};

export const getChainId = () => {
  const env = getEnv();
  return environment[env] || 1;
};
