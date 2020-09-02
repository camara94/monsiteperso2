import { ParcoursService } from './../services/parcours.service';
import { Parcours } from './../shared/parcours';
import { Component, OnInit, Inject } from '@angular/core';
import {  FavParcours } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FavoritesComponent implements OnInit {

  favorites = { user: '', parcours: []};
  favCertificats: Parcours[];
  delete: boolean;
  errMess: string;
  favorite: FavParcours;

  constructor(private favoriteService: FavoriteService,
    private parcoursService: ParcoursService) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => {
        this.favorites = { user: '', parcours: []};
        favorites.forEach(favorite => {
          this.parcoursService.getParcoursById(+favorite.parours)
            .subscribe(parcours => {
              this.favorites.parcours.push(parcours);
            });
        });
      },
      errmess => this.errMess = <any>errmess);
  }

  deleteFavorite(id: string) {
    this.favoriteService.deleteFavorite(id)
      .then(() => {
        this.favoriteService.getFavorites()
        .subscribe(favorites => {
          this.favorites = { user: '', parcours: []};
          favorites.forEach(favorite => {
            this.parcoursService.getParcoursById(+favorite.parours)
              .subscribe(parcours => {
                this.favorites.parcours.push(parcours);
              });
          });
        });
      },
      errmess => this.errMess = <any>errmess);
    this.delete = false;
  }

}
