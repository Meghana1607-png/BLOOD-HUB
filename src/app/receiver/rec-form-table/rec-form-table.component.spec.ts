import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecFormTableComponent } from './rec-form-table.component';

describe('RecFormTableComponent', () => {
  let component: RecFormTableComponent;
  let fixture: ComponentFixture<RecFormTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecFormTableComponent]
    });
    fixture = TestBed.createComponent(RecFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
