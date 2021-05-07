import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @Input() loading: boolean = true;

  constructor(private _clipboard: Clipboard, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {   
         
  }

  toggleFavorite(meme: GIF) {       
    this.favoriteClicked.emit({meme, is_favorite: this.isInFavorites(meme.id)});
  }

  scrolled()   {        
    this.fetchMore.emit();   
  }

  isInFavorites(id: string) {
    return this.favorites.includes(id);
  }

  copyToClipBoard(val: string) {
    this._clipboard.copy(val);
    this._snackBar.open('Meme Copied!', 'Dismiss', { duration: 2000});
  }
}
