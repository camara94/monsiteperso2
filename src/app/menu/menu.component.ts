import { Certificat } from './../shared/certificat';
import { CertificatService } from './../services/certificat.service';
import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
export class MenuComponent implements OnInit {

  errMess: string;
  certificats: Certificat[];

  selectedCertificat: Certificat;

  constructor(
    private certificatService: CertificatService
    ) { }

  ngOnInit() {
    this.certificatService
        .getCertificats()
        .subscribe( data => this.certificats = data, err => this.errMess = <any>err );
  }

  onSelect(certificat: Certificat) {
    this.selectedCertificat = certificat;
  }

}
