import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselSlider } from './carousel-slider';

describe('CarouselSlider', () => {
  let component: CarouselSlider;
  let fixture: ComponentFixture<CarouselSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
