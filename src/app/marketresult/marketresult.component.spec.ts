import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketresultComponent } from './marketresult.component';

describe('MarketresultComponent', () => {
  let component: MarketresultComponent;
  let fixture: ComponentFixture<MarketresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
