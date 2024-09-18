import { Injectable } from '@angular/core';
import { Singer } from '../models/singer';

@Injectable({
  providedIn: 'root'
})
export class SingerStorageService {
  private singer: Singer | null = null;

  setSinger(singer: Singer): void {
    this.singer = singer;
  }

  getSinger(): Singer | null {
    return this.singer;
  }
}
