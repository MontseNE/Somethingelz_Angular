import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'somethingelz_Angular';


  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    console.log(this.authService.authStatus())
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });


  // public authStatusChangedEffect = effect(() => {

  //   switch (this.authService.authStatus()) {

  //     case AuthStatus.checking:
  //       return;

  //     case AuthStatus.authenticated:
  //       this.router.navigateByUrl('/properties/home');
  //       return;

  //     case AuthStatus.notAuthenticated:
  //       this.router.navigateByUrl('/properties/home');
  //       return;

  //   }

  // });

}
