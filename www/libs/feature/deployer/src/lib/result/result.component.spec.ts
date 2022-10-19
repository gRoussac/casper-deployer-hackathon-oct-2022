import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { config, ENV_CONFIG } from '@casper-deployer/config';
import { HIGHLIGHT_WEBWORKER_FACTORY } from '@casper-escrow/util-hightlight-webworker';
import { ResultComponent } from './result.component';
import { ResultService } from './result.service';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultComponent],
      providers: [
        ResultService,
        {
          provide: ENV_CONFIG, useValue: config
        },
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY, useValue: {
            HIGHLIGHT_WEBWORKER_FACTORY
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
