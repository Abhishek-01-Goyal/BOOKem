import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSingersComponent } from './genre-singers.component';

describe('GenreSingersComponent', () => {
  let component: GenreSingersComponent;
  let fixture: ComponentFixture<GenreSingersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreSingersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreSingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
