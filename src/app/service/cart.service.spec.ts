import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTotalPrice', () => {
    it('should return 0 for empty cart', () => {
      expect(service.getTotalPrice()).toBe(0);
    });

    it('should calculate total price correctly using reduce', () => {
      service.addtoCart({ id: 1, total: 10 });
      service.addtoCart({ id: 2, total: 20 });
      service.addtoCart({ id: 3, total: 15 });
      expect(service.getTotalPrice()).toBe(45);
    });

    it('should handle decimal prices', () => {
      service.addtoCart({ id: 1, total: 10.99 });
      service.addtoCart({ id: 2, total: 20.50 });
      expect(service.getTotalPrice()).toBeCloseTo(31.49, 2);
    });
  });

  describe('removeCartItem', () => {
    it('should remove item by id using findIndex', () => {
      const item1 = { id: 1, total: 10 };
      const item2 = { id: 2, total: 20 };
      const item3 = { id: 3, total: 15 };
      
      service.addtoCart(item1);
      service.addtoCart(item2);
      service.addtoCart(item3);
      
      service.removeCartItem(item2);
      
      expect(service.getTotalPrice()).toBe(25);
      expect(service.cartItemList.length).toBe(2);
      expect(service.cartItemList.find((item: any) => item.id === 2)).toBeUndefined();
    });

    it('should handle removing non-existent item', () => {
      const item1 = { id: 1, total: 10 };
      service.addtoCart(item1);
      
      const nonExistent = { id: 999, total: 50 };
      service.removeCartItem(nonExistent);
      
      expect(service.getTotalPrice()).toBe(10);
      expect(service.cartItemList.length).toBe(1);
    });
  });

  describe('addtoCart', () => {
    it('should add item to cart and update observable', (done) => {
      const item = { id: 1, total: 10 };
      
      service.getProducts().subscribe(products => {
        if (products.length > 0) {
          expect(products.length).toBe(1);
          expect(products[0]).toEqual(item);
          done();
        }
      });
      
      service.addtoCart(item);
    });
  });

  describe('removeAllCart', () => {
    it('should clear all items from cart', () => {
      service.addtoCart({ id: 1, total: 10 });
      service.addtoCart({ id: 2, total: 20 });
      
      service.removeAllCart();
      
      expect(service.getTotalPrice()).toBe(0);
      expect(service.cartItemList.length).toBe(0);
    });
  });
});
