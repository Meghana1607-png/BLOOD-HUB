import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorViewOrgComponent } from './donor-view-org.component';

describe('DonorViewOrgComponent', () => {
  let component: DonorViewOrgComponent;
  let fixture: ComponentFixture<DonorViewOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorViewOrgComponent]
    });
    fixture = TestBed.createComponent(DonorViewOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
