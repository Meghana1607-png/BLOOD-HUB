import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorFormRequestComponent } from './donor-form-request.component';

describe('DonorFormRequestComponent', () => {
  let component: DonorFormRequestComponent;
  let fixture: ComponentFixture<DonorFormRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorFormRequestComponent]
    });
    fixture = TestBed.createComponent(DonorFormRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
