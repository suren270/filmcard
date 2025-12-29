import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public products : any = [];
  public grandTotal !: number;
  private subscription: Subscription = new Subscription();
  
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  
  emptycart(){
    this.cartService.removeAllCart();
  }

}
