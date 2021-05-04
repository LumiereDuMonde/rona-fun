import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { MemeDisplayComponent } from '../../components/meme-display/meme-display.component';
import { MemeDisplayContainerComponent } from './meme-display-container.component';
import * as MemeActions from '../../actions/meme.actions';
import * as FavoritesActions from '../../actions/favorites.actions';


describe('MemeDisplayContainerComponent', () => {
  let component: MemeDisplayContainerComponent;
  let fixture: ComponentFixture<MemeDisplayContainerComponent>;
  let wingman: DOMWingman<MemeDisplayContainerComponent>;

  beforeEach(() => {
    const storeStub = () => ({
      select: selectAllMemes => ({}),
      dispatch: arg => ({})
    });
    TestBed.configureTestingModule({      
      declarations: [
        MemeDisplayContainerComponent,
        MemeDisplayComponent
      ],
      imports: [
        CoreModule
      ],
      providers: [{ provide: Store, useFactory: storeStub }]
    });
    fixture = TestBed.createComponent(MemeDisplayContainerComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  
  describe('Methods', () => {
    it('ngOnInit', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'select').and.callThrough();
      component.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
    });

    it('fetchMore', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.fetchMore();
      expect(storeStub.dispatch).toHaveBeenCalledWith(MemeActions.MEME_DECIDE_TO_SEARCH({isScroll: true}));
    });

    it('favoriteClicked add', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.favoriteClicked({ meme: { id: 1} as any, is_favorite: false});
      expect(storeStub.dispatch).toHaveBeenCalledWith(FavoritesActions.FAVORITE_ADD({ data: { id: 1}  as any}));
    });    

    it('favoriteClicked remove', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.favoriteClicked({ meme: { id: 1} as any, is_favorite: true});
      expect(storeStub.dispatch).toHaveBeenCalledWith(FavoritesActions.FAVORITE_REMOVE({ id: 1 as any }));
    });       
  });

  describe('DOM', () => {
    it('has app-meme-display tag', () => {
      expect(wingman.numberOfMatchingItems('app-meme-display')).toBe(1);
    });
    
  });
});
