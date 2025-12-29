import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public totalItem : number = 0;
  public searchTerm !: string;
  private subscription: Subscription = new Subscription();
  
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }
}