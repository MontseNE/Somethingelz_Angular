import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import PropertyComponent from './pages/property/property.component';
import FrontPageComponent from './pages/front-page/front-page.component';
import listPropertiesComponent from './pages/list-properties/list-properties.component';
import headerComponent from './shared/header/header.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  standalone: true,

  imports: [RouterModule, PropertyComponent, FrontPageComponent, listPropertiesComponent, headerComponent],
  templateUrl: './properties.component.html',
  styles: ``
})
export default class PropertiesComponent {

  public authService = inject(AuthService);

}
