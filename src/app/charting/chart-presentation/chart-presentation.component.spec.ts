import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChartPresentationComponent } from './chart-presentation.component';
import { CoreModule } from 'src/app/core/core.module';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DOMWingman } from 'src/testing/dom-test-wingman';

describe('ChartPresentationComponent', () => {
  let component: ChartPresentationComponent;
  let fixture: ComponentFixture<ChartPresentationComponent>;
  let wingman: DOMWingman<ChartPresentationComponent>;
  let media;
  beforeEach(() => {
    const changeDetectorRefStub = () => ({});
    media = jasmine.createSpyObj('MediaMatcher', ['matchMedia']);
    media.matchMedia.and.returnValue({
      matches: true,
      removeEventListener: function () { },
      addEventListener: function (b) { }
    });
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ChartsModule,
        BrowserAnimationsModule
      ],
      declarations: [ChartPresentationComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: MediaMatcher, useValue: media }
      ]
    });
    fixture = TestBed.createComponent(ChartPresentationComponent);
    component = fixture.componentInstance;
    component.lineChartData = [];
    component.chartdata = [
      {
        "data": [],
        "label": "Total Hospitalized",
        "type": "line",
        "yAxisID": "left-axis"        
      },
      {
        "data": [],
        "label": "Daily Hospitalized",
        "type": "bar",
        "yAxisID": "right-axis"               
      }
    ];
    wingman = new DOMWingman(fixture);
  });

  describe("Methods", () => {
    it('can load instance', () => {
      expect(component).toBeTruthy();
    });
  
    it('ngOnInit', () => {    
        component.ngOnInit();
        expect(media.matchMedia).toHaveBeenCalled();    
    });
  
    it('ngAfterViewInit', () => {    
        spyOn(component, 'updateChart').and.callThrough();
        component.ngAfterViewInit();
        expect(component.updateChart).toHaveBeenCalled();    
    });

    it('updateChart', () => {      
      fixture.detectChanges();
      component.updateChart(true);
      fixture.detectChanges();
      expect(component.myChart.chart.options.scales.yAxes[0].display).toBe(true);
    });

    it('changeEventListener', () => {      
      fixture.detectChanges();
      component.changeEventListener({matches: true});
      fixture.detectChanges();
      expect(component.yAxes).toBe(false);
    });    
    
  });
  

  describe('DOM', () => {
    it('has title', () => {
      expect(wingman.numberOfMatchingItems('#title')).toBe(1);
    });

    it('has chart', () => {
      expect(wingman.numberOfMatchingItems('#chart')).toBe(1);
    });

    it('no spinner', () => {
      expect(wingman.numberOfMatchingItems('mat-spinner')).toBe(0);
    });

    it('has spinner', () => {
      component.loading = true;
      fixture.detectChanges();
      expect(wingman.numberOfMatchingItems('mat-spinner')).toBe(1);    
    });

    it('no data unavailable label', () => {
      expect(wingman.numberOfMatchingItems('.nodata')).toBe(0);
    });

    it('has data unavailable label', () => {
      component.chartDataEmpty = true;
      fixture.detectChanges();
      expect(wingman.numberOfMatchingItems('.nodata')).toBe(1);
    });
  });

});
