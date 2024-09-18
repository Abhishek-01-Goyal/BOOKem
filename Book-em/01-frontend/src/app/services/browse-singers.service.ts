import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Singer } from '../models/singer'; // Assuming you have a Singer model.

@Injectable({
  providedIn: 'root'
})
export class BrowseSingersService {

  private baseUrl = 'http://localhost:8080/api/singers'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  findSingersByGenre(genre: string): Observable<Singer[]> {
    return this.http.get<Singer[]>(`${this.baseUrl}/genre/${genre}`);
  }
  getSingerById(singerId: number): Observable<Singer> {
    return this.http.get<Singer>(`${this.baseUrl}/${singerId}`);
  }
}
