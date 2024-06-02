import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Property } from '../interfaces/property.interface';
import { PropertiesState } from '../interfaces/propertiesState.interface';
import { PropertyImage } from '../interfaces/propertyImage.interface';
import { PropertiesResponse, PropertyResponse } from '../interfaces/propertiesResponse.interface';
import { AuthService } from '../../auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor() {

    this.getAllProperties();
    this.getMunicipalites();
    this.getTipologies();
  }


  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  public authService = inject(AuthService);
  public router = inject(Router);

  #propertiesState = signal<PropertiesState>({
    loading: true,
    properties: []
  });

  public properties = computed(() => this.#propertiesState().properties);
  private loading = computed(() => this.#propertiesState().loading);
  public municipalities = signal<string[]>([]);
  public tipologies = signal<string[]>([]);

  public filteredProperties = signal<Property[]>([]);

  public favProperties = computed(() => {
    const currentUser = this.authService.currentUser();
    if (!currentUser || !currentUser.favList) {
      return;
    }
    return this.properties().filter(property =>
      property.id !== undefined && currentUser.favList.includes(property.id)
    );
  });



  isFav(id: string) {
    if (!this.authService.currentUser()) return;
    const user = this.authService.currentUser();

    let src = './assets/images-properties/noFav.jpg';
    if (user?.favList.includes(id)) {
      src = './assets/images-properties/fav.png';
    } else {
      src = './assets/images-properties/noFav.png';
    }

    return src;
  }


  getAllProperties() {
    const url = `${this.baseUrl}/api/properties`;
    this.http.get<PropertiesResponse>(url).pipe(
      tap((response: PropertiesResponse) => {
        const properties = response.data; // Obtener el array de propiedades desde la respuesta
        this.#propertiesState.set({
          loading: false,
          properties: properties
        });
        this.getMunicipalites();
        this.getTipologies();
        console.log(this.municipalities());
        console.log(this.properties());
      }),
      catchError(err => {
        this.#propertiesState.set({
          loading: false,
          properties: []
        });
        return throwError(() => err.error.message);
      })
    ).subscribe();
  }

  recortarDescripcion(descrip: string) {
    return descrip.substring(0, 200);
  }

  getImageName(name: string) {
    const dashIndex = name.indexOf('-');
    if (dashIndex === -1) {
      // Si no se encuentra el caracter '-', puedes devolver una cadena vacía o el string completo
      return '';
    } else {
      return name.substring(dashIndex + 1);
    }
  }


  getUrl(url: string): string {
    let urlCompleta = '';
    const inic = 'http://localhost:3000/uploads/';

    return inic + this.getImageName(url);

  }

  filterMunicipalities(municipality: string) {
    const currentMunicipalities = this.municipalities().sort();
    if (!currentMunicipalities.includes(municipality) && municipality !== "") {
      this.municipalities.set([...currentMunicipalities, municipality]); // Actualizar el estado de municipalities
    }
  }

  filterTipologies(tipology: string) {
    const currentTipologies = this.tipologies().sort();
    if (!currentTipologies.includes(tipology) && tipology !== "") {
      this.tipologies.set([...currentTipologies, tipology]);
    }
  }

  getMunicipalites() {

    this.properties().filter(element => {
      this.filterMunicipalities(element.municipality.toLowerCase());

    });

    return this.municipalities();
  }


  getTipologies() {

    this.properties().filter(element => {
      this.filterTipologies(element.tipology.toLowerCase());
    });

    return this.tipologies();
  }


  propertiesById(id: string) {
    const url = `${this.baseUrl}/api/properties/${id}`;
    return this.http.get<PropertyResponse>(url)
      .pipe(map(resp => resp.data));

  }

  updateProperty(id: string, property: Property): Observable<Property> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.patch<Property>(`${this.baseUrl}/api/properties/${id}`, property, { headers });
  }

  // getPropertyImage(filename: string) {
  //   const url = `${this.baseUrl}/api/properties/images/${filename}`;
  //   return this.http.get<PropertyResponse>(url);

  // }

  createProperty(operation: string, tipology: string, title: string, description: string,
    province: string, municipality: string, address: string, precio: number, n_rooms: number,
    n_bathrooms: number, size: number, garage: boolean, images: PropertyImage[]): Observable<Property> {

    const url = `${this.baseUrl}/api/properties`; // Actualiza la URL según la ruta de tu backend

    console.log('entrando en createProperty del servicio');


    // Crear un objeto con los datos a enviar
    const formData = new FormData();
    formData.append('operation', operation);
    formData.append('tipology', tipology);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('province', province);
    formData.append('municipality', municipality);
    formData.append('address', address);
    formData.append('precio', precio.toString());
    formData.append('n_rooms', n_rooms.toString());
    formData.append('n_bathrooms', n_bathrooms.toString());
    formData.append('size', size.toString());
    formData.append('garage', garage.toString());


    images.forEach((image, index) => {
      if (image.file) {
        formData.append('images', image.file, image.filename);
        formData.append(`titles`, image.title || '');
        formData.append(`filenames`, image.filename || '');
      }
    });
    const formDataEntries = formData as unknown as Iterable<[string, string | File]>;


    // Itera sobre los pares clave-valor
    for (const [key, value] of formDataEntries) {
      console.log(key, value);
    }


    return this.http.post<Property>(url, formData);
  }


}
