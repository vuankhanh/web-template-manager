import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { ProductCategory } from '../../../../Interfaces/ProductCategory';

import { ConvertVieService } from 'src/app/services/convert-vie.service';
import { ProductCategoryService } from 'src/app/services/api/product-category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { ResponseLogin } from 'src/app/services/api/login.service';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-product-category-modify',
  templateUrl: './product-category-modify.page.html',
  styleUrls: ['./product-category-modify.page.scss'],
})
export class ProductCategoryModifyPage implements OnInit {
  @Input() type:string;
  @Input() data: ProductCategory;
  productCategoryForm: FormGroup;
  params: Params;
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
    console.log(this.type);
    console.log(this.data);
    if(this.type){
      this.params = {
        type: <'update' | 'insert'>this.type,
        data: <ProductCategory>this.data
      }
      this.initForm(this.params.data);
    }
  }

  initForm(data: ProductCategory | null){
    this.productCategoryForm = this.formBuilder.group({
      name: [data && data!.name ? data!.name : '', Validators.required],
      route: [data && data!.route ? data!.route : '', Validators.required],
    })
  }

  nameControlChange(event: CustomEvent){
    let newNameControlValue: string = this.convertVieService.removeVietnameseTones(event.detail.value);
    let route = newNameControlValue.split(' ').join('-');
    this.productCategoryForm.controls['route'].setValue(route.toLocaleLowerCase());
  }

  modify(){
    if(this.params.type === 'insert'){
      this.insert();
    }else if(this.params.type === 'update'){
      this.update();
    }
  }

  update(){
    if(this.productCategoryForm.valid){
      let productCategory: ProductCategory = {
        _id: this.params.data._id,
        name: this.productCategoryForm.value.name,
        route: this.productCategoryForm.value.route
      }

      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productCategoryService.update(accessToken, productCategory).subscribe(res=>{
          if(res){
            this.toastService.shortToastSuccess('Đã cập nhật Danh mục sản phẩm', 'Thành công').then(_=>{
              this.params = {
                type: <'update' | 'insert'>this.type,
                data: res
              }
              this.modalController.dismiss(this.params);
            });
          }else{
            this.toastService.shortToastWarning('Danh mục đã bị xóa', '');
          }
        },error=>{
          console.log(error);
          if(error.status === 409){
            this.toastService.shortToastError('Danh mục này đã tồn tại', 'Thất bại');
          }else{
            this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại');
          }
        })
      }else{
        this.toastService.shortToastWarning('Phiên đăng nhập của bạn đã hết hạn', 'Đăng nhập lại');
      }
    }
  }

  insert(){
    if(this.productCategoryForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productCategoryService.insert(accessToken, this.productCategoryForm.value).subscribe(res=>{
          console.log(res);
          this.toastService.shortToastSuccess('Đã thêm một Danh mục sản phẩm', 'Thành công').then(_=>{
            this.params = {
              type: <'update' | 'insert'>this.type,
              data: res
            }
            this.modalController.dismiss(this.params);
          });
        },error=>{
          console.log(error);
          if(error.status === 409){
            this.toastService.shortToastError('Danh mục này đã tồn tại', 'Thất bại');
          }else{
            this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại');
          }
        })
      }else{
        this.toastService.shortToastWarning('Phiên đăng nhập của bạn đã hết hạn', 'Đăng nhập lại');
      }
    }
  }

}

interface Params{
  type: 'insert' | 'update',
  data: ProductCategory
}