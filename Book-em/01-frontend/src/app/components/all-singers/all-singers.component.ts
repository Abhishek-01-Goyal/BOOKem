import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllSingerService } from '../../services/all-singers.service';

@Component({
  selector: 'app-all-singers',
  templateUrl: './all-singers.component.html',
  styleUrls: ['./all-singers.component.css']
})
export class AllSingersComponent implements OnInit {
  singers: any[] = []; // Replace 'any' with your singer model

  constructor(private allSingerService: AllSingerService, private router: Router) { }

  ngOnInit(): void {
    this.allSingerService.getAllSingers().subscribe(data => {
      this.singers = data;
    });
  }

  viewSingerProfile(singerId: number) {
    this.router.navigate([`/singer-profile/${singerId}`]);
  }
}
