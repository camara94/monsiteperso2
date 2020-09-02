import { Component, OnInit } from '@angular/core';
import { AproposService } from '../services/apropos.service';
import { Apropos } from '../shared/apropos';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  apropos: Apropos[];
  errApropos: string;
  date: Date;
  year: number;

  constructor(
    private aproposService: AproposService
    ) {

      this.date = new Date();
      this.year = this.date.getFullYear();
    }

  ngOnInit() {

    this.aproposService
        .getApropos()
        .subscribe( data =>{ this.apropos = data; console.log(data)}, err => this.errApropos = <any>err );
  }

}
