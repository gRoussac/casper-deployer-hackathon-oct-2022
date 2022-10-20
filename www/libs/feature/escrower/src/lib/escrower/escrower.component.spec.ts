import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowerComponent } from './escrower.component';

describe('EscrowerComponent', () => {
  let component: EscrowerComponent;
  let fixture: ComponentFixture<EscrowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
