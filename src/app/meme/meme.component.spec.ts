import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MemeComponent } from './meme.component';
import { CoreModule } from '../core/core.module';
import { MemeSearchBarContainerComponent } from './containers/meme-search-bar-container/meme-search-bar-container.component';
import { MemeSearchBarComponentComponent } from './components/meme-search-bar-component/meme-search-bar-component.component';
import { MemeDisplayContainerComponent } from './containers/meme-display-container/meme-display-container.component';
import { MemeDisplayComponent } from './components/meme-display/meme-display.component';
import * as MemeActions from './actions/meme.actions';

describe('MemeComponent', () => {
  let component: MemeComponent;
  let fixture: ComponentFixture<MemeComponent>;
  let store: any;

  beforeEach(() => {
    store = jasmine.createSpyObj('Store',['dispatch']);
    TestBed.configureTestingModule({      
      declarations: [
        MemeComponent,
        MemeSearchBarContainerComponent,
        MemeSearchBarComponentComponent,
        MemeDisplayContainerComponent,
        MemeDisplayComponent                
      ],
      imports: [
        CoreModule
      ],
      providers: [{ provide: Store, useValue: store }]
    });
    fixture = TestBed.createComponent(MemeComponent);
    component = fixture.componentInstance;    
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods', () => {
    it('ngOnInit calls store dispatch', () => {
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalledWith(MemeActions.MEME_DECIDE_TO_SEARCH({isScroll: false}));
    });
  });
});
