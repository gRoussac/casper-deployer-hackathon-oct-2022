import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateRootHashComponent } from './state-root-hash.component';

describe('StateRootHashComponent', () => {
  let component: StateRootHashComponent;
  let fixture: ComponentFixture<StateRootHashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateRootHashComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StateRootHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
