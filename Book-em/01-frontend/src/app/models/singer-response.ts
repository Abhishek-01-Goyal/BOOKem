// models/singer-response.ts
import { Singer } from './singer';

export interface SingerResponse {
  content: Singer[];
  totalPages: number;
}
