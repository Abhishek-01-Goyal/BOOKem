import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSingersComponent } from './browse-singers.component';

describe('BrowseSingersComponent', () => {
  let component: BrowseSingersComponent;
  let fixture: ComponentFixture<BrowseSingersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowseSingersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseSingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
