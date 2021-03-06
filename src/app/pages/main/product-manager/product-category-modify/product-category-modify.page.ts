import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { ProductCategory } from '../../../../Interfaces/ProductCategory';

import { ConvertVieService } from 'src/app/services/convert-vie.service';
import { ProductCategoryService } from 'src/app/services/api/product-category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { ResponseLogin } from 'src/app/services/api/login.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-category-modify',
  templateUrl: './product-category-modify.page.html',
  styleUrls: ['./product-category-modify.page.scss'],
})
export class ProductCategoryModifyPage implements OnInit, OnDestroy {
  @Input() productCategory: ProductCategory;
  productCategoryForm: FormGroup;

  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private convertVieService: ConvertVieService,
    private productCategoryService: ProductCategoryService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) {
    
  }

  ngOnInit() {
    this.initForm(this.productCategory);
  }

  initForm(productCategory?: ProductCategory){
    this.productCategoryForm = this.formBuilder.group({
      name: [productCategory ? productCategory.name : '', Validators.required],
      route: [productCategory ? productCategory.route : '', Validators.required],
      googleProductCategory: [productCategory ? productCategory.googleProductCategory : '', Validators.required]
    })
  }

  nameControlChange(){
    let valueName = this.productCategoryForm.value.name;
    let newNameControlValue: string = this.convertVieService.removeVietnameseTones(valueName);
    let route = newNameControlValue.split(' ').join('-');
    this.productCategoryForm.controls['route'].setValue(route.toLocaleLowerCase());
  }

  modify(){
    if(!this.productCategory){
      this.insert();
    }else{
      this.update();
    }
  }

  update(){
    if(this.productCategoryForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        let productCategory: ProductCategory = {
          _id: this.productCategory._id,
          ...this.productCategoryForm.value
        };
        this.subscription.add(
          this.productCategoryService.update(accessToken, productCategory).subscribe(res=>{
            if(res){
              this.toastService.shortToastSuccess('???? c???p nh???t Danh m???c s???n ph???m', 'Th??nh c??ng').then(_=>{
                this.modalController.dismiss(res);
              });
            }else{
              this.toastService.shortToastWarning('Danh m???c ???? b??? x??a', '');
            }
          },error=>{
            if(error.status === 409){
              this.toastService.shortToastError('Danh m???c n??y ???? t???n t???i', 'Th???t b???i');
            }else{
              this.toastService.shortToastError('???? c?? l???i x???y ra', 'Th???t b???i');
            }
          })
        )
      }else{
        this.toastService.shortToastWarning('Phi??n ????ng nh???p c???a b???n ???? h???t h???n', '????ng nh???p l???i');
      }
    }
  }

  insert(){
    if(this.productCategoryForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.subscription.add(
          this.productCategoryService.insert(accessToken, this.productCategoryForm.value).subscribe(res=>{
            this.toastService.shortToastSuccess('???? th??m m???t Danh m???c s???n ph???m', 'Th??nh c??ng').then(_=>{
              this.modalController.dismiss(res);
            });
          },error=>{
            if(error.status === 409){
              this.toastService.shortToastError('Danh m???c n??y ???? t???n t???i', 'Th???t b???i');
            }else{
              this.toastService.shortToastError('???? c?? l???i x???y ra', 'Th???t b???i');
            }
          })
        )
      }else{
        this.toastService.shortToastWarning('Phi??n ????ng nh???p c???a b???n ???? h???t h???n', '????ng nh???p l???i');
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}