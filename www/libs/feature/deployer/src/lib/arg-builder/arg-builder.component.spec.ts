import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgBuilderComponent } from './arg-builder.component';

describe('ArgBuilderComponent', () => {
  let component: ArgBuilderComponent;
  let fixture: ComponentFixture<ArgBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArgBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArgBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
