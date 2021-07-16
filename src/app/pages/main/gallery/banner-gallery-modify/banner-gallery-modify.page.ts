import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { BannerGallery } from 'src/app/Interfaces/BannerGallery';
import { WillUpload } from 'src/app/Interfaces/WillUpload';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BannerGalleryService } from 'src/app/services/api/banner-gallery.service';
import { ToastService } from 'src/app/services/toast.service';
import { Media } from 'src/app/Interfaces/ProductGallery';

const tokenKey = "authentication-information";
@Component({
  selector: 'app-banner-gallery-modify',
  templateUrl: './banner-gallery-modify.page.html',
  styleUrls: ['./banner-gallery-modify.page.scss'],
})
export class BannerGalleryModifyPage implements OnInit {
  @Input() type:string;
  @Input() data: BannerGallery;

  bannerGalleryForm: FormGroup;
  params: Params;
  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private localStorageService: LocalStorageService,
    private bannerGalleryService: BannerGalleryService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    const data = JSON.parse(JSON.stringify(this.data));
      this.params = {
        type: <'update' | 'insert'>this.type,
        data: <BannerGallery>data
      };
      
      this.initForm(this.params.data);
  }

  initForm(bannerGallery?: BannerGallery){
    if(bannerGallery){
      this.bannerGalleryForm = this.formBuilder.group({
        name: [bannerGallery && bannerGallery!.bannerName ? bannerGallery!.bannerName : '', Validators.required],
        media: [bannerGallery && bannerGallery!.media ? bannerGallery!.media : ''],
        willUpload: [[]],
        isMain: [0]
      });
    }
  }

  async onFileSelect(event: Event){
    let target: HTMLInputElement = <HTMLInputElement>event.target;
    let files = target.files;
    console.log(files);
    if (files.length > 0) {
      this.bannerGalleryForm.controls['willUpload'].setValue(files);
      for(let i = 0; i< this.bannerGalleryForm.value.willUpload.length; i++){
        this.bannerGalleryForm.value.willUpload[i].base64 = await this.previewImage(files[i]);
      }
    }
  }

  removeImage(image: Media){
    let listMedia: Array<Media> = <Array<Media>>this.bannerGalleryForm.value.media;
    let index = listMedia.findIndex(media=>media._id === image._id);
    if(index>=0){
      listMedia.splice(index, 1);
      this.bannerGalleryForm.controls['media'].setValue(listMedia);
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

  removeWillUpload(index: number){
    console.log(index);
    let listWillUpload: Array<WillUpload> = <Array<WillUpload>>Array.from(this.bannerGalleryForm.value.willUpload);
    
    listWillUpload.splice(index, 1);
    this.bannerGalleryForm.controls['willUpload'].setValue(listWillUpload);
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
    if(this.bannerGalleryForm.valid){
      let bannerGallery: BannerGallery = {
        _id: this.params.data._id,
        ...this.bannerGalleryForm.value
      }

      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.bannerGalleryService.update(accessToken, bannerGallery).subscribe(res=>{
          if(res){
            this.toastService.shortToastSuccess('Đã cập nhật Thư viện Banner', 'Thành công').then(_=>{
              this.params = {
                type: <'update' | 'insert'>this.type,
                data: res
              }
              this.modalController.dismiss(this.params);
            });
          }else{
            this.toastService.shortToastWarning('Thư viện Banner đã bị xóa', '');
          }
        },error=>{
          console.log(error);
          if(error.status === 409){
            this.toastService.shortToastError('Thư viện Banner này đã tồn tại', 'Thất bại');
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
    if(this.bannerGalleryForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.bannerGalleryService.insert(accessToken, this.bannerGalleryForm.value).subscribe(res=>{
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
  data: BannerGallery
}
