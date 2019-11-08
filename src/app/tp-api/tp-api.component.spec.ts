import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpApiComponent } from './tp-api.component';

describe('TpApiComponent', () => {
  let component: TpApiComponent;
  let fixture: ComponentFixture<TpApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
