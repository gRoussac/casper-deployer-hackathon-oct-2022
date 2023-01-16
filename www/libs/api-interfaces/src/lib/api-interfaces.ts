import { NamedCLTypeArg } from "casper-js-sdk";
import { Roles } from "./api-enums";

export type User = {
  role?: Roles;
  activePublicKey: string;
};

export type Users = User[];

export type Purse = {
  balance: string;
};

export type Error = {
  name: string;
  message: string;
};

export type Peer = {
  node_id: string;
  address: string;
};

export type State = {
  apiUrl?: string;
  stateRootHash?: string;
  status?: string;
  deploy_hash?: string;
  deploy_args?: string;
  user?: User;
  key?: string;
  'key-old'?: string;
  path?: string;
  notes?: string;
  fee?: string;
  sessionName?: string;
  sessionHash?: string;
  args?: NamedCLTypeArg[];
};

export type DeployReturn = {
  deploy_hash: string;
};