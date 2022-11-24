export type EnvironmentConfig = {
  [key: string]: string;
};

export const config: EnvironmentConfig = {
  api_prefix: "/api/",
  api_suffix: "/rpc",
  apiUrl_localhost: "http://localhost:11101",
  apiUrl_default: "http://3.136.227.9:7777",
  chainName_test: "casper-test",
  chainName_localhost: "casper-net-1",
  path_sep: "/",
  gasPrice: '1',
  gasFee: '150000000',
  minimumTransfer: '25000000000',
  TTL: '1800000',
  idMax: '100000000',
  gasFeeTransfer: '10000'
};