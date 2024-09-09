import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Singer, Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class SingersService {
  private apiUrl = 'http://localhost:8080/api/singers'; // Adjust URL as needed

  constructor(private http: HttpClient) { }

  getSingersByGenre(genre: string): Observable<Singer[]> {
    return this.http.get<Singer[]>(`${this.apiUrl}/genre/${genre}`);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres`);
  }
}
