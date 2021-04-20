import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-meme-search-bar-component',
  templateUrl: './meme-search-bar-component.component.html',
  styleUrls: ['./meme-search-bar-component.component.scss']
})
export class MemeSearchBarComponentComponent implements OnInit {

  searchTerm: string;
  @Output() doSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    this.doSearch.emit(this.searchTerm);
  }

}
