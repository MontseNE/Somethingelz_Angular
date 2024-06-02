import { HttpClientModule } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, computed, signal, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import headerComponent from '../../shared/header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertiesService } from '../../services/properties.service';
import { Property } from '../../interfaces/property.interface';
import { Observable, catchError, tap } from 'rxjs';
import { PropertiesState } from '../../interfaces/propertiesState.interface';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [
    CommonModule, RouterModule, headerComponent, ReactiveFormsModule
  ],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css',
})
export default class FrontPageComponent {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  public propertiesService = inject(PropertiesService);


  public myForm: FormGroup = this.fb.group({
    municipality: ['', [Validators.required]],
    tipology: ['', [Validators.required]],

  });


  public button1Color = signal<string>('#1bb8ab'); // Color inicial del botón 1
  public button2Color = signal<string>('white'); // Color inicial del botón 2


  findProperties() {
    let operation = 'venta';

    const { municipality, tipology } = this.myForm.value;

    if (this.button1Color() === 'white') {
      operation = 'alquiler';
    }

    if (municipality && tipology) {
      const filteredProperties = this.propertiesService.properties().filter(property =>
        property.municipality.toLowerCase() === municipality.toLowerCase() &&
        property.tipology.toLowerCase() === tipology.toLowerCase() &&
        property.operation.toLowerCase() === operation.toLowerCase()
      );

      this.propertiesService.filteredProperties.set(filteredProperties);
    } else {
      this.propertiesService.filteredProperties.set([]);
    }

    console.log('estamos en buscador');
    console.log(this.propertiesService.filteredProperties());
    this.router.navigateByUrl('/properties/listado-busqueda');
  }


  public changeColor(event: any) {
    // Determina cuál botón fue pulsado
    const buttonClicked = event.target;

    // Cambia el color del botón pulsado
    if (buttonClicked.innerText === 'COMPRAR') {
      this.button1Color.set('#1bb8ab');
      this.button2Color.set('white');
    } else if (buttonClicked.innerText === 'ALQUILAR') {
      this.button2Color.set('#1bb8ab');
      this.button1Color.set('white');
    }


  }



}
