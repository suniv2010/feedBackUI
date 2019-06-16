import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingQualificationComponent } from './training-qualification.component';

describe('TrainingQualificationComponent', () => {
  let component: TrainingQualificationComponent;
  let fixture: ComponentFixture<TrainingQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
