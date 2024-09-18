import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  private baseUrl = 'http://localhost:8080/api/singers'; // Your backend API endpoint

  constructor(private http: HttpClient) {}

  // Fetch singers by genre
  getSingersByGenre(genre: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/${genre}`);
  }
}
