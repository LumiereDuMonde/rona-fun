import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GIF } from 'src/app/meme/models/GIF.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar-presentation',
  templateUrl: './navbar-presentation.component.html',
  styleUrls: ['./navbar-presentation.component.scss']
})
export class NavbarPresentationComponent implements OnInit {

  @Input() favorites: GIF[];
  @Output() toggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Input() url: string;
  @Input() loggedIn: boolean;
  secondaryColor: boolean = false;

  constructor(private _clipboard: Clipboard, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.toggle.emit();
  }

  copyToClipBoard(val: string) {
    this._clipboard.copy(val);
    this._snackBar.open('Meme Copied!', 'Dismiss', { duration: 2000});
  }   

  isSecondary() {
    return this.url?.toLowerCase() === '/trading' || this.url?.toLowerCase() ==='/instruments';
  }

}
