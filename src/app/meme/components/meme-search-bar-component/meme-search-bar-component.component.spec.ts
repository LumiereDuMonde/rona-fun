import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeSearchBarComponentComponent } from './meme-search-bar-component.component';

describe('MemeSearchBarComponentComponent', () => {
  let component: MemeSearchBarComponentComponent;
  let fixture: ComponentFixture<MemeSearchBarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeSearchBarComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeSearchBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
