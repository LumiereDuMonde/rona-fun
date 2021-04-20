import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GIF } from '../../models/GIF.model';



@Component({
  selector: 'app-meme-display',
  templateUrl: './meme-display.component.html',
  styleUrls: ['./meme-display.component.scss']
})
export class MemeDisplayComponent implements OnInit  {
  @Input() memes: GIF[] = [];
  @Input() favorites: string[] = [];
  @Output() favoriteClicked = new EventEmitter<{meme: GIF, is_favorite: boolean}>();
  @Output() fetchMore = new EventEmitter<void>();
  

  constructor() { }
  
  ngOnInit(): void {   
         
  }

  toggleFavorite(meme: GIF) {       
    this.favoriteClicked.emit({meme, is_favorite: this.isInFavorites(meme.id)});
  }

  scrolled()   {
    console.log('Scrolling / fetching');
    this.fetchMore.emit();   
  }

  isInFavorites(id: string) {
    return this.favorites.includes(id);
  }
}
