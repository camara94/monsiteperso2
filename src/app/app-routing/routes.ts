import { PortefolioComponent } from './../portefolio/portefolio.component';
import { CertificatDetailComponent } from './../certificat-detail/certificat-detail.component';
import { CertificatComponent } from './../certificat/certificat.component';
import { Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FavoritesComponent } from '../favorites/favorites.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'certificats', component: CertificatComponent },
  { path: 'favorites',     component: FavoritesComponent },
  { path: 'certificatdetail/:id', component: CertificatDetailComponent },
  { path: 'portefolio', component: PortefolioComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contactus',     component: ContactComponent },
];
