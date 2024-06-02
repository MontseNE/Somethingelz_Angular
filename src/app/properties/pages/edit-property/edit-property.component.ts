// edit-property.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PropertiesService } from '../../services/properties.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Property } from '../../interfaces/property.interface';
import { PropertyImage } from '../../interfaces/propertyImage.interface';
import { UpdatePropertyPayload } from '../../interfaces/updatePropertyPayload.interface';


@Component({
  selector: 'app-edit-property',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css'],
})
export default class EditPropertyComponent implements OnInit {

  public propertiesService = inject(PropertiesService);
  private fb = inject(FormBuilder);
  private route = inject(Router);
  private router = inject(ActivatedRoute);

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

  selectedFiles: PropertyImage[] = [];
  placeholderArray = Array(8).fill(null);
  imagenes: (string | undefined)[] = []; // Arreglo para almacenar las URLs de las imágenes seleccionadas

  constructor() {
    this.placeholderArray = [];
    for (let i = 0; i < 8 - this.selectedFiles.length; i++) {
      this.placeholderArray.push(i);
    }
  }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.propertiesService.propertiesById(id).subscribe({
        next: (property: Property) => {
          this.myForm.patchValue(property);
          this.selectedFiles = property.images || [];
          this.imagenes = this.selectedFiles.map(file => file.filename);
        },
        error: (message) => {
          console.error('Error en la petición:', message);
        }
      });
    }
  }

  createProperty() {
    if (this.myForm.valid) {
      const propertyId = this.router.snapshot.paramMap.get('id');
      const { operation, tipology, title, description, province, municipality, address, precio, n_rooms, n_bathrooms, size, garage } = this.myForm.value;

      // Datos para actualizar la propiedad
      const updateData: UpdatePropertyPayload = {
        operation: operation ?? '',
        tipology: tipology ?? '',
        title: title ?? '',
        description: description ?? '',
        province: province ?? '',
        municipality: municipality ?? '',
        address: address ?? '',
        precio: precio ?? 0,
        n_rooms: n_rooms ?? 0,
        n_bathrooms: n_bathrooms ?? 0,
        size: size ?? 0,
        garage: garage ?? false,
        images: this.selectedFiles.map(file => ({
          filename: file.filename,
          title: file.title
        })),
        removedImages: this.removedFiles
      };

      console.log(this.removedFiles);

      if (propertyId) {
        this.propertiesService.updateProperty(propertyId, updateData as Property).subscribe({
          next: (response: Property) => {
            console.log('Respuesta recibida:', response);
            this.route.navigate(['/properties/listado-busqueda']);
          },
          error: (message) => {
            console.error('Error en la petición:', message);
          }
        });
      } else {
        console.error('No property ID provided');
      }
    } else {
      console.log('El formulario no es válido. Por favor, complete todos los campos requeridos.');
    }
  }



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

  async getImages() {
    const images = this.selectedFiles;
    return images;
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

  removedFiles: string[] = [];

  removeFile(index: number) {
    const removedFile = this.selectedFiles.splice(index, 1)[0];
    if (removedFile.filename) {
      this.removedFiles.push(removedFile.filename); // Guardar el nombre de la imagen eliminada
      this.imagenes[index] = undefined; // Quitar la URL de la imagen
    }
  }
}
