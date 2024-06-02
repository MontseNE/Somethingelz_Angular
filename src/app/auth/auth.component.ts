import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import LoginPageComponent from './pages/login-page/login-page.component';
import RegisterPageComponent from './pages/register-page/register-page.component';
import AuthLayoutComponent from './layouts/auth-layout/auth-layout.component';
import { routes } from '../app.routes';

@Component({
  standalone: true,

  imports: [RouterModule,],
  templateUrl: './auth.component.html',
  styles: ``
})
export default class AuthComponent {

}
