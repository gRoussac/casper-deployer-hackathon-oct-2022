import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ENV_CONFIG, config } from '@casper-util/config';
import { DeployerService } from '@casper-data/data-access-deployer';
import { DeployerComponent } from './deployer.component';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { TOASTER_TOKEN } from '@casper-util/toaster';
import { DEPLOYER_TOKEN, SDK_TOKEN } from '@casper-util/wasm';
import { Peer } from '@casper-api/api-interfaces';
import { StorageService } from '@casper-util/storage';
import { of } from 'rxjs';

jest.mock('casper-rust-wasm-sdk', () => ({
  CLType: jest
    .fn()
    .mockImplementation(() => ({ U8: jest.fn().mockResolvedValue('U8') })),
}));

describe('DeployerComponent', () => {
  let component: DeployerComponent;
  let fixture: ComponentFixture<DeployerComponent>;

  const test = 'test';
  const address = '127.0.0.1';
  const node_id = test;
  const api_version = test;
  const peers: Peer[] = [{ address, node_id }];
  const getPeersResult = { api_version, peers };
  const getStatusResult = { api_version, peers: undefined };
  const setState = jest.fn();
  const getPeers = jest.fn().mockResolvedValue(getPeersResult);
  const getStatus = jest.fn().mockResolvedValue(getStatusResult);

  const getCasperSDK = jest
    .fn()
    .mockReturnValue({ get_peers: getPeers, get_node_status: getStatus });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeployerComponent, HttpClientModule],
      providers: [
        RouteurHubService,
        { provide: ENV_CONFIG, useValue: config },
        { provide: SDK_TOKEN, useValue: getCasperSDK },
        {
          provide: DeployerService,
          useValue: {
            setState,
            getState: () => of({}),
            getPeers: () => of(peers),
            getStatus: () => of('status'),
            getStateRootHash: () => of('srh'),
          },
        },
        {
          provide: StorageService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            setState: jest.fn(),
          },
        },
        { provide: TOASTER_TOKEN, useValue: {} },
        { provide: DEPLOYER_TOKEN, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      // Smoke-test the host only; skip the child graph (avoids NG0303 on stubs).
      .overrideComponent(DeployerComponent, {
        set: {
          imports: [],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
          template: '<div class="deployer-smoke"></div>',
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DeployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.connect).toBeDefined();
    expect(component.refreshPurse).toBeDefined();
  });
});
