import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecHeaderComponent } from './rec-header.component';

describe('RecHeaderComponent', () => {
  let component: RecHeaderComponent;
  let fixture: ComponentFixture<RecHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecHeaderComponent]
    });
    fixture = TestBed.createComponent(RecHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
