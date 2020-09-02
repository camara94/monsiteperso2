import { AproposService } from './../services/apropos.service';
import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Apropos } from '../shared/apropos';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {

   /**
   * Pipe Constructor
   *
   * @param _sanitizer: DomSanitezer
   */

  errMess: string;
  apropos: Apropos[];
  errApropos: string;

  constructor(
    private aproposService: AproposService,
    protected _sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.aproposService
        .getApropos()
        .subscribe( data => this.apropos = data, err => this.errApropos = <any>err );
  }

  /**
   * Transform
   *
   * @param value: string
   */
  transform(value: string):  SafeUrl {
    console.log('%c Voir: ' + this._sanitizer.bypassSecurityTrustUrl(value), "color:green; font-size: 15px; font-weight:bold");
    return this._sanitizer.bypassSecurityTrustUrl(value);
  }

}
