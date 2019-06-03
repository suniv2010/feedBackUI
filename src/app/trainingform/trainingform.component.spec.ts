import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingformComponent } from './trainingform.component';

describe('TrainingformComponent', () => {
  let component: TrainingformComponent;
  let fixture: ComponentFixture<TrainingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
