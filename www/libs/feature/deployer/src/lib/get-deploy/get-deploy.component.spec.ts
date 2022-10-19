import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { config, ENV_CONFIG } from '@casper-util/config';
import { HIGHLIGHT_WEBWORKER_FACTORY } from '@casper-util/hightlight-webworker';
import { ResultService } from '../result/result.service';
import { GetDeployComponent } from './get-deploy.component';

describe('GetDeployComponent', () => {
  let component: GetDeployComponent;
  let fixture: ComponentFixture<GetDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDeployComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(GetDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
