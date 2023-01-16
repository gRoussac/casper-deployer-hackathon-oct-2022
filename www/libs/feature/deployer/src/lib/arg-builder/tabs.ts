import { Tabs } from "@casper-ui/tabs";
import { CLTypeBuilder, NamedCLTypeArg } from "casper-js-sdk";

const customArg: NamedCLTypeArg = {
  name: '',
  clType: CLTypeBuilder.u8()
};

const nameArg: NamedCLTypeArg = {
  name: 'name',
  clType: CLTypeBuilder.string()
};

const symbolArg: NamedCLTypeArg = {
  name: 'symbol',
  clType: CLTypeBuilder.string()
};

const decimalsArg: NamedCLTypeArg = {
  name: 'decimals',
  clType: CLTypeBuilder.u8()
};

const ownerArg: NamedCLTypeArg = {
  name: 'owner',
  clType: CLTypeBuilder.key()
};

const spenderArg: NamedCLTypeArg = {
  name: 'spender',
  clType: CLTypeBuilder.key()
};

const recipientArg: NamedCLTypeArg = {
  name: 'recipient',
  clType: CLTypeBuilder.key()
};

export const defaultTabs = [{
  name: Tabs.Custom,
  types: []
},
{
  name: Tabs['CEP-18'],
  types: [
    nameArg,
    symbolArg,
    decimalsArg
    , {
      name: 'total_supply',
      clType: CLTypeBuilder.u64()
    }, {
      name: 'address',
      clType: CLTypeBuilder.key()
    },
    ownerArg
    , {
      name: 'amount',
      clType: CLTypeBuilder.u256()
    },
    recipientArg
  ]
},
{
  name: Tabs['CEP-47'],
  types: [
    nameArg,
    symbolArg,
    {
      name: 'meta',
      clType: CLTypeBuilder.string()
    },
    ownerArg,
    {
      name: 'token_id',
      clType: CLTypeBuilder.u256()
    },
    {
      name: 'token_meta',
      clType: CLTypeBuilder.string()
    },
    {
      name: 'token_ids',
      clType: CLTypeBuilder.list(CLTypeBuilder.u256())
    },
    {
      name: 'token_metas',
      clType: CLTypeBuilder.list(CLTypeBuilder.string())
    },
    recipientArg,
    {
      name: 'count',
      clType: CLTypeBuilder.u32()
    },
    spenderArg,
    {
      name: 'index',
      clType: CLTypeBuilder.u256()
    },
  ]
},
{
  name: Tabs['CEP-78'],
  types: [{
    name: 'collection_name',
    clType: CLTypeBuilder.string()
  },
  {
    name: 'collection_symbol',
    clType: CLTypeBuilder.string()
  },
  {
    name: 'total_token_supply',
    clType: CLTypeBuilder.u64()
  },
  {
    name: 'allow_minting',
    clType: CLTypeBuilder.bool()
  },
  {
    name: 'minting_mode',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'ownership_mode',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'nft_kind',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'nft_metadata_kind',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'metadata_mutability',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'key_name',
    clType: CLTypeBuilder.string()
  },
  {
    name: 'is_hash_identifier_mode',
    clType: CLTypeBuilder.bool()
  },
  {
    name: 'holder_mode',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'owner_reverse_lookup_mode',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'token_hash',
    clType: CLTypeBuilder.key()
  }, {
    name: 'target_key',
    clType: CLTypeBuilder.key()
  }, {
    name: 'source_key',
    clType: CLTypeBuilder.key()
  },
  {
    name: 'nft_contract_hash',
    clType: CLTypeBuilder.key()
  },
  {
    name: 'nft_package_hash',
    clType: CLTypeBuilder.key()
  },
  {
    name: 'named_key_convention',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'whitelist_mode',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'identifier_mode',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'burn_mode',
    clType: CLTypeBuilder.u8()
  },
  {
    name: 'contract_whitelist',
    clType: CLTypeBuilder.list(CLTypeBuilder.key())
  },
  {
    name: 'json_schema',
    clType: CLTypeBuilder.string()
  },
  {
    name: 'receipt_name',
    clType: CLTypeBuilder.string()
  },
  {
    name: 'token_owner',
    clType: CLTypeBuilder.key()
  },
  {
    name: 'token_meta_data',
    clType: CLTypeBuilder.string()
  },
  {
    name: 'source_key',
    clType: CLTypeBuilder.key()
  },
  {
    name: 'target_key',
    clType: CLTypeBuilder.key()
  },
  {
    name: 'operator',
    clType: CLTypeBuilder.key()
  },
  {
    name: 'approve_all',
    clType: CLTypeBuilder.bool()
  },
  {
    name: 'cep78_package_key',
    clType: CLTypeBuilder.string()
  }
  ]
}];

export { customArg, NamedCLTypeArg };