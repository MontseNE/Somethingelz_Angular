import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
//import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { routes } from '../../../app.routes';


@Component({

  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styles: ``
})
export default class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  login() {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/properties/home'),
        error: (message) => {
          // Swal.fire('Error', message, 'error')
        }
      })

  }

}
