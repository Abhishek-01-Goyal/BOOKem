import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SingersService } from '../../services/singers.service';
import { Singer } from '../../models/genre';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.css']
})
export class SingersComponent implements OnInit, AfterViewInit, OnDestroy {
  public rappersSingers: Singer[] = [];
  public bollywoodSingers: Singer[] = [];
  public punjabiSingers: Singer[] = [];
  public sufiSingers: Singer[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private singersService: SingersService) {}

  ngOnInit(): void {
    this.loadSingersByGenre('rappers');
    this.loadSingersByGenre('bollywood');
    this.loadSingersByGenre('punjabi');
    this.loadSingersByGenre('sufi');
  }

  loadSingersByGenre(genre: string): void {
    const sub = this.singersService.findSingersByGenre(genre).subscribe((singers: Singer[]) => {
      console.log(`Loaded ${genre} singers:`, singers); // Debugging line
      switch (genre) {
        case 'rappers':
          this.rappersSingers = singers;
          break;
        case 'bollywood':
          this.bollywoodSingers = singers;
          break;
        case 'punjabi':
          this.punjabiSingers = singers;
          break;
        case 'sufi':
          this.sufiSingers = singers;
          break;
      }
    });
    this.subscriptions.add(sub); // Add subscription to cleanup list
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCarousels();
      this.initializeSlideshow(); // General slideshow if applicable
    }, 500); // Delay to ensure data and DOM are ready
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  initializeCarousels(): void {
    setTimeout(() => {
      this.initializeCarousel('rappers');
      this.initializeCarousel('bollywood');
      this.initializeCarousel('punjabi');
      this.initializeCarousel('sufi');
    }, 0); // Slight delay to ensure DOM is ready
  }

  initializeCarousel(genre: string): void {
    const carouselContainer = document.querySelector(`#${genre} .carousel`) as HTMLElement;
    const prevButton = document.querySelector(`#${genre} .carousel-nav.prev`) as HTMLElement;
    const nextButton = document.querySelector(`#${genre} .carousel-nav.next`) as HTMLElement;
  
    console.log(`Initializing carousel for ${genre}`);
    console.log('Carousel Container:', carouselContainer);
    console.log('Previous Button:', prevButton);
    console.log('Next Button:', nextButton);
  
    if (!carouselContainer || !prevButton || !nextButton) {
      console.error(`Failed to initialize carousel for ${genre}. Missing elements.`);
      return;
    }
  
    let slideIndex = 0;
    const slides = carouselContainer.getElementsByClassName('carousel-item') as HTMLCollectionOf<HTMLElement>;
  
    console.log('Slides:', slides);
  
    if (slides.length === 0) {
      console.error(`No slides found for ${genre}.`);
      return;
    }
  
    function showSlides(index: number): void {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slideIndex = (index + slides.length) % slides.length;
      slides[slideIndex].style.display = 'block';
    }
  
    prevButton.addEventListener('click', () => {
      slideIndex--;
      showSlides(slideIndex);
    });
  
    nextButton.addEventListener('click', () => {
      slideIndex++;
      showSlides(slideIndex);
    });
  
    showSlides(slideIndex);
    

    prevButton.addEventListener('click', () => {
      slideIndex--;
      showSlides(slideIndex);
    });

    nextButton.addEventListener('click', () => {
      slideIndex++;
      showSlides(slideIndex);
    });

    showSlides(slideIndex); // Initialize first slide
  }

  initializeSlideshow(): void {
    let slideIndex = 0;
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;

    console.log('Slideshow Slides:', slides);

    function showSlides(): void {
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active', 'previous');
      }

      const previousSlideIndex = slideIndex;
      if (slides[previousSlideIndex]) {
        slides[previousSlideIndex].classList.add('previous');
      }

      slideIndex++;
      if (slideIndex >= slides.length) {
        slideIndex = 0;
      }

      if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
      }
      setTimeout(showSlides, 3000); // Loop every 3 seconds
    }

    showSlides(); // Start slideshow
  }
}
