// src/app/models/state.model.ts
import { Country } from "./country";
export interface State {
  id: number;
  name: string;
  country: Country;  // This assumes the State model has a reference to the Country
}
