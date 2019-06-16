import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingExperienceComponent } from './training-experience.component';

describe('TrainingExperienceComponent', () => {
  let component: TrainingExperienceComponent;
  let fixture: ComponentFixture<TrainingExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
