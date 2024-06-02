import { PropertyImage } from "./propertyImage.interface";

export interface Property {
  id?: string;
  operation: string;
  tipology: string;
  title: string;
  description: string;
  province: string;
  municipality: string;
  address: string;
  precio: number;
  n_rooms: number;
  n_bathrooms: number;
  size: number;
  garage: boolean;
  imagePaths?: string[];
  images: PropertyImage[];
}


