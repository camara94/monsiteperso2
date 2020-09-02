import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  username: string = undefined;

  constructor(public dialog: MatDialog,
    private authService: AuthService ) { }

    ngOnInit() {
      this.authService.getAuthState()
      .subscribe((user) => {
        if (user) {
          // User is signed in.
          console.log('Logged In ', user.email);
          this.username = user.displayName ? user.displayName: user.email;
        } else {
          console.log('Not Logged In');
          this.username = undefined;
        }
      });
    }

    openLoginForm() {
      const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
    }

    logOut() {
      this.username = undefined;
      this.authService.logOut();
    }
}
