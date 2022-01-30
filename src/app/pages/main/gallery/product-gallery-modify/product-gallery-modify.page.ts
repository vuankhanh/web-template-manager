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

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-gallery-modify',
  templateUrl: './product-gallery-modify.page.html',
  styleUrls: ['./product-gallery-modify.page.scss'],
})
export class ProductGalleryModifyPage implements OnInit {
  @Input() productGalleryId: string | 'new';

  productGalleryForm: FormGroup;

  fileList: FileList;

  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private productGalleryService: ProductGalleryService,
    private toastService: ToastService
  ) {
    
  }

  ngOnInit() {
    if(this.productGalleryId === 'new'){
      this.initForm();
    }else{
      this.getDetail(this.productGalleryId);
    }
  }

  getDetail(id: string){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryService.getDetail(tokenStoraged.accessToken, id).subscribe(res=>{
          this.initForm(res);
        },err=>{
        })
      )
    }
  }

  initForm(productGallery?: ProductGallery){
    let isMain: number = productGallery ? productGallery.media.findIndex(media=>media.isMain) : 0;
    this.productGalleryForm = this.formBuilder.group({
      name: [productGallery ? productGallery.name : '', Validators.required],
      media: [productGallery ? productGallery.media : []],
      willUpload: [[]],
      isMain: [isMain, Validators.required]
    });

    if(productGallery){
      let mediaWillBeDeleted = this.formBuilder.control([]);
      this.productGalleryForm.addControl('mediaWillBeDeleted', mediaWillBeDeleted);
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

  changeMain(index: number){
    this.productGalleryForm.controls['isMain'].setValue(index);
  }

  removeImage(image: Media){
    let listMedia: Array<Media> = <Array<Media>>this.productGalleryForm.value.media;
    let index = listMedia.findIndex(media=>media._id === image._id);
    if(index>=0){
      let mediaWillBeDeleted: Array<Media> = <Array<Media>>this.productGalleryForm.value.mediaWillBeDeleted;
      mediaWillBeDeleted.push(listMedia[index]);
      this.productGalleryForm.controls['mediaWillBeDeleted'].setValue(mediaWillBeDeleted);
      listMedia.splice(index, 1);
    }
    this.productGalleryForm.controls['media'].setValue(listMedia);
    this.productGalleryForm.controls['isMain'].setValue(0);
  }

  removeWillUpload(index: number){
    let listWillUpload: Array<WillUpload> = <Array<WillUpload>>Array.from(this.productGalleryForm.value.willUpload);
    
    listWillUpload.splice(index, 1);
    this.productGalleryForm.controls['willUpload'].setValue(listWillUpload);
  }

  modify(){
    if(this.productGalleryId === 'new'){
      this.insert();
    }else{
      this.update();
    }
  }

  update(){
    if(this.productGalleryForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productGalleryService.update(accessToken, this.productGalleryId, this.productGalleryForm.value).subscribe(res=>{
          if(res){
            this.toastService.shortToastSuccess('Đã cập nhật Thư viện Sản Phẩm', 'Thành công').then(_=>{
              this.modalController.dismiss(res);
            });
          }else{
            this.toastService.shortToastWarning('Thư viện Sản Phẩm đã bị xóa', '');
          }
        },error=>{
          if(error.status === 409){
            this.toastService.shortToastError('Thư viện Sản Phẩm này đã tồn tại', 'Thất bại');
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
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productGalleryService.insert(accessToken, this.productGalleryForm.value).subscribe(res=>{
          this.toastService.shortToastSuccess('Đã thêm một Danh mục sản phẩm', 'Thành công').then(_=>{
            this.modalController.dismiss(res);
          });
        },error=>{
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
