import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecommendationComponent } from './my-recommendation.component';

describe('MyRecommendationComponent', () => {
  let component: MyRecommendationComponent;
  let fixture: ComponentFixture<MyRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
