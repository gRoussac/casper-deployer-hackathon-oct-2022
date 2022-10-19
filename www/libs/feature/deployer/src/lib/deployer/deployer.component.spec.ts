import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ENV_CONFIG, config } from '@casper-deployer/config';
import { DeployerService } from '@casper-escrow/data-access-deployer';
import { of } from 'rxjs';
import { DeployerComponent } from './deployer.component';

describe('DeployerComponent', () => {
  let component: DeployerComponent;
  let fixture: ComponentFixture<DeployerComponent>;

  const test = 'test', setState = jest.fn();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeployerComponent, HttpClientModule],
      providers: [
        {
          provide: ENV_CONFIG, useValue: config
        },
        {
          provide: DeployerService, useValue: {
            setState,
            getPeers: jest.fn().mockReturnValue(of()),
            getState: jest.fn().mockReturnValue(of())
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DeployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.connect).toBeDefined();
    expect(component.refreshPurse).toBeDefined();
  });

  it('should set state on activePublicKey input', () => {
    setState.mockClear();
    component.activePublicKey = test;
    expect(setState).toHaveBeenNthCalledWith(1, { activePublicKey: test });
    component.activePublicKey = undefined as unknown as string;
    expect(setState).toHaveBeenNthCalledWith(2, { activePublicKey: undefined });
  });
});
