import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { Clipboard } from '@angular/cdk/clipboard';
import { GIF } from '../../models/GIF.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-meme-display',
  templateUrl: './meme-display.component.html',
  styleUrls: ['./meme-display.component.scss']
})
export class MemeDisplayComponent implements OnInit, AfterViewInit {
  @Input() memes: GIF[] = [];
  @Input() favorites: string[] = [];
  @Output() favoriteClicked = new EventEmitter<{meme: GIF, is_favorite: boolean}>();
  @Output() fetchMore = new EventEmitter<void>();
  @Input() loading: boolean = true;

  constructor(private _clipboard: Clipboard, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  ngAfterViewInit(): void {
    this.memeImages.changes.subscribe(() => {
      this.adjustImageHeights();
    });
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

  @ViewChildren('memeImage') memeImages!: QueryList<ElementRef>;

  adjustImageHeights() {
    this.memeImages.forEach((memeImageRef: ElementRef) => {
      const img = memeImageRef.nativeElement;
      img.onload = () => {
        const height = img.naturalHeight;
        const rowSpan = Math.ceil(height / 10) + 2; // 10px is the grid-auto-rows value
        img.parentElement.style.gridRowEnd = `span ${rowSpan}`;
      };
    });
  }
}
