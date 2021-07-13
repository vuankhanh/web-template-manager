import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Media, ProductGallery } from 'src/app/Interfaces/ProductGallery';
import { WillUpload } from 'src/app/Interfaces/WillUpload';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { ProductCategoryService } from 'src/app/services/api/product-category.service';
import { ProductGalleryService } from 'src/app/services/api/product-gallery.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-product-gallery-modify',
  templateUrl: './product-gallery-modify.page.html',
  styleUrls: ['./product-gallery-modify.page.scss'],
})
export class ProductGalleryModifyPage implements OnInit {
  @Input() type:string;
  @Input() data: ProductGallery;
  productGalleryForm: FormGroup;
  params: Params;

  fileList: FileList;
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private productGalleryService: ProductGalleryService,
    private toastService: ToastService
  ) {
    
  }

  ngOnInit() {
    if(this.type){
      const data = JSON.parse(JSON.stringify(this.data));
      this.params = {
        type: <'update' | 'insert'>this.type,
        data: <ProductGallery>data
      };
      
      this.initForm(this.params.data);
    }
  }

  initForm(productGallery: ProductGallery | null){
    if(productGallery){
      let isMain: number = productGallery?.media?.findIndex(media=>media.isMain) | 0;
      this.productGalleryForm = this.formBuilder.group({
        name: [productGallery && productGallery!.productName ? productGallery!.productName : '', Validators.required],
        media: [productGallery && productGallery!.media ? productGallery!.media : []],
        willUpload: [[]],
        isMain: [isMain, Validators.required]
      });
    }
    
  }

  async onFileSelect(event: Event){
    let target: HTMLInputElement = <HTMLInputElement>event.target;
    let files = target.files;
    if (files.length > 0) {
      this.productGalleryForm.controls['willUpload'].setValue(files);
      for(let i = 0; i< this.productGalleryForm.value.willUpload.length; i++){
        this.productGalleryForm.value.willUpload[i].base64 = await this.previewImage(files[i]);
      }
    }
  }

  previewImage(file: File){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  changeMain(event){
    console.log(event);
    this.productGalleryForm.controls['isMain'].setValue(event);
  }

  removeImage(image: Media){
    let listMedia: Array<Media> = <Array<Media>>this.productGalleryForm.value.media;
    let index = listMedia.findIndex(media=>media._id === image._id);
    if(!isNaN(index)){
      listMedia.splice(index, 1);
    }
    this.productGalleryForm.controls['media'].setValue(listMedia);
    this.productGalleryForm.controls['isMain'].setValue(0);
  }

  removeWillUpload(index: number){
    console.log(index);
    let listWillUpload: Array<WillUpload> = <Array<WillUpload>>Array.from(this.productGalleryForm.value.willUpload);
    
    listWillUpload.splice(index, 1);
    this.productGalleryForm.controls['willUpload'].setValue(listWillUpload);
    console.log(listWillUpload);
  }

  modify(){
    if(this.params.type === 'insert'){
      this.insert();
    }else if(this.params.type === 'update'){
      this.update();
    }
  }

  update(){
    if(this.productGalleryForm.valid){
      let productGallery: ProductGallery = {
        _id: this.params.data._id,
        ...this.productGalleryForm.value
      }

      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productGalleryService.update(accessToken, productGallery).subscribe(res=>{
          if(res){
            this.toastService.shortToastSuccess('Đã cập nhật Thư viện Sản Phẩm', 'Thành công').then(_=>{
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
    if(this.productGalleryForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productGalleryService.insert(accessToken, this.productGalleryForm.value).subscribe(res=>{
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
  data: ProductGallery
}
