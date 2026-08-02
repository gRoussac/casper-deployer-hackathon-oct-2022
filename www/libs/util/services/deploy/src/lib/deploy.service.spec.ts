import { TestBed } from '@angular/core/testing';

import { DeployService } from './deploy.service';
import { TOASTER_TOKEN } from '@casper-util/toaster';
import { SDK_TOKEN } from '@casper-util/wasm';
import { ENV_CONFIG, config } from '@casper-util/config';

const make_transaction = jest.fn(() => ({
  toJson: () => ({ Version1: { hash: 'tx-json' } }),
}));
const make_transfer_transaction = jest.fn(() => ({
  toJson: () => ({ Version1: { hash: 'xfer-json' } }),
}));

jest.mock('@casper-util/wasm', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { InjectionToken } = require('@angular/core');
  return {
    SDK_TOKEN: new InjectionToken('SDK'),
  };
});

jest.mock('casper-rust-wasm-sdk', () => ({
  PricingMode: { Classic: 1, Fixed: 0, Reserved: 2 },
  Bytes: { fromUint8Array: jest.fn((bytes) => bytes) },
  TransactionStrParams: jest.fn().mockImplementation(() => ({
    payment_amount: '',
    standard_payment: false,
    pricing_mode: undefined,
    session_args_json: undefined,
  })),
  TransactionBuilderParams: {
    newSession: jest.fn(() => ({ type: 'session' })),
    newInvocableEntity: jest.fn(() => ({ type: 'entity' })),
    newInvocableEntityAlias: jest.fn(() => ({ type: 'entityAlias' })),
    newPackage: jest.fn(() => ({ type: 'package' })),
    newPackageAlias: jest.fn(() => ({ type: 'packageAlias' })),
  },
  AddressableEntityHash: Object.assign(
    jest.fn().mockImplementation((hex) => ({ hex })),
    { fromFormattedStr: jest.fn((s) => ({ s })) },
  ),
  PackageHash: Object.assign(
    jest.fn().mockImplementation((hex) => ({ hex })),
    { fromFormattedStr: jest.fn((s) => ({ s })) },
  ),
}));

describe('DeployService', () => {
  let service: DeployService;

  beforeEach(() => {
    make_transaction.mockClear();
    make_transfer_transaction.mockClear();
    TestBed.configureTestingModule({
      providers: [
        DeployService,
        {
          provide: TOASTER_TOKEN,
          useValue: { error: jest.fn() },
        },
        {
          provide: SDK_TOKEN,
          useValue: {
            make_transaction,
            make_transfer_transaction,
          },
        },
        {
          provide: ENV_CONFIG,
          useValue: config,
        },
      ],
    });
    service = TestBed.inject(DeployService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('makeTransaction should call sdk.make_transaction for session wasm', () => {
    const wasm = new Uint8Array([1, 2, 3]);
    const result = service.makeTransaction(
      {
        chain_name: 'casper-net-1',
        initiator_addr: '01'.padEnd(66, 'a'),
        ttl: '30m',
      },
      {
        session_path: 'contract.wasm',
        is_install_upgrade: true,
      },
      '1500000000',
      wasm,
    );
    expect(make_transaction).toHaveBeenCalled();
    expect(result).toEqual({ Version1: { hash: 'tx-json' } });
  });

  it('makeTransferTransaction should call sdk.make_transfer_transaction', () => {
    const result = service.makeTransferTransaction(
      {
        chain_name: 'casper-test',
        initiator_addr: '01'.padEnd(66, 'b'),
      },
      '01'.padEnd(66, 'c'),
      '2500000000',
    );
    expect(make_transfer_transaction).toHaveBeenCalled();
    expect(result).toEqual({ Version1: { hash: 'xfer-json' } });
  });
});
