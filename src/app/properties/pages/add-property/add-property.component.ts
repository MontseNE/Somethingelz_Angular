import { PropertyImage } from './../../interfaces/propertyImage.interface';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertiesService } from '../../services/properties.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Property } from '../../interfaces/property.interface';


@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export default class AddPropertyComponent {


  constructor() {

    this.placeholderArray = [];
    for (let i = 0; i < 8 - this.selectedFiles.length; i++) {
      this.placeholderArray.push(i);

    }

  }
  public propertiesService = inject(PropertiesService);


  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    operation: ['', [Validators.required]],
    tipology: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    province: ['', [Validators.required]],
    municipality: ['', [Validators.required]],
    address: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    n_rooms: ['', [Validators.required]],
    n_bathrooms: ['', [Validators.required]],
    size: ['', [Validators.required]],
    garage: ['', [Validators.required]]
  });


  createProperty() {
    if (this.myForm.valid) {

      console.log('estamos en createProperty')

      // Obtener valores del formulario
      const { operation, tipology, title, description, province, municipality, address, precio,
        n_rooms, n_bathrooms, size, garage } = this.myForm.value;

      // Llamar a la función createProperty con los datos del formulario
      this.propertiesService.createProperty(operation, tipology, title, description, province, municipality,
        address, precio, n_rooms, n_bathrooms, size, garage, this.selectedFiles).subscribe({
          next: (response: Property) => {
            console.log('Respuesta recibida:', response);
          },
          error: (message) => {
            console.error('Error en la petición:', message);
          }
        });
    } else {
      console.log('El formulario no es válido. Por favor, complete todos los campos requeridos.');
    }
  }

  async getImages() {
    const images = this.selectedFiles;
    return images;
  }

  selectedFiles: PropertyImage[] = [];

  placeholderArray = Array(4).fill(null);

  file: File | undefined;
  imagen = './assets/images-properties/foto(1).jpg';
  imagenes: (string | undefined)[] = []; // Arreglo para almacenar las URLs de las imágenes seleccionadas

  onPhotoSelected(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenes[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onPhotoInputClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const input = target.nextElementSibling as HTMLInputElement;
    input.click();
  }


  onFileSelected(title: string, fileInput: HTMLInputElement) {
    const files: FileList | null = fileInput?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const propertyImage: PropertyImage = {
          filename: file.name,
          title: title,
          file: file
        };
        this.selectedFiles.push(propertyImage);
        console.log(this.selectedFiles);
      }
    }
  }


  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    // To do conseguir que se vuelva a poner la imagen placeholder y limpiar el title
    this.imagenes[index] = undefined;
  }

}
