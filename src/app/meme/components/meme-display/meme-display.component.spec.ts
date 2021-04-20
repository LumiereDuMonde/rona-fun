import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeDisplayComponent } from './meme-display.component';

describe('MemeDisplayComponent', () => {
  let component: MemeDisplayComponent;
  let fixture: ComponentFixture<MemeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
