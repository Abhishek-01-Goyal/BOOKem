import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.css']
})
export class SingersComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.initializeSlideshow();
  }

  initializeSlideshow() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    const dotsContainer = document.querySelector('.dots-container') as HTMLElement;

    if (!dotsContainer || slides.length === 0) {
      console.error('Dots container or slides not found');
      return;
    }

    function showSlides() {
      // Hide all slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active', 'previous');
      }

      // Set the current slide as previous and move it out of view
      const previousSlideIndex = slideIndex;
      slides[previousSlideIndex].classList.add('previous');

      // Increment the slide index
      slideIndex++;
      if (slideIndex >= slides.length) {
        slideIndex = 0; // Loop back to the first slide
      }

      // Set the new slide as active
      slides[slideIndex].classList.add('active');

      // Update the dots
      updateDots();

      // Continue the slideshow every 3 seconds
      setTimeout(showSlides, 3000);
    }

    // Update the dots based on the active slide
    function updateDots() {
      for (let i = 0; i < dotsContainer.children.length; i++) {
        (dotsContainer.children[i] as HTMLElement).classList.remove('active-dot');
      }
      (dotsContainer.children[slideIndex] as HTMLElement).classList.add('active-dot');
    }

    // Initialize dots
    function createDots() {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active-dot');
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    // Show a specific slide when a dot is clicked
    function showSlide(index: number) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active', 'previous');
      }
      slides[slideIndex].classList.add('previous');
      slideIndex = index;
      slides[slideIndex].classList.add('active');
      updateDots();
    }

    // Start the slideshow and create dots
    createDots();
    showSlides();
  }
}
