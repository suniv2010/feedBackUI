import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetrainingComponent } from './createtraining.component';

describe('CreatetrainingComponent', () => {
  let component: CreatetrainingComponent;
  let fixture: ComponentFixture<CreatetrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
