import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { SingersService } from '../../services/singers.service';
import { Singer, Genre } from '../../models/genre';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.css']
})
export class SingersComponent implements OnInit, AfterViewInit, OnDestroy {
  public singers: Singer[] = [];
  public genres: Genre[] = [];
  private subscriptions: Subscription = new Subscription();
  public selectedGenre: string = '';

  constructor(private singersService: SingersService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  ngAfterViewInit(): void {
    // Initialize general slideshow if needed
    this.initializeSlideshow();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Clean up subscriptions
  }

  loadGenres(): void {
    this.subscriptions.add(
      this.singersService.getGenres().subscribe(
        (genres: Genre[]) => {
          this.genres = genres;
          this.initializeCarousels(); // Initialize carousels after genres are loaded
        },
        (error: any) => {
          console.error('Error loading genres', error);
        }
      )
    );
  }

  loadSingersByGenre(genre: string): void {
    this.subscriptions.add(
      this.singersService.getSingersByGenre(genre).subscribe(
        (singers: Singer[]) => {
          this.singers = singers;
        },
        (error: any) => {
          console.error('Error loading singers by genre', error);
        }
      )
    );
  }

  onGenreChange(newGenre: string): void {
    this.selectedGenre = newGenre;
    this.loadSingersByGenre(newGenre);
  }

  initializeCarousels(): void {
    setTimeout(() => {
      this.genres.forEach(genre => {
        this.initializeCarousel(genre.genre.toLowerCase());
      });
    }, 0);
  }

  initializeCarousel(genre: string): void {
    const carouselContainer = document.querySelector(`.genre-section.${genre} .carousel`) as HTMLElement;
    const prevButton = document.querySelector(`.genre-section.${genre} .carousel-nav.prev`) as HTMLElement;
    const nextButton = document.querySelector(`.genre-section.${genre} .carousel-nav.next`) as HTMLElement;

    if (!carouselContainer || !prevButton || !nextButton) return;

    let slideIndex = 0;
    const slides = carouselContainer.getElementsByClassName('carousel-item') as HTMLCollectionOf<HTMLElement>;

    function showSlides() {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1; }
      slides[slideIndex - 1].style.display = 'block';
    }

    prevButton.addEventListener('click', () => {
      slideIndex -= 2;
      if (slideIndex < 0) { slideIndex = slides.length - 2; }
      showSlides();
    });

    nextButton.addEventListener('click', showSlides);

    showSlides(); // Initialize first slide
    setInterval(showSlides, 3000); // Change slide every 3 seconds
  }

  initializeSlideshow() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;

    function showSlides() {
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active', 'previous');
      }

      const previousSlideIndex = slideIndex;
      slides[previousSlideIndex].classList.add('previous');

      slideIndex++;
      if (slideIndex >= slides.length) {
        slideIndex = 0;
      }

      slides[slideIndex].classList.add('active');
      setTimeout(showSlides, 3000);
    }

    showSlides();
  }
}