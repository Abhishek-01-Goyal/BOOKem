import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Singer } from '../../models/singer';
import { Router } from '@angular/router';  // Import Router


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  isLoggedIn: boolean = false;
  singer!: Singer;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is logged in via AuthService
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  ngAfterViewInit() {
    this.initializeSlideshowForFeaturedSingers();
    this.initializeCategories();
    this.initializeSlideshowForRapper();
    this.initializeSlideshowForBollywood();
    this.initializeSlideshowForSufi();
    this.initializeSlideshowForPunjabi();
  }
  
  // Featured Singers Slideshow
  initializeSlideshowForFeaturedSingers() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    const dotsContainer = document.querySelector('.dots-container') as HTMLElement;

    if (!slides || slides.length === 0 || !dotsContainer) {
      console.error('Slides or dots container not found');
      return;
    }

    function showSlides() {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        if (dotsContainer.children[i]) {
          (dotsContainer.children[i] as HTMLElement).classList.remove('active');
        }
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      slides[slideIndex - 1].style.display = 'block';
      if (dotsContainer.children[slideIndex - 1]) {
        (dotsContainer.children[slideIndex - 1] as HTMLElement).classList.add('active');
      }

      setTimeout(showSlides, 3000);
    }

    function createDots() {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function showSlide(index: number) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        if (dotsContainer.children[i]) {
          (dotsContainer.children[i] as HTMLElement).classList.remove('active');
        }
      }
      slides[index].style.display = 'block';
      if (dotsContainer.children[index]) {
        (dotsContainer.children[index] as HTMLElement).classList.add('active');
      }
      slideIndex = index;
    }

    createDots();
    showSlides();
  }

  // Category Navigation
  initializeCategories() {
    let currentCategoryIndex = 0;

    (window as any).changeCategory = (direction: number) => {
      const categories = document.querySelectorAll('.category');
      const totalCategories = categories.length;
      categories[currentCategoryIndex].classList.remove('active');

      currentCategoryIndex = (currentCategoryIndex + direction + totalCategories) % totalCategories;
      categories[currentCategoryIndex].classList.add('active');
    };

    const categories = document.querySelectorAll('.category');
    if (categories.length > 0) {
      categories[0].classList.add('active');
    }
  }

  // Rapper Slideshow
  initializeSlideshowForRapper() {
    this.createSlideshow('rapper-slides', 'rapper-dots-container');
  }

  // Bollywood Slideshow
  initializeSlideshowForBollywood() {
    this.createSlideshow('bollywood-slides', 'bollywood-dots-container');
  }

  // Sufi Slideshow
  initializeSlideshowForSufi() {
    this.createSlideshow('sufi-slides', 'sufi-dots-container');
  }

  // Punjabi Slideshow
  initializeSlideshowForPunjabi() {
    this.createSlideshow('punjabi-slides', 'punjabi-dots-container');
  }

  // Generic Slideshow Function
  createSlideshow(slideClass: string, dotContainerClass: string) {
    let slideIndex = 0;
    const slides = document.getElementsByClassName(slideClass) as HTMLCollectionOf<HTMLElement>;
    const dotsContainer = document.querySelector(`.${dotContainerClass}`) as HTMLElement;

    if (!slides || slides.length === 0 || !dotsContainer) {
      console.error('Slides or dots container not found');
      return;
    }

    function showSlides() {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        if (dotsContainer.children[i]) {
          (dotsContainer.children[i] as HTMLElement).classList.remove('active');
        }
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      slides[slideIndex - 1].style.display = 'block';
      if (dotsContainer.children[slideIndex - 1]) {
        (dotsContainer.children[slideIndex - 1] as HTMLElement).classList.add('active');
      }

      setTimeout(showSlides, 3000);
    }

    function createDots() {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function showSlide(index: number) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        if (dotsContainer.children[i]) {
          (dotsContainer.children[i] as HTMLElement).classList.remove('active');
        }
      }
      slides[index].style.display = 'block';
      if (dotsContainer.children[index]) {
        (dotsContainer.children[index] as HTMLElement).classList.add('active');
      }
      slideIndex = index;
    }

    createDots();
    showSlides();
  }

  // Navigate to the landing page
  goToLandingPage(): void {
    this.router.navigate(['/landing-page']); // Assuming '/landing' is the route for the landing page
  }

}
