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

@Component({
  selector: 'app-banner-gallery-modify',
  templateUrl: './banner-gallery-modify.page.html',
  styleUrls: ['./banner-gallery-modify.page.scss'],
})
export class BannerGalleryModifyPage implements OnInit {
  @Input() bannerGallery: BannerGallery;

  bannerGalleryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private localStorageService: LocalStorageService,
    private bannerGalleryService: BannerGalleryService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.initForm(this.bannerGallery);
  }

  initForm(bannerGallery?: BannerGallery){
    this.bannerGalleryForm = this.formBuilder.group({
      name: [bannerGallery ? bannerGallery.name : '', Validators.required],
      media: [bannerGallery ? [{src: bannerGallery.src}] : ''],
      willUpload: [[]]
    });
  }

  async onFileSelect(event: Event){
    let target: HTMLInputElement = <HTMLInputElement>event.target;
    let files = target.files;

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
    let listWillUpload: Array<WillUpload> = <Array<WillUpload>>Array.from(this.bannerGalleryForm.value.willUpload);
    
    listWillUpload.splice(index, 1);
    this.bannerGalleryForm.controls['willUpload'].setValue(listWillUpload);
  }

  modify(){
    if(!this.bannerGallery){
      this.insert();
    }else{
      this.update();
    }
  }

  update(){
    if(this.bannerGalleryForm.valid){

      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.bannerGalleryService.update(accessToken, this.bannerGallery._id, this.bannerGalleryForm.value).subscribe(res=>{
          if(res){
            this.toastService.shortToastSuccess('???? c???p nh???t Th?? vi???n Banner', 'Th??nh c??ng').then(_=>{
              this.modalController.dismiss(res);
            });
          }else{
            this.toastService.shortToastWarning('Th?? vi???n Banner ???? b??? x??a', '');
          }
        },error=>{
          if(error.status === 409){
            this.toastService.shortToastError('Th?? vi???n Banner n??y ???? t???n t???i', 'Th???t b???i');
          }else{
            this.toastService.shortToastError('???? c?? l???i x???y ra', 'Th???t b???i');
          }
        })
      }else{
        this.toastService.shortToastWarning('Phi??n ????ng nh???p c???a b???n ???? h???t h???n', '????ng nh???p l???i');
      }
    }
  }

  insert(){
    if(this.bannerGalleryForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.bannerGalleryService.insert(accessToken, this.bannerGalleryForm.value).subscribe(res=>{
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
      }else{
        this.toastService.shortToastWarning('Phi??n ????ng nh???p c???a b???n ???? h???t h???n', '????ng nh???p l???i');
      }
    }
  }
}

interface Params{
  type: 'insert' | 'update',
  data: BannerGallery
}
