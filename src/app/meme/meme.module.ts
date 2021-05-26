import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemeComponent } from './meme.component';
import { MemeSearchBarContainerComponent } from './containers/meme-search-bar-container/meme-search-bar-container.component';
import { MemeSearchBarComponentComponent } from './components/meme-search-bar-component/meme-search-bar-component.component';
import { StoreModule } from '@ngrx/store';
import * as fromMeme from './reducers';
import { MemeEffects } from './effects/meme.effect';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from '../core/core.module';
import { MemeDisplayContainerComponent } from './containers/meme-display-container/meme-display-container.component';
import { MemeDisplayComponent } from './components/meme-display/meme-display.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [MemeComponent, MemeSearchBarContainerComponent, MemeSearchBarComponentComponent, MemeDisplayContainerComponent, MemeDisplayComponent],
  imports: [
    CommonModule,    
    StoreModule.forFeature(fromMeme.memeFeatureKey, fromMeme.reducers),
    EffectsModule.forFeature([MemeEffects]),
    CoreModule,
    InfiniteScrollModule
  ]
})
export class MemeModule { }
