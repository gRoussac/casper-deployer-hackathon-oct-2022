import { TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { DEPLOYER_TOKEN } from '@casper-util/wasm';
import { ENV_CONFIG, config } from '@casper-util/config';
import { DeployerComponent } from '@casper-deployer/deployer';
import { AppComponent } from './app.component';

jest.mock('casper-rust-wasm-sdk', () => ({
  CasperWallet: jest.fn().mockImplementation(() => ({})),
}));

@Component({
  selector: 'casper-deployer',
  standalone: true,
  template: '',
})
class DeployerStubComponent {}

describe('AppComponent', () => {
  let mockHttpClient: Partial<HttpClient>;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn().mockReturnValue(of({})),
      post: jest.fn().mockReturnValue(of({})),
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: DEPLOYER_TOKEN, useValue: { hello: jest.fn() } },
        { provide: ENV_CONFIG, useValue: config },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [DeployerComponent] },
        add: { imports: [DeployerStubComponent] },
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
