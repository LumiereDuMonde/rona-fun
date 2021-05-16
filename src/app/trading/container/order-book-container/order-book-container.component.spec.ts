import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookContainerComponent } from './order-book-container.component';

describe('OrderBookContainerComponent', () => {
  let component: OrderBookContainerComponent;
  let fixture: ComponentFixture<OrderBookContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBookContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
