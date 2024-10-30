export type EnvironmentConfig = {
  [key: string]: string;
};
const rpc_port = '7777';
const sse_port = '9999';
const rpc_port_localhost = '11101';
const protocol = window.location.protocol;
const currentPort = window?.location?.port || (protocol === "https:" ? "443" : "80");
const sse_port_localhost = currentPort || '18101';
const localhost = "http://localhost";
const launcherhost = localhost;
const default_node_localhost = [localhost, rpc_port_localhost].join(':');
const default_node_launcher = [launcherhost, rpc_port].join(':');
const default_node_testnet = "https://rpc.testnet.casperlabs.io";
const default_node_integration = "https://rpc.integration.casperlabs.io";
const default_node_mainnet = "https://rpc.mainnet.casperlabs.io";
const events_main_suffix = '/events/main';
export const config: EnvironmentConfig = {
  localhost,
  api_prefix: "/api/",
  rpc_port,
  sse_port,
  sse_port_localhost,
  events_main_suffix,
  eventsUrl_localhost: [localhost, sse_port_localhost].join(':'),
  eventsUrl_default: events_main_suffix,
  default_node_localhost,
  default_node_launcher,
  default_node_testnet,
  default_node_integration,
  default_node_mainnet,
  chain_name_testnet: "casper-test",
  chain_name_localhost: "casper-net-1",
  chain_name_integration: "integration-test",
  chain_name_mainnet: "casper",
  path_sep: "/",
  gasFee: '1500000000',
  minimumTransfer: '2500000000',
  TTL: '30m',
  idMax: '100000000',
  gasFeeTransfer: '10000'
};