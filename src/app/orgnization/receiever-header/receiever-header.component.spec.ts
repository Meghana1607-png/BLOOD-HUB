import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceieverHeaderComponent } from './receiever-header.component';

describe('ReceieverHeaderComponent', () => {
  let component: ReceieverHeaderComponent;
  let fixture: ComponentFixture<ReceieverHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceieverHeaderComponent]
    });
    fixture = TestBed.createComponent(ReceieverHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
