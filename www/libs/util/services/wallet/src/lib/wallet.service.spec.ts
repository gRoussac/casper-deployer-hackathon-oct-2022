import { TestBed } from '@angular/core/testing';
import { config, ENV_CONFIG } from '@casper-util/config';
import { TOASTER_TOKEN } from '@casper-util/toaster';

import { WalletService } from './wallet.service';
import { SDK_TOKEN } from '@casper-util/wasm';

jest.mock('casper-rust-wasm-sdk', () => ({
  CasperWallet: jest.fn().mockImplementation(() => ({
    getVersion: jest.fn().mockResolvedValue('1.0.0'),
    connect: jest.fn().mockResolvedValue(true),
    isConnected: jest.fn().mockResolvedValue(true),
    switchAccount: jest.fn().mockResolvedValue(true),
    getActivePublicKey: jest.fn().mockResolvedValue('mocked-public-key'),
    signDeploy: jest.fn().mockResolvedValue({}),
  })),
  Deploy: jest.fn(),
}));

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & {
        CasperWalletProvider?: () => unknown;
      }
    ).CasperWalletProvider = jest.fn(() => ({}));

    TestBed.configureTestingModule({
      providers: [
        WalletService,
        { provide: TOASTER_TOKEN, useValue: {} },
        { provide: ENV_CONFIG, useValue: config },
        { provide: SDK_TOKEN, useValue: {} },
      ],
    });
    service = TestBed.inject(WalletService);
  });

  afterEach(() => {
    delete (
      globalThis as typeof globalThis & {
        CasperWalletProvider?: () => unknown;
      }
    ).CasperWalletProvider;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty values when wallet provider is missing', async () => {
    delete (
      globalThis as typeof globalThis & {
        CasperWalletProvider?: () => unknown;
      }
    ).CasperWalletProvider;
    const unavailable = new WalletService();

    await expect(unavailable.getVersion()).resolves.toBe('');
    await expect(unavailable.isConnected()).resolves.toBe(false);
    await expect(unavailable.getActivePublicKey()).resolves.toBe('');
  });
});
