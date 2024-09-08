import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSingersComponent } from './featured-singers.component';

describe('FeaturedSingersComponent', () => {
  let component: FeaturedSingersComponent;
  let fixture: ComponentFixture<FeaturedSingersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedSingersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedSingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
