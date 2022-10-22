import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteurHubService } from '@casper-util/routeur-hub';

import { EscrowerComponent } from './escrower.component';

describe('EscrowerComponent', () => {
  let component: EscrowerComponent;
  let fixture: ComponentFixture<EscrowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RouteurHubService],
      imports: [EscrowerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EscrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
