import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeployerService } from '@casper-data/data-access-deployer';
import { config, ENV_CONFIG } from '@casper-util/config';
import {
  HIGHLIGHT_WEBWORKER_FACTORY,
  HighlightService,
} from '@casper-util/hightlight-webworker';
import { TOASTER_TOKEN } from '@casper-util/toaster';
import { ResultService } from '../result/result.service';

import { PutDeployComponent } from './put-deploy.component';
import { SDK_TOKEN } from '@casper-util/wasm';
import { StorageService } from '@casper-util/storage';
import { WalletService } from '@casper-util/wallet';
import { DeployService } from '@casper-util/deploy';
import { WatcherService } from '@casper-util/watcher';
import { of } from 'rxjs';

jest.mock('casper-rust-wasm-sdk', () => ({
  CasperWallet: jest.fn().mockImplementation(() => ({
    signTransaction: jest.fn().mockResolvedValue({}),
    signDeploy: jest.fn().mockResolvedValue({}),
  })),
  Transaction: jest.fn(),
  Deploy: jest.fn(),
  PublicKey: jest.fn(),
  motesToCSPR: jest.fn(),
}));

describe('PutDeployComponent', () => {
  let component: PutDeployComponent;
  let fixture: ComponentFixture<PutDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutDeployComponent, HttpClientModule],
      providers: [
        ResultService,
        HighlightService,
        WalletService,
        StorageService,
        {
          provide: DeployerService,
          useValue: {
            getState: () => of({}),
            setState: jest.fn(),
          },
        },
        {
          provide: DeployService,
          useValue: {
            makeTransaction: jest.fn(),
            makeTransferTransaction: jest.fn(),
          },
        },
        {
          provide: WatcherService,
          useValue: { watchTransaction: jest.fn(), watchDeploy: jest.fn() },
        },
        { provide: ENV_CONFIG, useValue: config },
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY,
          useValue: { HIGHLIGHT_WEBWORKER_FACTORY },
        },
        { provide: SDK_TOKEN, useValue: {} },
        { provide: TOASTER_TOKEN, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PutDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
