import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorVieworgComponent } from './donor-vieworg.component';

describe('DonorVieworgComponent', () => {
  let component: DonorVieworgComponent;
  let fixture: ComponentFixture<DonorVieworgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorVieworgComponent]
    });
    fixture = TestBed.createComponent(DonorVieworgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
