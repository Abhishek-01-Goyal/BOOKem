import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerCategoriesComponent } from './singer-categories.component';

describe('SingerCategoriesComponent', () => {
  let component: SingerCategoriesComponent;
  let fixture: ComponentFixture<SingerCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingerCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingerCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
