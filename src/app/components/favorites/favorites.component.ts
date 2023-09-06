import { Component } from '@angular/core';

interface FavoriteLink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  links: FavoriteLink[] = [{ name: 'Google', url: 'https://www.google.com' }];
  newLinkName: string = '';
  newLinkUrl: string = '';
  showForm: boolean = false;

  addLink() {
    if (this.newLinkName && this.newLinkUrl) {
      this.links.push({ name: this.newLinkName, url: this.newLinkUrl });
      this.clearFields();
      this.showForm = !this.showForm;
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  clearFields() {
    this.newLinkName = '';
    this.newLinkUrl = '';
  }
}
