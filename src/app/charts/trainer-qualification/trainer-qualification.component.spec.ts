import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerQualificationComponent } from './trainer-qualification.component';

describe('TrainerQualificationComponent', () => {
  let component: TrainerQualificationComponent;
  let fixture: ComponentFixture<TrainerQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
