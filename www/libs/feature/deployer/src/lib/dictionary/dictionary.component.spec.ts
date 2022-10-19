import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { config, ENV_CONFIG } from '@casper-deployer/config';
import { HIGHLIGHT_WEBWORKER_FACTORY } from '@casper-escrow/util-hightlight-webworker';
import { ResultService } from '../result/result.service';
import { DictionaryComponent } from './dictionary.component';

describe('DictionaryComponent', () => {
  let component: DictionaryComponent;
  let fixture: ComponentFixture<DictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(DictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
