import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';




class MockAuthComponent { }

@Component({selector: 'app-navbar-container', template: ''})
class NavbarStubComponent {
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: any;
  let media: any;
  let auth: any;
  let navbar: any;
  beforeEach(() => {    
    media = jasmine.createSpyObj('MediaMatcher', ['matchMedia']);
    media.matchMedia.and.returnValue({
      matches: true,
      removeListener: function () { },
      addListener: function (b) { }
    });        
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    store = jasmine.createSpyObj('Store',['dispatch','select']);
    auth = jasmine.createSpyObj('AuthService',['logout']);
    TestBed.configureTestingModule({      
      declarations: [AppComponent, NavbarStubComponent],
      imports: [
        CoreModule,
        BrowserAnimationsModule,        
        RouterTestingModule.withRoutes([
          {
              path: 'auth',
              component: MockAuthComponent
          }
      ])        
      ],
      providers: [
        { provide: MediaMatcher, useValue: media },
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: Store, useValue: store },
        { provide: AuthService, useValue: auth }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });



  describe('DOM', () => {
    it(`title has default value`, () => {
      expect(component.title).toEqual(`Rona fun`);
    });        
  });
  

  describe('Methods', () => {
    it('logout makes expected calls', () => {
      auth.logout.and.callThrough();      
      component.logout();
      expect(auth.logout).toHaveBeenCalled();      
    });

    it('ngOnInit makes expected calls', () => {      
      store.dispatch.and.returnValue(null);
      store.select.and.returnValue(of(2));
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.select).toHaveBeenCalled();
    });
  });
});
