import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.initializeSlideshow();
    this.initializeCategories();
  }

  initializeSlideshow() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    const dotsContainer = document.querySelector('.dots-container') as HTMLElement;
  
    // Ensure the slides and dotsContainer exist before proceeding
    if (!slides || slides.length === 0 || !dotsContainer) {
      console.error('Slides or dots container not found');
      return;
    }
  
    function showSlides() {
      let i;
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
  
        // Ensure dot exists before accessing its classList
        if (dotsContainer.children[i]) {
          (dotsContainer.children[i] as HTMLElement).classList.remove('active');
        }
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
  
      slides[slideIndex - 1].style.display = 'block';
  
      // Ensure dot exists before setting it as active
      if (dotsContainer.children[slideIndex - 1]) {
        (dotsContainer.children[slideIndex - 1] as HTMLElement).classList.add('active');
      }
  
      setTimeout(showSlides, 3000); // Change slide every 3 seconds
    }
  
    // Initialize dots only if dotsContainer is present
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
  
        // Ensure dot exists before modifying it
        if (dotsContainer.children[i]) {
          (dotsContainer.children[i] as HTMLElement).classList.remove('active');
        }
      }
      slides[index].style.display = 'block';
  
      // Ensure dot exists before setting it as active
      if (dotsContainer.children[index]) {
        (dotsContainer.children[index] as HTMLElement).classList.add('active');
      }
      slideIndex = index;
    }
  
    createDots();
    showSlides();
  }
  


  initializeCategories() {
    let currentCategoryIndex = 0;

    (window as any).changeCategory = (direction: number) => {
      const categories = document.querySelectorAll('.category');
      const totalCategories = categories.length;
      categories[currentCategoryIndex].classList.remove('active');

      currentCategoryIndex = (currentCategoryIndex + direction + totalCategories) % totalCategories;
      categories[currentCategoryIndex].classList.add('active');
    };

    // Initialize by showing the first category
    const categories = document.querySelectorAll('.category');
    if (categories.length > 0) {
      categories[0].classList.add('active');
    }
  }
}
