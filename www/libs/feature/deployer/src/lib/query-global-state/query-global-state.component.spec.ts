import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryGlobalStateComponent } from './query-global-state.component';

describe('QueryGlobalStateComponent', () => {
  let component: QueryGlobalStateComponent;
  let fixture: ComponentFixture<QueryGlobalStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryGlobalStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QueryGlobalStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
