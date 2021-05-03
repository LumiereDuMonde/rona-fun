import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveComponentModule } from '@ngrx/component';
import * as fromAuth from './reducers';
import { DOMWingman } from 'src/testing/dom-test-wingman';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: MockStore;
  let mockErrorSelector: MemoizedSelector<fromAuth.State, string>;
  let wingman: DOMWingman<AuthComponent>;
  const initialState = {
    auth: {
      authState: {
        user: null,
        loading: false,
        loggedIn: false,
        errorMsg: null
      }
    },
  };

  beforeEach(() => {

    const matSnackBarStub = () => ({
      dismiss: () => ({}),
      open: error => ({})
    });
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveComponentModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AuthComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatSnackBar, useFactory: matSnackBarStub }
      ]
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;    
    wingman = new DOMWingman(fixture);
    store = TestBed.inject(MockStore);
    const dispatchMethod = spyOn(store, 'dispatch');
    mockErrorSelector = store.overrideSelector(fromAuth.selectAuthError,null);    
    dispatchMethod.and.callThrough();            
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`email has default value`, () => {
    expect(component.email).toEqual(`test@test.com`);
  });

  it(`password has default value`, () => {
    expect(component.password).toEqual(`ABigPasswordIsHere#`);
  });

  it('isLoading is in default state', () => {
    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toEqual(false);
    });
  });

  it('show Snack Bar on error', () => {
    const matSnackBarStub: MatSnackBar = fixture.debugElement.injector.get(
      MatSnackBar
    );    
    spyOn(matSnackBarStub, 'dismiss').and.callThrough();
    spyOn(matSnackBarStub, 'open').and.callThrough();

    mockErrorSelector.setResult("Has Error");
    store.refreshState();
    fixture.detectChanges();
    expect(matSnackBarStub.open).toHaveBeenCalledWith("Has Error");
    expect(matSnackBarStub.dismiss).toHaveBeenCalled();
  });


  describe('onSubmit', () => {
    it('with all values present', () => {

      const ngFormStub: NgForm = <any>{
        value: {
          email: 'user@user.com',
          password: 'password'
        }
      };
      component.onSubmit(ngFormStub);
      expect(store.dispatch).toHaveBeenCalled();
    });

  });
  
  describe('DOM', () => {
    it('Has Email Field', () => {
      expect(wingman.numberOfMatchingItems('#email')).toBe(1);
    });

    it('Has Password Field', () => {
      expect(wingman.numberOfMatchingItems('#password')).toBe(1);
    });  
    
    it('Has Login Button', () => {
      expect(wingman.numberOfMatchingItems('button[type=submit]')).toBe(1);
    });        
  });
  
});
