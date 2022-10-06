import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutDeployComponent } from './put-deploy.component';

describe('PutDeployComponent', () => {
  let component: PutDeployComponent;
  let fixture: ComponentFixture<PutDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutDeployComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PutDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
