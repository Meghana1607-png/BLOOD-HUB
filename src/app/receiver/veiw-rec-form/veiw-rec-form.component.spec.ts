import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwRecFormComponent } from './veiw-rec-form.component';

describe('VeiwRecFormComponent', () => {
  let component: VeiwRecFormComponent;
  let fixture: ComponentFixture<VeiwRecFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeiwRecFormComponent]
    });
    fixture = TestBed.createComponent(VeiwRecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
