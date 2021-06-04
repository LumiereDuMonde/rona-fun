import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPresentationComponent } from './map-presentation.component';

describe('MapPresentationComponent', () => {
  let component: MapPresentationComponent;
  let fixture: ComponentFixture<MapPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
