import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  private subscriptions: Subscription = new Subscription();
  
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.api.getProduct()
      .subscribe(res=>{
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a:any) => {
          if(a.category ==="women's clothing" || a.category ==="men's clothing"){
            a.category ="fashion"
          }
          Object.assign(a,{quantity:1,total:a.price});
        });
      })
    );

    this.subscriptions.add(
      this.cartService.search.subscribe((val:any)=>{
        this.searchKey = val;
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  
  filter(category:string){
    this.filterCategory = category === '' 
      ? this.productList 
      : this.productList.filter((a:any) => a.category === category);
  }

}
