import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingerProfileService } from '../../services/singer-profile.service';
import { Singer } from '../../models/singer';

@Component({
  selector: 'app-singer-profile',
  templateUrl: './singer-profile.component.html',
  styleUrls: ['./singer-profile.component.css']
})
export class SingerProfileComponent implements OnInit {
  singer: Singer | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private singerProfileService: SingerProfileService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const singerId = params.get('id');
      console.log('Singer ID from route:', singerId); // Log the ID from route
      if (singerId) {
        const idAsNumber = +singerId; // Convert the string to a number
        console.log('Converted ID:', idAsNumber); // Log the converted ID
        if (!isNaN(idAsNumber)) {
          this.singerProfileService.getSingerById(idAsNumber).subscribe(
            data => {
              this.singer = data;
              console.log('Singer data:', this.singer); // Log the singer data
            },
            error => console.error('Error fetching singer details:', error)
          );
        } else {
          console.error('Invalid Singer ID:', idAsNumber);
        }
      } else {
        console.error('Singer ID is not defined');
      }
    });
  }

  bookNow(): void {
    if (this.singer && this.singer.singerId) {
      // Navigate to the booking page with singer ID
      this.router.navigate(['/booking'], { queryParams: { id: this.singer.singerId } });
    } else {
      console.error('Singer ID is not available');
    }
  }
}
