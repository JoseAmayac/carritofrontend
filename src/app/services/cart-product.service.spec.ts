import { TestBed } from '@angular/core/testing';

import { CartProductService } from './cart-product.service';

describe('CartProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartProductService = TestBed.get(CartProductService);
    expect(service).toBeTruthy();
  });
});
