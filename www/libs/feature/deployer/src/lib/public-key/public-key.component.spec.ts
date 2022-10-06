import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicKeyComponent } from './public-key.component';

describe('PublicKeyComponent', () => {
  let component: PublicKeyComponent;
  let fixture: ComponentFixture<PublicKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicKeyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
