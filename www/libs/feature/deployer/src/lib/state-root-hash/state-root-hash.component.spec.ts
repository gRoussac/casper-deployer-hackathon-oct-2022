import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ENV_CONFIG, config } from '@casper-deployer/config';
import { HighlightService, HIGHLIGHT_WEBWORKER_FACTORY } from '@casper-escrow/util-hightlight-webworker';
import { ResultService } from '../result/result.service';
import { StateRootHashComponent } from './state-root-hash.component';

describe('StateRootHashComponent', () => {
  let component: StateRootHashComponent;
  let fixture: ComponentFixture<StateRootHashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateRootHashComponent, HttpClientModule],
      providers: [
        ResultService,
        {
          provide: ENV_CONFIG, useValue: config
        },
        HighlightService,
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY, useValue: {
            HIGHLIGHT_WEBWORKER_FACTORY
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(StateRootHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
