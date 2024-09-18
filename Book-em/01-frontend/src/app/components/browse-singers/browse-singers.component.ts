import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { BrowseSingersService } from '../../services/browse-singers.service';
import { Singer } from '../../models/singer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse-singers',
  templateUrl: './browse-singers.component.html',
  styleUrls: ['./browse-singers.component.css']
})
export class BrowseSingersComponent implements OnInit, AfterViewInit, OnDestroy {
  public rappersSingers: Singer[] = [];
  public bollywoodSingers: Singer[] = [];
  public punjabiSingers: Singer[] = [];
  public sufiSingers: Singer[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private browseSingersService: BrowseSingersService) {}

  ngOnInit(): void {
    this.loadSingersByGenre('Rap');
    this.loadSingersByGenre('Bollywood');
    this.loadSingersByGenre('Punjabi');
    this.loadSingersByGenre('Sufi');
  }

  loadSingersByGenre(genre: string): void {
    const sub = this.browseSingersService.findSingersByGenre(genre).subscribe((singers: Singer[]) => {
      console.log(`Loaded ${genre} singers:`, singers);
      switch (genre) {
        case 'Rap':
          this.rappersSingers = singers;
          break;
        case 'Bollywood':
          this.bollywoodSingers = singers;
          break;
        case 'Punjabi':
          this.punjabiSingers = singers;
          break;
        case 'Sufi':
          this.sufiSingers = singers;
          break;
      }
    });
    this.subscriptions.add(sub); // Add subscription to cleanup list
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCarousels();
      this.initializeSlideshow(); // Initialize slideshow
    }, 500); // Delay to ensure data and DOM are ready
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeCarousels(): void {
    const genres = ['rap', 'bollywood', 'punjabi', 'sufi'];
    genres.forEach(genre => this.initializeCarousel(genre));
  }

  initializeCarousel(genre: string): void {
    const carouselContainer = document.querySelector(`#${genre}-carousel`) as HTMLElement;
    const prevButton = document.querySelector(`#${genre}-prev`) as HTMLElement;
    const nextButton = document.querySelector(`#${genre}-next`) as HTMLElement;

    if (!carouselContainer || !prevButton || !nextButton) {
      console.error(`Failed to initialize carousel for ${genre}. Missing elements.`);
      return;
    }

    let scrollAmount = 0;
    const itemWidth = 250; // Width of carousel items
    const scrollStep = itemWidth + 20; // Item width + margin
    const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;

    prevButton.addEventListener('click', () => {
      scrollAmount = Math.max(scrollAmount - scrollStep, 0);
      carouselContainer.style.transform = `translateX(-${scrollAmount}px)`;
    });

    nextButton.addEventListener('click', () => {
      scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
      carouselContainer.style.transform = `translateX(-${scrollAmount}px)`;
    });
  }

  // Slideshow logic
  initializeSlideshow(): void {
    let slideIndex = 0;
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName('dot') as HTMLCollectionOf<HTMLElement>;

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

      // Update dots
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active-dot');
      }
      if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active-dot');
      }

      setTimeout(showSlides, 3000); // Loop every 3 seconds
    }

    showSlides(); // Start slideshow
  }

  // Function to manually control the slideshow (on dot click)
  currentSlide(n: number): void {
    let slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName('dot') as HTMLCollectionOf<HTMLElement>;
    
    if (n > slides.length) { n = 1 }
    if (n < 1) { n = slides.length }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active-dot";
  }
}
