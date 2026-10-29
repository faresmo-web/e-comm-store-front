import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Wishlists } from './wishlists';

describe('Wishlists', () => {
  let component: Wishlists;
  let fixture: ComponentFixture<Wishlists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wishlists],
    }).compileComponents();

    fixture = TestBed.createComponent(Wishlists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
