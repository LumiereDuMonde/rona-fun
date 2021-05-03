import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GIF } from '../../models/GIF.model';
import { MemeDisplayComponent } from './meme-display.component';
import { CoreModule } from 'src/app/core/core.module';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('MemeDisplayComponent', () => {
  let component: MemeDisplayComponent;
  let fixture: ComponentFixture<MemeDisplayComponent>;
  let wingman: DOMWingman<MemeDisplayComponent>;
  let memes: GIF[];
  beforeEach(() => {
    const clipboardStub = () => ({ copy: val => ({}) });
    const matSnackBarStub = () => ({ open: (string, string1, object) => ({}) });
    TestBed.configureTestingModule({
      declarations: [MemeDisplayComponent],
      imports: [
        CoreModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: Clipboard, useFactory: clipboardStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub }
      ]
    });
    fixture = TestBed.createComponent(MemeDisplayComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    memes = [
      {
        "type": "gif",
        "id": "1vYThCrZAsQU36nqkv",
        "url": "https://giphy.com/gifs/dog-good-morning-kisses-1vYThCrZAsQU36nqkv",
        "slug": "dog-good-morning-kisses-1vYThCrZAsQU36nqkv",
        "bitly_gif_url": "https://gph.is/g/EG85gqM",
        "bitly_url": "https://gph.is/g/EG85gqM",
        "embed_url": "https://giphy.com/embed/1vYThCrZAsQU36nqkv",
        "username": "helloall",
        images:{
          original: {
            height: '310',
            width: '480',
            size: '1196493',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy.gif&ct=g',
            mp4_size: '283720',
            mp4: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy.mp4?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy.mp4&ct=g',
            webp_size: '296912',
            webp: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy.webp?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy.webp&ct=g',                            
          },
          downsized: {
            height: '310',
            width: '480',
            size: '1196493',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy.gif&ct=g'
          },
          downsized_large: {
            height: '310',
            width: '480',
            size: '1196493',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy.gif&ct=g'
          },
          downsized_medium: {
            height: '310',
            width: '480',
            size: '1196493',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy.gif&ct=g'
          },
          downsized_small: {
            height: '214',
            width: '331',
            mp4_size: '62649',
            mp4: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy-downsized-small.mp4?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy-downsized-small.mp4&ct=g',
            url:""
          },
          downsized_still: {
            height: '310',
            width: '480',
            size: '1196493',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy_s.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy_s.gif&ct=g'
          },
          fixed_height: {
            height: '200',
            width: '310',
            size: '430213',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200.gif&ct=g',
            mp4_size: '97875',
            mp4: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200.mp4?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200.mp4&ct=g',
            webp_size: '208194',
            webp: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200.webp?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200.webp&ct=g'
          },
          fixed_height_downsampled: {
            height: '200',
            width: '310',
            size: '72425',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200_d.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200_d.gif&ct=g',
            webp_size: '38860',
            webp: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200_d.webp?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200_d.webp&ct=g'
          },
          fixed_height_small: {
            height: '100',
            width: '155',
            size: '152859',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/100.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=100.gif&ct=g',
            mp4_size: '30834',
            mp4: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/100.mp4?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=100.mp4&ct=g',
            webp_size: '86816',
            webp: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/100.webp?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=100.webp&ct=g'
          },
          fixed_height_small_still: {
            height: '100',
            width: '155',
            size: '5010',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/100_s.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=100_s.gif&ct=g'
          },
          fixed_height_still: {
            height: '200',
            width: '310',
            size: '15404',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200_s.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200_s.gif&ct=g'
          },
          fixed_width: {
            height: '129',
            width: '200',
            size: '219427',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200w.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200w.gif&ct=g',
            mp4_size: '41750',
            mp4: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200w.mp4?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200w.mp4&ct=g',
            webp_size: '118322',
            webp: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200w.webp?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200w.webp&ct=g'
          },
          fixed_width_downsampled: {
            height: '129',
            width: '200',
            size: '34267',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200w_d.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200w_d.gif&ct=g',
            webp_size: '20556',
            webp: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200w_d.webp?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200w_d.webp&ct=g'
          },
          fixed_width_small: {
            height: '65',
            width: '100',
            size: '83610',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/100w.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=100w.gif&ct=g',
            mp4_size: '16199',
            mp4: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/100w.mp4?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=100w.mp4&ct=g',
            webp_size: '50516',
            webp: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/100w.webp?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=100w.webp&ct=g'
          },
          fixed_width_small_still: {
            height: '65',
            width: '100',
            size: '3004',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/100w_s.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=100w_s.gif&ct=g'
          },
          fixed_width_still: {
            height: '129',
            width: '200',
            size: '8024',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/200w_s.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=200w_s.gif&ct=g'
          },
          looping: {
            mp4_size: '2085788',
            mp4: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy-loop.mp4?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy-loop.mp4&ct=g'
          },
          original_still: {
            height: '310',
            width: '480',
            size: '77495',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy_s.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy_s.gif&ct=g'
          },
          original_mp4: {
            height: '308',
            width: '480',
            mp4_size: '283720',
            mp4: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy.mp4?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy.mp4&ct=g'
          },
          preview: {
            height: '214',
            width: '331',                           
          },
          preview_gif: {
            height: '113',
            width: '175',
            size: '49723',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy-preview.gif?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy-preview.gif&ct=g'
          },
          preview_webp: {
            height: '178',
            width: '276',
            size: '49406',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/giphy-preview.webp?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=giphy-preview.webp&ct=g'
          },            
          '480w_still': {
            height: '310',
            width: '480',
            size: '1196493',
            url: 'https://media1.giphy.com/media/xUA7bf3pBBZI3UrXdC/480w_s.jpg?cid=8f9286f58k4trokaso1j05k7ms0yaypw2evwoztpepo1kq2h&rid=480w_s.jpg&ct=g'
          }
        }
      }
      ]; 
       
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`memes has default value`, () => {
    expect(component.memes).toEqual([]);
  });

  it(`favorites has default value`, () => {
    expect(component.favorites).toEqual([]);
  });

  describe('Methods', () => {         
    it('toggleFavorite emits values', () => {
      spyOn(component.favoriteClicked, 'emit');
      component.toggleFavorite(memes[0]);           
      expect(component.favoriteClicked.emit).toHaveBeenCalled();
    });

    it('Scrolled emits value', () => {
      spyOn(component.fetchMore, 'emit');
      component.scrolled()          ;
      expect(component.fetchMore.emit).toHaveBeenCalled();
    });
    
    it('isInFavorites', () => {      
      component.favorites.push('1vYThCrZAsQU36nqkv');
      expect(component.isInFavorites('1vYThCrZAsQU36nqkv')).toBe(true);
    });        
    
  });
  

  describe('DOM', () => {
    beforeEach(() => {
      component.memes = memes;
      fixture.detectChanges();
    });

    it('has image', () => {
      expect(wingman.numberOfMatchingItems('#image0')).toBe(1);
    });

    it('has correct number of images', () => {
      expect(wingman.numberOfMatchingItems('.mdc-image-list__image')).toBe(1);
    });    

    it('has favorite', () => {
      expect(wingman.numberOfMatchingItems('#favorite0')).toBe(1);
    });
    
    it('has share', () => {
      expect(wingman.numberOfMatchingItems('#share0')).toBe(1);
    }); 
    
    it('Favorite has correct icon applied when is in favorites array', () => {
      component.favorites.push('1vYThCrZAsQU36nqkv');
      fixture.detectChanges();      
      expect(wingman.singleText('#favorite0').trim()).toBe('favorite');
    });

    it('Favorite has correct icon applied when is in favorites array', () => {
      component.favorites.length = 0;
      fixture.detectChanges();      
      expect(wingman.singleText('#favorite0').trim()).toBe('favorite_border');
    });    

    it('Favorite has correct class applied when is in favorites array', () => {
      component.favorites.push('1vYThCrZAsQU36nqkv');
      fixture.detectChanges();      
      expect(wingman.numberOfMatchingItems('mat-icon.selected')).toBe(1);
    });

    it('Favorite has class removed when not in favorites array', () => {
      component.favorites.length = 0;
      fixture.detectChanges();      
      expect(wingman.numberOfMatchingItems('mat-icon.selected')).toBe(0);
    });      
    
  });  
});
