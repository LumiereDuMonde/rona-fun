import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeDisplayContainerComponent } from './meme-display-container.component';

describe('MemeDisplayContainerComponent', () => {
  let component: MemeDisplayContainerComponent;
  let fixture: ComponentFixture<MemeDisplayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeDisplayContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeDisplayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
