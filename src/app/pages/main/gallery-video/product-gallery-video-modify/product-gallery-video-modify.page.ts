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
            this.toastService.shortToastSuccess('???? c???p nh???t Th?? vi???n S???n Ph???m Video', 'Th??nh c??ng').then(_=>{
              this.modalController.dismiss(res);
            });
          }else{
            this.toastService.shortToastWarning('Th?? vi???n S???n Ph???m Video ???? b??? x??a', '');
          }
        },error=>{
          if(error.status === 409){
            this.toastService.shortToastError('Th?? vi???n S???n Ph???m Video n??y ???? t???n t???i', 'Th???t b???i');
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
    if(this.productGalleryVideoForm.valid){
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      if(tokenStoraged && tokenStoraged.accessToken){
        let accessToken = tokenStoraged.accessToken;
        this.productGalleryVideoService.insert(accessToken, this.productGalleryVideoForm.value).subscribe(res=>{
          this.toastService.shortToastSuccess('???? th??m m???t Video v??o Th?? Vi???n', 'Th??nh c??ng').then(_=>{
            this.modalController.dismiss(res);
          });
        },error=>{
          if(error.status === 409){
            this.toastService.shortToastError('video n??y ???? t???n t???i trong Th?? Vi???n', 'Th???t b???i');
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
