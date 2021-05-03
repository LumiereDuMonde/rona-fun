import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { PanelContainerComponent } from './panel-container.component';
import { GaugeComponent } from '../../components/gauge/gauge.component';
import { CoreModule } from 'src/app/core/core.module';
import { NgxGaugeModule } from 'ngx-gauge';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { provideMockStore } from '@ngrx/store/testing';

describe('PanelContainerComponent', () => {
  let component: PanelContainerComponent;
  let fixture: ComponentFixture<PanelContainerComponent>;
  let wingman: DOMWingman<PanelContainerComponent>;
  let initialState;

  beforeEach(() => {
    initialState = {
      started: false,
      fuel: 0,
      speed: 0,
      wind: 0,
      temperature: 0,
      rpm: 0
    };
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        NgxGaugeModule
      ],
      declarations: [PanelContainerComponent, GaugeComponent],
      providers: [provideMockStore({ initialState })]
    });
    fixture = TestBed.createComponent(PanelContainerComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods', () => {
    it('ngOnDestroy', () => {
      spyOn(component, 'stop').and.callThrough();
      component.ngOnDestroy();
      expect(component.stop).toHaveBeenCalled();
    });

    it('ngOnInit', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'select').and.callThrough();
      component.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
    });

    it('start button dispatches expected action', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.start();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });

    it('stop button dispatches expected action', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.stop();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });

  describe('DOM', () => {
    it('start button is present', () => {
      expect(wingman.numberOfMatchingItems('#startButton')).toBe(1);
    });

    it('stop button is present', () => {
      expect(wingman.numberOfMatchingItems('#stopButton')).toBe(1);
    });  
    
    it('gas gauge is present', () => {
      expect(wingman.numberOfMatchingItems('#gasGauge')).toBe(1);
    });    

    it('wind gauge is present', () => {
      expect(wingman.numberOfMatchingItems('#windGauge')).toBe(1);
    });      

    it('temperature gauge is present', () => {
      expect(wingman.numberOfMatchingItems('#tempGauge')).toBe(1);
    });    
    
    it('rpm gauge is present', () => {
      expect(wingman.numberOfMatchingItems('#rpmGauge')).toBe(1);
    });   
    
    it('rpm gauge is present', () => {
      expect(wingman.numberOfMatchingItems('#speedGauge')).toBe(1);
    });     
  });
  


});
