import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowComponent } from './escrow.component';

describe('EscrowComponent', () => {
  let component: EscrowComponent;
  let fixture: ComponentFixture<EscrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscrowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EscrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
