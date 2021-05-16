import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeChartContainerComponent } from './trade-chart-container.component';

describe('TradeChartContainerComponent', () => {
  let component: TradeChartContainerComponent;
  let fixture: ComponentFixture<TradeChartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeChartContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
