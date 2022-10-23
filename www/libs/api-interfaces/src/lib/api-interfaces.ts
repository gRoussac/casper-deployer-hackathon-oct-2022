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
  user?: User;
};

export type DeployReturn = {
  deploy_hash: string;
};