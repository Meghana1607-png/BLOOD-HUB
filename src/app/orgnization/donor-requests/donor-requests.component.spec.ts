import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorRequestsComponent } from './donor-requests.component';

describe('DonorRequestsComponent', () => {
  let component: DonorRequestsComponent;
  let fixture: ComponentFixture<DonorRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorRequestsComponent]
    });
    fixture = TestBed.createComponent(DonorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
