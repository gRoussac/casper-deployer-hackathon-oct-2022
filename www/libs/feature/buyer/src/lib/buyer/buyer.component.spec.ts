import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerComponent } from './buyer.component';

describe('BuyerComponent', () => {
  let component: BuyerComponent;
  let fixture: ComponentFixture<BuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
