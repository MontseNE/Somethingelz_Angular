import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import LoginPageComponent from '../../pages/login-page/login-page.component';
import RegisterPageComponent from '../../pages/register-page/register-page.component';

@Component({
  standalone: true,
  imports: [RouterModule, LoginPageComponent, RegisterPageComponent],
  templateUrl: './auth-layout.component.html',
  styles: ``
})
export default class AuthLayoutComponent {

}
