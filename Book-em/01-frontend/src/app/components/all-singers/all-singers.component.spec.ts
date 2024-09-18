import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSingersComponent } from './all-singers.component';

describe('AllSingersComponent', () => {
  let component: AllSingersComponent;
  let fixture: ComponentFixture<AllSingersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllSingersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
