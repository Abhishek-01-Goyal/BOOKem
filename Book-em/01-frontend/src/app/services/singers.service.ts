// singers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Singer } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class SingersService {
  private apiUrl = 'http://localhost:8080/api/singers'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  findSingersByGenre(genre: string): Observable<Singer[]> {
    return this.http.get<Singer[]>(`${this.apiUrl}?genre=${genre}`);
  }
}
