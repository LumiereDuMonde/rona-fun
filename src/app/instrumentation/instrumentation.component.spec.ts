import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentationComponent } from './instrumentation.component';
import { PanelContainerComponent } from './containers/panel-container/panel-container.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GaugeComponent } from './components/gauge/gauge.component';
import { CoreModule } from '../core/core.module';
import { NgxGaugeModule } from 'ngx-gauge';
import { DOMWingman } from 'src/testing/dom-test-wingman';

describe('InstrumentationComponent', () => {
  let component: InstrumentationComponent;
  let fixture: ComponentFixture<InstrumentationComponent>;
  let initialState;
  let store: MockStore;
  let wingman: DOMWingman<InstrumentationComponent>;

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
      declarations: [InstrumentationComponent,PanelContainerComponent, GaugeComponent],
      providers: [
        provideMockStore({initialState})
      ]
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(InstrumentationComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    fixture.detectChanges();

  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM', () => {
    it('has PanelContainerComponent', () => {
      expect(wingman.numberOfMatchingItems('app-panel-container')).toBe(1);
    });
  });
  
});
