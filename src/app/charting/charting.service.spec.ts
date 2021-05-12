import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ChartingService } from './charting.service';

describe('ChartingService', () => {
  let service: ChartingService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChartingService]
    });
    service = TestBed.inject(ChartingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('getNationalCovidData returns national URL and data', () => {
    service.getNationalCovidData().subscribe(res => {
      expect(res).toEqual('[{}]');
    });
    const req = httpTestingController.expectOne('assets/us.json');
    expect(req.request.method).toEqual('GET');
    req.flush('[{}]');
  });

  it('getStateCovidData returns state URL and data', () => {
    service.getStateCovidData('ca').subscribe(res => {
      expect(res).toEqual('[{}]');
    });
    const req = httpTestingController.expectOne('assets/ca.json');
    expect(req.request.method).toEqual('GET');
    req.flush('[{}]');
  });

  it('getCovidData returns national URL ', () => {
    service.getCovidTrackingData('us').subscribe(res => {
      expect(res).toEqual('[{}]');
    });
    const req = httpTestingController.expectOne('assets/us.json');
    expect(req.request.method).toEqual('GET');
    req.flush('[{}]');
  });

  it('getCovidData returns state URL', () => {
    service.getCovidTrackingData('ca').subscribe(res => {
      expect(res).toEqual('[{}]');
    });
    const req = httpTestingController.expectOne('assets/ca.json');
    expect(req.request.method).toEqual('GET');
    req.flush('[{}]');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
