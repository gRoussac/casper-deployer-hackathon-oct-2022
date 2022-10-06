import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDeployComponent } from './get-deploy.component';

describe('GetDeployComponent', () => {
  let component: GetDeployComponent;
  let fixture: ComponentFixture<GetDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDeployComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
