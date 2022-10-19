import { TestBed } from '@angular/core/testing';
import { ESCROW_TOKEN } from '@casper-util/wasm';
import { AppComponent } from './app.component';
import { UsersService } from '@casper-data/data-access-users';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ENV_CONFIG, config } from '@casper-util/config';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent, HttpClientModule],
      providers: [
        UsersService,
        {
          provide: ESCROW_TOKEN, useValue: {
            hello: jest.fn()
          },
        },
        {
          provide: ENV_CONFIG, useValue: config
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  xit('should ngOnInit', () => {
    // TODO
  });
  xit('should connect', () => {
    //
  });
  xit('should refreshPurse', () => {
    //
  });
});
