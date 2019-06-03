import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrainingsComponent } from './list-trainings.component';

describe('ListTrainingsComponent', () => {
  let component: ListTrainingsComponent;
  let fixture: ComponentFixture<ListTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
