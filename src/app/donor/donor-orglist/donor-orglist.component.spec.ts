import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorOrglistComponent } from './donor-orglist.component';

describe('DonorOrglistComponent', () => {
  let component: DonorOrglistComponent;
  let fixture: ComponentFixture<DonorOrglistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorOrglistComponent]
    });
    fixture = TestBed.createComponent(DonorOrglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
