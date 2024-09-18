import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllSingerService {

  private apiUrl = 'http://localhost:8080/api/singers'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  getAllSingers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
