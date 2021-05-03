import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MemeSearchBarComponentComponent } from './meme-search-bar-component.component';
import { CoreModule } from 'src/app/core/core.module';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MemeSearchBarComponentComponent', () => {
  let component: MemeSearchBarComponentComponent;
  let fixture: ComponentFixture<MemeSearchBarComponentComponent>;
  let wingman: DOMWingman<MemeSearchBarComponentComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        CoreModule,
        BrowserAnimationsModule
      ],      
      declarations: [MemeSearchBarComponentComponent]
    });
    fixture = TestBed.createComponent(MemeSearchBarComponentComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods', () => {
    it('search', () => {
      spyOn(component.doSearch, 'emit');
      component.searchTerm = 'dog';
      fixture.detectChanges();
      component.search();
      expect(component.doSearch.emit).toHaveBeenCalled();
    });
  });
  

  describe('DOM', () => {
    it('has search input', () => {
      expect(wingman.numberOfMatchingItems('#search')).toBe(1);
    });   
  });
  
});
