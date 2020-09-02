import { ProjetService } from './../services/projet.service';
import { Projet } from './../shared/projet';
import { Component, OnInit } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-portefolio',
  templateUrl: './portefolio.component.html',
  styleUrls: ['./portefolio.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class PortefolioComponent implements OnInit {
  projets: Projet[];
  projetError: string;

  constructor(private projetService: ProjetService) { }

  ngOnInit() {
    this.projetService
        .getProjets()
        .subscribe( data => {this.projets = data ; console.log(this.projets);}, err => this.projetError = <any>err );
  }

}
