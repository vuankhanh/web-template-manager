import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Media, ProductGalleryVideo } from 'src/app/Interfaces/ProductGalleryVideo';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { ProductGalleryVideoService } from 'src/app/services/api/product-gallery-video.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-gallery-video-modify',
  templateUrl: './product-gallery-video-modify.page.html',
  styleUrls: ['./product-gallery-video-modify.page.scss'],
})
export class ProductGalleryVideoModifyPage implements OnInit {
  @Input() productGalleryVideo: ProductGalleryVideo;

  productGalleryVideoForm: FormGroup;

  fileList: FileList;
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private productGalleryVideoService: ProductGalleryVideoService
  ) {
    
  }

  ngOnInit(){
    console.log(this.productGalleryVideo);
    this.initForm(this.productGalleryVideo);
  }

  initForm(productGalleryVideo?: ProductGalleryVideo){
    let isMain: number = productGalleryVideo?.media?.findIndex(media=>media.isMain) | 0;
    this.productGalleryVideoForm = this.formBuilder.group({
      name: [productGalleryVideo ? productGalleryVideo.name : '', Validators.required],
      media: [productGalleryVideo ? productGalleryVideo.media : []],
      isMain: [isMain, Validators.required]
    });
  }

  addVideo(media: Media){
    let medias: Array<Media> = this.productGalleryVideoForm.controls['media'].value as Array<Media>;
    if(media.isMain){
      for(let i=0; i<=medias.length-1; i++){
        medias[i].isMain = false;
      }
      let isMain: number = medias.length;
      this.productGalleryVideoForm.controls['isMain'].setValue(isMain);
    }
    medias.push(media);
    this.productGalleryVideoForm.controls['media'].setValue(medias);
  }

  removeVideo(index: number){
    let medias: Array<Media> = this.productGalleryVideoForm.controls['media'].value as Array<Media>;
    let isMain: number = this.productGalleryVideoForm.controls['isMain'].value as number;
    medias.splice(index, 1);
    this.productGalleryVideoForm.controls['media'].setValue(medias);

    if(index <= isMain){
      isMain--;
    }
    this.productGalleryVideoForm.controls['isMain'].setValue(isMain);
  }

  setMain(index: number){
    let medias: Array<Media> = this.productGalleryVideoForm.controls['media'].value as Array<Media>;
    for(let i=0; i<=medias.length-1; i++){
      medias[i].isMain = index === i ? true : false;
    }
    let isMain: number = index;
    this.productGalleryVideoForm.controls['isMain'].setValue(isMain);
    this.productGalleryVideoForm.controls['media'].setValue(medias);
  }

  modify(){
    if(!this.productGalleryVideo){
      this.insert();
    }else{
      this.update();
    }
  }

  update(){
    if(this.productGalleryVideoForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productGalleryVideoService.update(accessToken, this.productGalleryVideo._id, this.productGalleryVideoForm.value).subscribe(res=>{
          if(res){
            this.toastService.shortToastSuccess('Đã cập nhật Thư viện Sản Phẩm Video', 'Thành công').then(_=>{
              this.modalController.dismiss(res);
            });
          }else{
            this.toastService.shortToastWarning('Thư viện Sản Phẩm Video đã bị xóa', '');
          }
        },error=>{
          console.log(error);
          if(error.status === 409){
            this.toastService.shortToastError('Thư viện Sản Phẩm Video này đã tồn tại', 'Thất bại');
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
    if(this.productGalleryVideoForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productGalleryVideoService.insert(accessToken, this.productGalleryVideoForm.value).subscribe(res=>{
          console.log(res);
          this.toastService.shortToastSuccess('Đã thêm một Video vào Thư Viện', 'Thành công').then(_=>{
            this.modalController.dismiss(res);
          });
        },error=>{
          console.log(error);
          if(error.status === 409){
            this.toastService.shortToastError('video này đã tồn tại trong Thư Viện', 'Thất bại');
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
