import { Property } from "./property.interface";
import { PropertyImage } from "./propertyImage.interface";

export interface PropertiesResponse {
  data: Property[];
}


export interface PropertyResponse {
  data: Property;
}


export interface ImagesResponse {
  images: PropertyImage[];
}

