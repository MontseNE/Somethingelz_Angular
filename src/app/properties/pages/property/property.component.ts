import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Property } from '../../interfaces/property.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { PropertiesService } from '../../services/properties.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './property.component.html',
  styles: `
  `,

})
export default class PropertyComponent {

  private route = inject(ActivatedRoute);
  public propertiesService = inject(PropertiesService);
  //public id = 0;
  public property = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.propertiesService.propertiesById(id)),

    )
  )


  //  public id = this.property()!.id;


  public imagesLenght = signal(0);

  // public images = [1055, 194, 368].map((id) => `https://localhost:3000/uploads/${this.id}`);

}
