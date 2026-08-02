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
  let getStatus: jest.Mock;
  let getStateRootHash: jest.Mock;

  const peers: Peer[] = [
    { address: 'http://88.99.3.132:35000', node_id: 'tls:a' },
    { address: 'http://65.109.35.234:35000', node_id: 'tls:b' },
  ];

  beforeEach(async () => {
    getPeers = jest.fn().mockReturnValue(of(peers));
    getStatus = jest.fn().mockReturnValue(of('status'));
    getStateRootHash = jest.fn().mockReturnValue(of('srh'));

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
            getStatus,
            getStateRootHash,
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
    component.apiUrl = config['default_node_testnet'];
    (component as unknown as { peersSourceUrl: string }).peersSourceUrl =
      config['default_node_testnet'];
    component.getPeers();
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      'optgroup[label="peers / custom (gossip)"] option',
    ) as NodeListOf<HTMLOptionElement>;
    expect(options.length).toBe(2);
    expect(options[0].value).toBe('http://88.99.3.132:35000');
    expect(options[0].textContent?.trim()).toBe('http://88.99.3.132:35000');
  });

  it('should leave peers optgroup empty when API returns no peers', () => {
    getPeers.mockReturnValue(of([]));
    component.apiUrl = config['default_node_testnet'];
    (component as unknown as { peersSourceUrl: string }).peersSourceUrl =
      config['default_node_testnet'];
    component.getPeers();
    fixture.detectChanges();

    expect(component.peers).toEqual([]);
    const peerOptions = fixture.nativeElement.querySelectorAll(
      'optgroup[label="peers / custom (gossip)"] option',
    );
    expect(peerOptions.length).toBe(0);
  });

  it('should load peers from the peers source RPC, not a gossip peer URL', () => {
    component.apiUrl = config['default_node_testnet'];
    (component as unknown as { peersSourceUrl: string }).peersSourceUrl =
      config['default_node_testnet'];
    component.getPeers();

    expect(getPeers).toHaveBeenCalledWith(config['default_node_testnet']);
    expect(component.peers).toEqual(peers);
  });

  it('should not promote gossip peers into presets or refetch peers from them', () => {
    component.apiUrl = config['default_node_testnet'];
    (component as unknown as { peersSourceUrl: string }).peersSourceUrl =
      config['default_node_testnet'];
    component.peers = peers;
    component.apiUrlElt = { value: '' } as HTMLInputElement;
    const presetsBefore = [...component.defaults];
    getPeers.mockClear();
    getStatus.mockClear();
    getStateRootHash.mockClear();

    const event = {
      target: { value: peers[0].address },
    } as unknown as Event;
    component.selectApiUrl(event);
    fixture.detectChanges();

    expect(component.apiUrl).toBe(peers[0].address);
    expect(component.defaults).toEqual(presetsBefore);
    expect(component.defaults).not.toContain(peers[0].address);
    expect(getPeers).not.toHaveBeenCalled();
    expect(component.peers).toEqual(peers);
    expect(getStatus).not.toHaveBeenCalled();
    expect(getStateRootHash).not.toHaveBeenCalled();
  });
});
