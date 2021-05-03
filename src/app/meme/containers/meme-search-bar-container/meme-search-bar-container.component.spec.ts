import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { MemeSearchBarComponentComponent } from '../../components/meme-search-bar-component/meme-search-bar-component.component';
import { MemeSearchBarContainerComponent } from './meme-search-bar-container.component';
import * as MemeActions from '../../actions/meme.actions';

describe('MemeSearchBarContainerComponent', () => {
  let component: MemeSearchBarContainerComponent;
  let fixture: ComponentFixture<MemeSearchBarContainerComponent>;
  let wingman: DOMWingman<MemeSearchBarContainerComponent>;

  beforeEach(() => {
    const storeStub = () => ({ dispatch: arg => ({}) });
    TestBed.configureTestingModule({
      declarations: [
        MemeSearchBarContainerComponent,
        MemeSearchBarComponentComponent
      ],
      imports: [
        CoreModule
      ],
      providers: [{ provide: Store, useFactory: storeStub }]
    });
    fixture = TestBed.createComponent(MemeSearchBarContainerComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods', () => {
    it('doSearch calls dispatch with proper values', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.doSearch('dog');
      expect(storeStub.dispatch).toHaveBeenCalledWith(MemeActions.MEME_CLEAR_ITEMS_THEN_SEARCH({ search: 'dog' }));
    });
  });


  describe('DOM', () => {
    it('has app-meme-search-bar-component', () => {
      expect(wingman.numberOfMatchingItems('app-meme-search-bar-component')).toBe(1);
    });

  });
});
