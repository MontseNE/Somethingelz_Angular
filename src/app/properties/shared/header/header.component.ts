import { AuthStatus } from '../../../auth/interfaces/auth-status.enum';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
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
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export default class headerComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  public user: User | null = null;
  public show = false;

  ngOnInit() {
    console.log('comprobando si hay usuario logeado');
    this.authService.checkAuthStatus()
      .subscribe({
        next: () => this.user = this.authService.currentUser(),
        error: (message) => {
          alert(message);
          this.logout();
        }
      })

  }

  public logout() {
    console.log("llamando a logout desde header");
    this.authService.logout();
    this.user = null
  }


  public showMenu() {
    this.show = true;
  }

  public hideMenu() {
    this.show = false;
  }
}
