import { ParcoursService } from './../services/parcours.service';
import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Parcours } from '../shared/parcours';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

 parcours: Parcours[];
 pacoursErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor( private prcoursService: ParcoursService ) { }

  ngOnInit() {
    this.prcoursService.getParcours()
      .subscribe(data => {this.parcours = data; console.log('Mes parcours:', this.parcours[0]);},
        errmess => this.pacoursErrMess = <any>errmess);
  }

}
