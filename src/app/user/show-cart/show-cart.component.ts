// @ts-ignore

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenService} from '../../service/token.service';
import * as $ from 'jquery';
// @ts-ignore
import {OrderPMs} from '../../model/OrderPMs';
import {CartDetail} from '../../model/cart-detail';
import {User} from '../../model/user';
import {FormGroup} from '@angular/forms';
import {OrderServiceService} from '../../service/order-service.service';
import {OrderForm} from '../../model/OrderForm';
import {Orders} from '../../model/orders';
import {HttpErrorResponse} from '@angular/common/http';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.scss'],

})
export class ShowCartComponent implements OnInit, AfterViewInit {
  address:string;
  quantityEdit: any;
  userPm = null;
  billTotal :number;
  @ViewChild('fullPrice') fullPrice: ElementRef;
  cartDetails: CartDetail[] = this.tokenService.getListCardDetail();

  constructor(private tokenService: TokenService, private orderService:OrderServiceService,private router:Router) {
    this.address = this.tokenService.getAddressKey();

  }

  orderPmList: OrderPMs[] = [];
  orderPm: OrderPMs = null;

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    // this.showCart();
    this.getUsersPm();

  }

  //5 a b  c d e
  //nha 1 : listcartdeatail  ab (product , quantity )
  //nha 2 : liscart c
  //nha 3 : liscart  de

  showCart() {
    var check = false;

    function changeVal(el) {
      var qt = parseFloat(el.parent().children('.qt').html());
      var price = parseFloat(el.parent().children('.price').html());
      var eq = Math.round(price * qt * 100) / 100;

      el.parent().children('.full-price').html(eq + '€');

      changeTotal();
    }

    function changeTotal() {

      var price = 0;

      $('.full-price').each(function(index) {
        price += parseFloat($('.full-price').eq(index).html());
      });

      price = Math.round(price * 100) / 100;
      var tax = Math.round(price * 0.05 * 100) / 100;
      var shipping = parseFloat($('.shipping span').html());
      var fullPrice = Math.round((price + tax + shipping) * 100) / 100;

      if (price == 0) {
        fullPrice = 0;
      }

      // @ts-ignore
      $('.subtotal span').html(price);
      // @ts-ignore
      $('.tax span').html(tax);
      // @ts-ignore
      $('.total span').html(fullPrice);
    }

    $(document).ready(function() {

      $('.remove').click(function() {
        var el = $(this);
        el.parent().parent().addClass('removed');
        window.setTimeout(
          function() {
            el.parent().parent().slideUp('fast', function() {
              el.parent().parent().remove();
              if ($('.product').length == 0) {
                if (check) {
                  $('#cart').html('<h1>The shop does not function, yet!</h1><p>If you liked my shopping cart, please take a second and heart this Pen on <a href=\'https://codepen.io/ziga-miklic/pen/xhpob\'>CodePen</a>. Thank you!</p>');
                } else {
                  $('#cart').html('<h1>No products!</h1>');
                }
              }
              changeTotal();
            });
          }, 200);
      });

      $('.qt-plus').click(function() {
        // @ts-ignore
        $(this).parent().children('.qt').html(parseInt($(this).parent().children('.qt').html()) + 1);

        $(this).parent().children('.full-price').addClass('added');

        var el = $(this);
        window.setTimeout(function() {
          el.parent().children('.full-price').removeClass('added');
          changeVal(el);
        }, 150);
      });

      $('.qt-minus').click(function() {

        let child = $(this).parent().children('.qt');

        if (parseInt(child.html()) > 1) {
          // @ts-ignore
          child.html(parseInt(child.html()) - 1);
        }

        $(this).parent().children('.full-price').addClass('minused');

        var el = $(this);
        window.setTimeout(function() {
          el.parent().children('.full-price').removeClass('minused');
          changeVal(el);
        }, 150);
      });

      window.setTimeout(function() {
        $('.is-open').removeClass('is-open');
      }, 1200);

      $('.btn').click(function() {
        check = true;
        $('.remove').click();
      });
    });
  }

  getUsersPm(): User[] {
    this.cartDetails = this.tokenService.getListCardDetail();
    if (this.cartDetails !== null) {
      for (let i = 0; i < this.cartDetails.length; i++) {
        if (this.userPm !== null) {
          let check = true;
          for (let j = 0; j < this.userPm.length; j++) {
            if (this.userPm[j] !== null) {
              if (this.cartDetails[i].product.user.id == this.userPm[j].id) {
                check = false;
                break;
              }
            }
          }
          if (check) {
            this.userPm.push(this.cartDetails[i].product.user);
          }
        } else {
          this.userPm = [];
          this.userPm.push(this.cartDetails[i].product.user);
        }
      }
      console.log('this.userPm');
      console.log(this.userPm);
      if (this.userPm !== null) {
        for (let g = 0; g < this.userPm.length; g++) {
          for (let h = 0; h < this.cartDetails.length; h++) {
            if (this.cartDetails[h].product.user.id == this.userPm[g].id) {
              if (this.orderPm !== null) {
                this.orderPm.cartDetails.push(this.cartDetails[h]);
                this.orderPm.usernameSaler = this.userPm[g].username;
              } else {
                this.orderPm = new OrderPMs([], null,0,"","");
                this.orderPm.cartDetails.push(this.cartDetails[h]);
                this.orderPm.usernameSaler = this.userPm[g].username;
              }
            }
          }

          this.orderPmList.push(this.orderPm);
          this.orderPm = null;
        }
        console.log('this.orderPmList');
        console.log(this.orderPmList);
        this.userPm = null;
      }
    } else {
      return;
    }
  }


  updateCart(cartDetail: CartDetail, quantityEdit, indexListOrderPMs, indexOrderPmsCartdetail) {
    console.log('cartDetail');
    console.log(cartDetail);
    console.log('quantityEdit');
    console.log(quantityEdit);
    this.cartDetails = this.tokenService.getListCardDetail();
    if (quantityEdit >= 1) {
      if (quantityEdit < cartDetail.product.quantityMax) {
        this.orderPmList[indexListOrderPMs].cartDetails[indexOrderPmsCartdetail].quantity = quantityEdit;
      } else {
        this.orderPmList[indexListOrderPMs].cartDetails[indexOrderPmsCartdetail].quantity = cartDetail.product.quantityMax;
        alert('Quantity Available' + cartDetail.product.quantityMax);
      }
      for (const cartDetailE of this.cartDetails) {
        if (cartDetailE.product.id == cartDetail.product.id) {
          if (quantityEdit < cartDetailE.product.quantityMax) {
            cartDetailE.quantity = quantityEdit;
          } else {
            cartDetailE.quantity = cartDetailE.product.quantityMax;
          }
        }
      }
      this.tokenService.setListCardDetail(this.cartDetails);
      console.log("this.tokenService.getListCardDetail()");
      console.log(this.tokenService.getListCardDetail());
      this.tokenService.changeQuantityCart(this.tokenService.getQuantityCartProduct());
    }else {
      this.orderPmList[indexListOrderPMs].cartDetails.splice(indexOrderPmsCartdetail,1);
      let index  = -1 ;
      for (let i = 0; i < this.cartDetails.length; i++) {
        if(cartDetail.product.id == this.cartDetails[i].product.id){
          index = i;
        }
      }
      if(index >-1 ){
        this.cartDetails.splice(index,1);
      }
      console.log("this.cartDetails");
      console.log(this.cartDetails);
      this.tokenService.setListCardDetail(this.cartDetails);
      this.tokenService.changeQuantityCart(this.tokenService.getQuantityCartProduct());
    }
    console.log(this.cartDetails);
    console.log(this.orderPmList);
  }
  getTotalBillByPm(cartDeatails:CartDetail[]):number{
    let sum = 0;
    for (const cartDeatail of cartDeatails) {
      sum+= (cartDeatail.quantity*cartDeatail.product.priceSale)
    }
    return sum;
  }
  createOrders (orderPms:OrderPMs[]){
    for (const orderPm1 of orderPms) {
        orderPm1.usernameBuyer = this.tokenService.getUserNameKey();
        orderPm1.address_ship = this.address;
        orderPm1.billTotal = this.getTotalBillByPm(orderPm1.cartDetails);
        this.orderService.createOrder(orderPm1).subscribe((data)=>{
          console.log("Create order successful");
          console.log(data);

        },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }
          )
    }
    this.cartDetails = null;
    this.tokenService.setListCardDetail(this.cartDetails);
    this.router.navigate(["user/showOrders"]).then(() => {
      window.location.reload();
    });
  }

  getTotalBill(orderPmList: OrderPMs[]) {
    let sum = 0;
    for (const orderPM of orderPmList) {
      sum += this.getTotalBillByPm(orderPM.cartDetails);
    }
    return sum;
  }
}
