import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PropertiesService } from '../../services/properties.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list-PropertiesComponent',
  standalone: true,
  imports: [RouterModule, CommonModule,],
  templateUrl: './list-properties.component.html',
  styleUrl: './list-properties.component.css',
})

export default class listPropertiesComponent {


  public propertiesService = inject(PropertiesService);
  public authService = inject(AuthService);
  private router = inject(Router);


  public toProperty(id: string) {
    this.router.navigateByUrl(`/properties/propiedad/${id}`);

  }

  private sanitizer = inject(DomSanitizer);

  sanitizeUrl(url: string): SafeUrl {
    // Reemplazar barras invertidas con barras diagonales
    const inic = 'http://localhost:3000/uploads/';


    const sanitizedUrl = inic + url;
    console.log(sanitizedUrl);
    return sanitizedUrl;


  }

  toEdit(id: string) {
    this.router.navigateByUrl(`/properties/editproperty/${id}`);


  }
}
