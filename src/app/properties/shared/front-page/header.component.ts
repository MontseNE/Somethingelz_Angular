import { AuthStatus } from './../../../auth/interfaces/auth-status.enum';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { CheckTokenResponse } from '../../../auth/interfaces/check-token.response';
import { isAuthenticatedGuard } from '../../../auth/guards/is-authenticated.guard';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, RouterModule, RouterLink,
  ],
  templateUrl: './header.component.html',
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export default class headerComponent implements OnInit {
  private authService = inject(AuthService);
  public user = computed(() => this.authService.authStatus());
  public ischecked = false;
  // public name = this.authService.userName();
  ngOnInit() {
    console.log('comprobando si hay usuario logeado');

    // if (this.user() === AuthStatus.authenticated) {
    //   this.ischecked = true;
    //   console.log(this.user());
    // } else {
    //   //this.userName = null;
    // }
  }


  public logout() {

    this.authService.logout();
    // this.user.update(value => value = false)
  }

}
