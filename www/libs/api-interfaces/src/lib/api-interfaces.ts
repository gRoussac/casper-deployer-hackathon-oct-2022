import { CLType } from './cl-type';

export type NamedCLTypeArg = {
  name: string;
  cl_type: CLType;
  entry_points?: string[];
  install?: boolean;
  entry_point?: boolean;
  upgrade?: boolean;
  optional?: boolean;
};

/** Optional display label for a known sample key (no escrow roles). */
export type User = { role?: string; activePublicKey: string };

export type Users = User[];

export type Error = { name: string; message: string };

export type Peer = { node_id: string; address: string };

export type State = {
  apiUrl?: string;
  chain_name?: string;
  stateRootHash?: string;
  status?: string;
  deploy_hash?: string;
  transaction_hash?: string;
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
  entry_point?: string;
  has_wasm?: boolean;
};

export type DeployReturn = { deploy_hash: string };

export type TransactionReturn = { transaction_hash: string };
