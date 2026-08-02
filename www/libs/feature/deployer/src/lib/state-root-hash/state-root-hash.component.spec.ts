import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Peer } from '@casper-api/api-interfaces';
import { DeployerService } from '@casper-data/data-access-deployer';
import { ENV_CONFIG, config } from '@casper-util/config';
import { HIGHLIGHT_WEBWORKER_FACTORY } from '@casper-util/hightlight-webworker';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { StorageService } from '@casper-util/storage';
import { TOASTER_TOKEN } from '@casper-util/toaster';
import { of } from 'rxjs';
import { ResultService } from '../result/result.service';
import { StateRootHashComponent } from './state-root-hash.component';

describe('StateRootHashComponent', () => {
  let component: StateRootHashComponent;
  let fixture: ComponentFixture<StateRootHashComponent>;
  let getPeers: jest.Mock;

  const peers: Peer[] = [
    { address: 'http://localhost:11101', node_id: 'n0' },
    { address: 'http://localhost:11102', node_id: 'n1' },
  ];

  beforeEach(async () => {
    getPeers = jest.fn().mockReturnValue(of(peers));

    await TestBed.configureTestingModule({
      imports: [StateRootHashComponent, HttpClientModule],
      providers: [
        {
          provide: ResultService,
          useValue: {
            setResult: jest.fn(),
            copyClipboard: jest.fn(),
          },
        },
        RouteurHubService,
        { provide: ENV_CONFIG, useValue: config },
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY,
          useValue: jest.fn(),
        },
        { provide: TOASTER_TOKEN, useValue: {} },
        {
          provide: DeployerService,
          useValue: {
            setState: jest.fn(),
            getPeers,
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
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StateRootHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render peer options with address as value', () => {
    component.apiUrl = 'http://localhost:11101';
    component.getPeers();
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      'optgroup[label="peers / custom"] option',
    ) as NodeListOf<HTMLOptionElement>;
    expect(options.length).toBe(2);
    expect(options[0].value).toBe('http://localhost:11101');
    expect(options[0].textContent?.trim()).toBe('http://localhost:11101');
    expect(options[1].value).toBe('http://localhost:11102');
  });

  it('should leave peers optgroup empty when API returns no peers', () => {
    getPeers.mockReturnValue(of([]));
    component.apiUrl = 'https://node.testnet.casper.network';
    component.getPeers();
    fixture.detectChanges();

    expect(component.peers).toEqual([]);
    const peerOptions = fixture.nativeElement.querySelectorAll(
      'optgroup[label="peers / custom"] option',
    );
    expect(peerOptions.length).toBe(0);

    const presetTexts = [
      ...(fixture.nativeElement.querySelectorAll(
        'optgroup[label="presets"] option',
      ) as NodeListOf<HTMLOptionElement>),
    ].map((o) => o.textContent?.trim());
    expect(presetTexts).toEqual(
      expect.arrayContaining([
        config['default_node_localhost'],
        config['default_node_testnet'],
        config['default_node_mainnet'],
      ]),
    );
  });

  it('should load peers from DeployerService for the selected apiUrl', () => {
    component.apiUrl = 'http://localhost:11101';
    component.getPeers();
    fixture.detectChanges();

    expect(getPeers).toHaveBeenCalledWith('http://localhost:11101');
    expect(component.peers).toEqual(peers);
  });
});
