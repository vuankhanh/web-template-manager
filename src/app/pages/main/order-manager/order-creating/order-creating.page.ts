import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ProductSearchPage } from '../modal/product-search/product-search.page';

import { Address, District, Province, Ward } from 'src/app/Interfaces/Address';
import { Product } from 'src/app/Interfaces/Product';

import { arrayNotEmpty } from '../../../../services/formCustom/validators';
import { AdministrativeUnitsService } from 'src/app/services/api/administrative-units.service';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';

import { Subscription } from 'rxjs';
import { BodyInsert, OrderService } from 'src/app/services/api/order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-creating',
  templateUrl: './order-creating.page.html',
  styleUrls: ['./order-creating.page.scss'],
})
export class OrderCreatingPage implements OnInit, OnDestroy {
  formGroup: FormGroup;

  provinces: Array<Province> = [];
  districts: Array<District> = [];
  wards: Array<Ward> = [];

  products: Array<Product> = [];

  subscription: Subscription = new Subscription();
  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private administrativeUnitsService: AdministrativeUnitsService,
    private orderSerivce: OrderService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getProvince();
  }

  initForm(){
    let phoneNumberRegEx = /((0)+([0-9]{9})\b)/g;
    this.formGroup = this.formBuilder.group({
      receiver: this.formBuilder.group({
        responsiblePerson: ['', Validators.required],
        phoneNumber: ['', { validators: [Validators.required, , Validators.pattern(phoneNumberRegEx)], updateOn: 'blur' }],
        street: ['', Validators.required],
        ward: ['', Validators.required],
        district: ['', Validators.required],
        province: ['', Validators.required],
        position: this.formBuilder.group({
          lat: [''],
          lng: ['']
        }),
        isHeadquarters: [false, Validators.required],
      }),
      products: [[], arrayNotEmpty()]
    })
  }

  get getReceiverFormGroup(): FormGroup{
    return this.formGroup.get('receiver') as FormGroup;
  }

  setProductFormArray(products: Array<Product>){
    this.formGroup.get('products').setValue(products);
  }

  

  getProvince(){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getProvince(tokenStoraged.accessToken).subscribe(res=>{
          this.provinces = res;
        })
      )
    }
  }

  getDistrict(provinceCode: string){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getDistrict(tokenStoraged.accessToken, provinceCode).subscribe(res=>{
          this.districts = res;
        }, error=>{
          this.districts = [];
        })
      )
    }
  }

  getWard(districtCode: string){
    let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged){
      this.subscription.add(
        this.administrativeUnitsService.getWard(tokenStoraged.accessToken, districtCode).subscribe(res=>{
          this.wards = res;
        }, error=>{
          this.wards = [];
        })
      )
    }
  }

  provinceChange(){
    let valueProvince: number = parseInt(this.getReceiverFormGroup.controls['province'].value);
    let province: Province = this.provinces[valueProvince];
    this.getDistrict(province.code);
    this.getReceiverFormGroup.controls['district'].setValue(null);
    this.getReceiverFormGroup.controls['ward'].setValue(null);
  }

  districtChange(){
    let valueDistrict: number = parseInt(this.getReceiverFormGroup.controls['district'].value);
    if(!isNaN(valueDistrict)){
      let district: District = this.districts[valueDistrict];
      this.getWard(district.code);
      this.getReceiverFormGroup.controls['ward'].setValue(null);
    }
  }

  async openProductSearchModal(){
    const modal = await this.modalController.create({
      component: ProductSearchPage
    });
    modal.present();

    const data = await modal.onDidDismiss();

    let product: Product = data.data;
    if(product){
      product.quantity = 1;
      console.log();
      if(!this.products.some(pro=>pro._id === product._id)){
        this.products.push(product);
        this.setProductFormArray(this.products);
      }else{
        this.toastService.shortToastWarning('Mặt hàng này đã được chọn','');
      }
    }
    
  }

  changeQuantity(increase: boolean, index: number){
    if(increase){
      this.products[index].quantity!++;
    }else{
      if(this.products[index].quantity! > 1){
        this.products[index].quantity!--;
      }
    }
    this.setProductFormArray(this.products);
  }

  quantityInputChange(value: any, index: number){
    if(value){
      this.products[index].quantity = parseInt(value);
    }
    this.setProductFormArray(this.products);
  }

  removeProduct(index: number){
    this.products.splice(index, 1);
    this.setProductFormArray(this.products);
  }

  createOrder(){
    if(this.formGroup.valid){
      let address: Address = {
        responsiblePerson: this.getReceiverFormGroup.value.responsiblePerson,
        phoneNumber: this.getReceiverFormGroup.value.phoneNumber,
        street: this.getReceiverFormGroup.value.street,
        province: this.provinces[this.getReceiverFormGroup.value.province],
        district: this.districts[this.getReceiverFormGroup.value.district],
        ward: this.wards[this.getReceiverFormGroup.value.ward],
        position: this.getReceiverFormGroup.value.position,
        isHeadquarters: this.getReceiverFormGroup.value.isHeadquarters,
      } 

      let products: Array<Product> = this.formGroup.value.products.map(product=>{
        return { _id: product._id, quantity: product.quantity }
      });

      let bodyRequest: BodyInsert = {
        deliverTo: address,
        products
      }
      
      let tokenStoraged: ResponseLogin = <ResponseLogin>this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged){
        this.subscription.add(
          this.orderSerivce.insert(tokenStoraged.accessToken, bodyRequest).subscribe(res=>{
            if(res){
              this.toastService.shortToastSuccess('Tạo đơn hàng thành công', 'Thành công');
              this.router.navigate(['/main/order-manager/order-processing', res._id]);
            }else{
              this.toastService.shortToastWarning('Chưa tạo đơn hàng thành công','');
            }
          },err=>this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại'))
        )
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
