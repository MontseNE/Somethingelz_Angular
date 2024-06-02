import { Property } from "./property.interface";

export interface UpdatePropertyPayload extends Partial<Property> {
  removedImages?: string[];
}
