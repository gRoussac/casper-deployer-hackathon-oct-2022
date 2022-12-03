export type EnvironmentConfig = {
  [key: string]: string;
};
const rpc_port = '7777';
const sse_port = '9999';
const rpc_port_localhost = '11101';
const sse_port_localhost = '4200';
const localhost = "http://localhost";
const default_node = "http://3.136.227.9";
const events_main_suffix = '/events/main';
export const config: EnvironmentConfig = {
  localhost,
  api_prefix: "/api/",
  api_suffix: "/rpc",
  rpc_port,
  sse_port,
  events_main_suffix,
  eventsUrl_localhost: [localhost, sse_port_localhost].join(':'),
  eventsUrl_default: events_main_suffix,
  apiUrl_localhost: [localhost, rpc_port_localhost].join(':'),
  apiUrl_default: [default_node, rpc_port].join(':'),
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