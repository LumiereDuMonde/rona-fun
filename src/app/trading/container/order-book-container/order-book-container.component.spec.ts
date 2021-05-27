import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { MockComponent } from 'ng-mocks';
import { OrderBookContainerComponent } from './order-book-container.component';
import { OrderBookComponent } from '../../component/order-book/order-book.component';
import * as BookActions from '../../actions/book.actions';
import * as fromTrading from '../../reducers';
 
describe('OrderBookContainerComponent', () => {
  let component: OrderBookContainerComponent;
  let fixture: ComponentFixture<OrderBookContainerComponent>;
  let wingman: DOMWingman<OrderBookContainerComponent>;
  let store: any;

  beforeEach(async () => {
    store = jasmine.createSpyObj('store',['dispatch','select']);
    store.select.and.returnValue(of({}));
    await TestBed.configureTestingModule({      
      declarations: [ OrderBookContainerComponent,  MockComponent(OrderBookComponent)],
      providers: [
        { provide: Store, useValue: store }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookContainerComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    fixture.detectChanges();
  });

  describe('Methods', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });  

    it('ngOninit', () => {
      expect(store.select).toHaveBeenCalledWith(fromTrading.selectAskBook);
      expect(store.select).toHaveBeenCalledWith(fromTrading.selectBidBook);
      expect(store.dispatch).toHaveBeenCalledWith(BookActions.BOOK_STARTING());
    });
    
    it('ngOnDestroy', () => {
      component.ngOnDestroy();
      expect(store.dispatch).toHaveBeenCalledWith(BookActions.BOOK_ENDING());
    });
  });

  describe('DOM', () => {    
    it('has bid order book', () => {
      expect(wingman.numberOfMatchingItems('app-order-book[ng-reflect-is-bid=true]')).toBe(1);
    });

    it('has ask order book', () => {
      expect(wingman.numberOfMatchingItems('app-order-book[ng-reflect-is-bid=false]')).toBe(1);
    });    
  });
  
});
