import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeChartComponent } from './trade-chart.component';

fdescribe('TradeChartComponent', () => {
  let component: TradeChartComponent;
  let fixture: ComponentFixture<TradeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
