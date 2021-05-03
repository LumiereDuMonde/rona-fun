import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaugeComponent } from './gauge.component';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { NgxGaugeModule } from 'ngx-gauge';

describe('GaugeComponent', () => {
  let component: GaugeComponent;
  let fixture: ComponentFixture<GaugeComponent>;
  let wingman: DOMWingman<GaugeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({  
      imports: [NgxGaugeModule],
      declarations: [GaugeComponent]
    });
    fixture = TestBed.createComponent(GaugeComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`min has default value`, () => {
    expect(component.min).toEqual(0);
  });

  it(`max has default value`, () => {
    expect(component.max).toEqual(0);
  });

  it(`value has default value`, () => {
    expect(component.value).toEqual(0);
  });

  it(`type has default value`, () => {
    expect(component.type).toEqual(`arch`);
  });

  it(`cap has default value`, () => {
    expect(component.cap).toEqual(`round`);
  });

  it(`thick has default value`, () => {
    expect(component.thick).toEqual(9);
  });

  it(`backgroundColor has default value`, () => {
    expect(component.backgroundColor).toEqual(`white`);
  });

  it('ngx-gauge', () => {
    expect(wingman.numberOfMatchingItems('ngx-gauge')).toBe(1);
  });
  
});
