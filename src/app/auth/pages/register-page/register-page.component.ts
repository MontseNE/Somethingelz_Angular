import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({

  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styles: ``
})
export default class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],

  });
  registerConfirm() {

    alert('¡ Ya estás registrado !');

    this.router.navigateByUrl('/properties/home')
  }

  register() {

    const { name, email, password, } = this.myForm.value;
    console.log('VAMOS A LLAMAR AUTHSERVICE LOGIN()');
    console.log(email);
    console.log(password);
    this.authService.register(name, email, password)
      .subscribe({
        next: () => this.registerConfirm(),
        error: (message) => {
          alert(message);
        }
      })
  }
}
