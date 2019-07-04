import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalpresentationComponent } from './graphicalpresentation.component';

describe('GraphicalpresentationComponent', () => {
  let component: GraphicalpresentationComponent;
  let fixture: ComponentFixture<GraphicalpresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicalpresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalpresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
