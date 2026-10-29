import { TestBed } from '@angular/core/testing';
import { WishlistCart } from './wishlist-cart';

describe('WishlistCart', () => {
  let service: WishlistCart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistCart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
