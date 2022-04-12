import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderServiceService} from '../../service/order-service.service';
import {TokenService} from '../../service/token.service';
import {Orders} from '../../model/orders';
import {HttpErrorResponse} from '@angular/common/http';
import {OrderDetail} from '../../model/order-detail';
import {CartDetail} from '../../model/cart-detail';
import {RateProduct} from '../../model/rate-product';
import {Rate} from '../../model/rate';

@Component({
  selector: 'app-order-buyer',
  templateUrl: './order-buyer.component.html',
  styleUrls: ['./order-buyer.component.scss']
})
export class OrderBuyerComponent implements OnInit,AfterViewInit {
  rate:Rate;
  @ViewChild("rating") rating:ElementRef;
  checkLoad= false;
  orderList:Orders[];
  orderCurrent:Orders;
  cancelOrder: OrderDetail[];
  orderDetailList:OrderDetail[];
  orderDetailListEdit:OrderDetail[];
  checkOrder = false;
  constructor(private orderService:OrderServiceService, private tokenService:TokenService) {
    this.getListOrder(0);
  }

  ngAfterViewInit(): void {

    }

  ngOnInit(): void {

  }
  getListOrder(page:number){
    this.orderService.getListOrderBuyer(this.tokenService.getUserNameKey().toLowerCase(),page).subscribe(
      (response)=>{
        console.log("response");
        console.log(response);
        this.orderList = response['content'];
        this.totalPages = response['totalPages']
        console.log(this.orderList);
        console.log("this.orderList");
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  page:number = 0;
  totalPages : number = 1
  nextPage():void{
    this.page++
    this.getListOrder(this.page)
    if(this.page > this.totalPages-1){
      this.page = this.totalPages-1
      console.log('page')
      console.log(this.page)
      this.getListOrder(this.page)
    }

  }
  backPage():void{

    if(this.page >0){
      this.page --;
      this.getListOrder(this.page)
      console.log(this.page)
    }

  }
  getListOrderDetailById(id:number){
    this.orderService.getListOrderDetailByOrderId(id).subscribe((response)=>{
        this.orderDetailListEdit = response;
        console.log("this.orderDetailList trong get list");
        console.log(this.orderDetailList);
        this.checkLoad = true;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      })
  }
  getListOrderDetailById2(id:number){
    this.orderService.getListOrderDetailByOrderId(id).subscribe((response)=>{
        this.orderDetailList = response;
        console.log("this.orderDetailList trong get list");
        console.log(this.orderDetailList);
        this.checkOrder = true;
        console.log("co vao day ko ");

      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      })
  }
  createRateProduct(rateProduct:RateProduct):void{
    this.orderService.createRateProduct(rateProduct).subscribe(
      (response)=>{
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onOpenModal(order: Orders, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.orderCurrent = order;
      // @ts-ignore
       this.getListOrderDetailById2(order.id);
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      // @ts-ignore
       this.getListOrderDetailById(order.id);
      console.log("this.orderDetailList");
      console.log(this.orderDetailListEdit);
      console.log("this.checkLoad");
      console.log(this.checkLoad);
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {
      // @ts-ignore
      this.cancelOrder = order;
      console.log("this.cancelOrder");
      console.log(this.cancelOrder);
      button.setAttribute('data-target', '#deleteProductModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  getTotalBillByPm(orderDetails: OrderDetail[]):number{
    let sum = 0;
    for (const cartDeatail of orderDetails) {
      sum+= (cartDeatail.quantity*cartDeatail.product.priceSale)
    }
    return sum;
  }
  getRateByOrderId(id:any){
    this.orderService.getRate(id).subscribe(
      (response)=>{
        this.rate = response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  onDeleteProduct(cancelOrder: OrderDetail[]) {
    console.log("cancelOrder");
    console.log(cancelOrder);
  }

  createRate(orderCurrent: Orders) {
    const radios = this.rating.nativeElement.elements.rating.value;
    // @ts-ignore
    this.orderService.getListOrderDetailByOrderId(orderCurrent.id).subscribe((response)=>{
        let orderDetailList = response;
        for (const cartDetail of orderDetailList) {
          this.createRateProduct(new RateProduct(orderCurrent,cartDetail.product,new Rate(radios,radios)))
        }
        window.location.reload();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      })
    // @ts-ignore

  }
}
