import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MemeService } from './meme.service';
import { GiphyResult } from './models/GiphyResult.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

describe('MemeService', () => {
  let service: MemeService;
  const memes: GiphyResult = {
    "data": [],
    "pagination": {
      "total_count": 2171,
      "count": 1,
      "offset": 0
    },
    "meta": {
      "status": "200",
      "msg": "OK",
      "response_id": "qmx6ccr4254zju318cv2ipktc3wjjxfo6iz4kimf"
    }
  };
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemeService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MemeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('getTrending offSet 0 returns expected URL and params', () => {    
    let sub = service.getTrending(0).subscribe((data) => {
      expect(data).toEqual(memes);      
    });
    
    let req = httpTestingController.expectOne(`https://api.giphy.com/v1/gifs/trending?api_key=8fKQgxFhleNT0glKiICA1QzAgU77B94x&offset=0&limit=25`);    
    expect(req.request.method).toEqual('GET');
    req.flush(memes);

    sub.unsubscribe();
  });

  it('getTrending offSet 50 returns expected URL and params', () => {    
    let sub = service.getTrending(50).subscribe((data) => {
      expect(data).toEqual(memes);      
    });
    
  
  let req = httpTestingController.expectOne(`https://api.giphy.com/v1/gifs/trending?api_key=8fKQgxFhleNT0glKiICA1QzAgU77B94x&offset=50&limit=25`);    
    expect(req.request.method).toEqual('GET');
    req.flush(memes);

    sub.unsubscribe();
  });


  it('getSearchTerm offSet 0 and search for dog returns expected URL and params', () => {    
    let sub = service.getSearchTerm(0,'dog').subscribe((data) => {
      expect(data).toEqual(memes);      
    });
    
    let req = httpTestingController.expectOne(`https://api.giphy.com/v1/gifs/search?api_key=8fKQgxFhleNT0glKiICA1QzAgU77B94x&offset=0&limit=25&q=dog`);    
    expect(req.request.method).toEqual('GET');
    req.flush(memes);

    sub.unsubscribe();
  });  

  it('getSearchTerm offSet 50 and search for dog returns expected URL and params', () => {    
    let sub = service.getSearchTerm(50,'dog').subscribe((data) => {
      expect(data).toEqual(memes);      
    });
    
    let req = httpTestingController.expectOne(`https://api.giphy.com/v1/gifs/search?api_key=8fKQgxFhleNT0glKiICA1QzAgU77B94x&offset=50&limit=25&q=dog`);    
    expect(req.request.method).toEqual('GET');
    req.flush(memes);

    sub.unsubscribe();
  });  

  afterEach(() => {
    httpTestingController.verify();
  });


});
