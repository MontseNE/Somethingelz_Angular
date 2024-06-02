import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PropertiesService } from '../../services/properties.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list-FilteredPropertiesComponent',
  standalone: true,
  imports: [RouterModule, CommonModule,],
  templateUrl: './list-filteredProperties.component.html',
  styleUrl: './list-filteredProperties.component.css',
})

export default class listFilteredPropertiesComponent {


  public propertiesService = inject(PropertiesService);
  private router = inject(Router);
  public authService = inject(AuthService);

  public toProperty(id: string) {
    this.router.navigateByUrl(`/properties/propiedad/${id}`);

  }

  private sanitizer = inject(DomSanitizer);

  sanitizeUrl(url: string): SafeUrl {
    // Reemplazar barras invertidas con barras diagonales
    const sanitizedUrl = url.replace(/\\/g, '/');
    console.log(sanitizedUrl);
    return this.sanitizer.bypassSecurityTrustUrl(sanitizedUrl);
  }



}
