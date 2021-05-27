import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';


import { TradingService } from './trading.service';

describe('TradingService', () => {
  let service: TradingService;
  let store: any;

  beforeEach(() => {
    store = jasmine.createSpyObj('store', ['dispatch']);
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: store }
      ]
    });
    service = TestBed.inject(TradingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('startTradeFeed makes the expected calls', () => {
    spyOn(service, 'connect').and.returnValue();
    spyOn(service, 'checkSubscription').and.returnValue();
    spyOn(service, 'sendMessage').and.returnValue();

    service.startTradeFeed();

    expect(service.connect).toHaveBeenCalled();
    expect(service.checkSubscription).toHaveBeenCalled();
    expect(service.sendMessage).toHaveBeenCalledWith({ "event": "subscribe", "pair": ["XBT/USD"], "subscription": { "name": "trade" } });
  });

  it('stopTradeFeed makes expected calls', () => {
    spyOn(service, 'sendMessage').and.returnValue();
    spyOn(service, 'close').and.returnValue();
    service.stopTradeFeed();
    expect(service.sendMessage).toHaveBeenCalledWith({ "event": "unsubscribe", "pair": ["XBT/USD"], "subscription": { "name": "trade" } });
    expect(service.close).toHaveBeenCalled();
  });

  it('stopTradeFeed doesnt close because starttrade hasnt yet', () => {
    spyOn(service, 'connect').and.returnValue();
    spyOn(service, 'checkSubscription').and.returnValue();
    spyOn(service, 'sendMessage').and.returnValue();

    spyOn(service, 'close').and.returnValue();
    service.startBookFeed();
    service.stopTradeFeed();

    expect(service.close).not.toHaveBeenCalled();
  });

  it('startBookFeed makes expected calls', () => {
    spyOn(service, 'connect').and.returnValue();
    spyOn(service, 'checkSubscription').and.returnValue();
    spyOn(service, 'sendMessage').and.returnValue();

    service.startBookFeed();

    expect(service.connect).toHaveBeenCalled();
    expect(service.checkSubscription).toHaveBeenCalled();
    expect(service.sendMessage).toHaveBeenCalledWith({ "event": "subscribe", "pair": ["XBT/USD"], "subscription": { "name": "book" } });
  });

  it('stopBookFeed ', () => {
    spyOn(service, 'sendMessage').and.returnValue();
    spyOn(service, 'close').and.returnValue();
    service.stopBookFeed();
    expect(service.sendMessage).toHaveBeenCalledWith({ "event": "unsubscribe", "pair": ["XBT/USD"], "subscription": { "name": "book" } });
    expect(service.close).toHaveBeenCalled();
  });

  // tried mocking websocket code long enough, TODO, see about spying on exported function
  // in another module, that seems to have broken around angular 9
  // https://github.com/jasmine/jasmine/issues/1414

  // it('checkSubscription subscribes when no subscription', () => {    
  //   spyOnProperty(service,'messages$').and.returnValue(of(null))    ;
  //   expect(service.subscription).toEqual(null);
  //   service.checkSubscription();
  //   expect(service.subscription).not.toEqual(null);
  // });  
});
