import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingerService } from '../../services/genre-singers.service';

@Component({
  selector: 'app-genre-singers',
  templateUrl: './genre-singers.component.html',
  styleUrls: ['./genre-singers.component.css']
})
export class GenreSingersComponent implements OnInit {
  genre: string = '';
  singers: any[] = []; // This will hold the fetched singers for the genre

  constructor(private route: ActivatedRoute, private singerService: SingerService) {}

  ngOnInit(): void {
    // Get the genre from the route
    this.genre = this.route.snapshot.paramMap.get('genre') || '';

    // Fetch singers based on the genre
    this.singerService.getSingersByGenre(this.genre).subscribe((data: any) => {
      this.singers = data;
    });
  }
}
