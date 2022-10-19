import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { config, ENV_CONFIG } from '@casper-util/config';
import { HIGHLIGHT_WEBWORKER_FACTORY } from '@casper-util/hightlight-webworker';
import { ResultService } from '../result/result.service';

import { PutDeployComponent } from './put-deploy.component';

describe('PutDeployComponent', () => {
  let component: PutDeployComponent;
  let fixture: ComponentFixture<PutDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutDeployComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(PutDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
