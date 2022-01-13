import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BannerGalleryModifyPage } from '../../../pages/main/gallery/banner-gallery-modify/banner-gallery-modify.page';
import { ConfirmPasswordPage } from '../../confirm-password/confirm-password.page';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { BannerGallery } from 'src/app/Interfaces/BannerGallery';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BannerGalleryService } from 'src/app/services/api/banner-gallery.service';
import { ToastService } from 'src/app/services/toast.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-other-gallery',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit, OnDestroy {
  bannerGallerys: Array<BannerGallery>
  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private bannerGalleryService: BannerGalleryService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getProductGallery();
  }

  getProductGallery(){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.bannerGalleryService.get(tokenStoraged.accessToken).subscribe(res=>{
          this.bannerGallerys = res;
        })
      );
    }
  }

  async navigatorToModify(bannerGallery?: BannerGallery){
    const modal = await this.modalController.create({
      component: BannerGalleryModifyPage,
      componentProps: {
        bannerGallery: bannerGallery
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data){
      if(bannerGallery){
        for(let [index, productCategory] of this.bannerGallerys.entries()){
          if(productCategory._id === data.data._id){
            this.bannerGallerys[index] = data.data;
          }
        }
      }else{
        this.bannerGallerys.push(data.data);
      }
    }
  }

  async removeBannerGallery(bannerGallery: BannerGallery){
    const modal = await this.modalController.create({
      component: ConfirmPasswordPage
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data){
      let password = data.data;
      let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
      
      if(tokenStoraged && tokenStoraged.accessToken){
        this.subscription.add(
          this.bannerGalleryService.remove(tokenStoraged.accessToken, bannerGallery._id, password).subscribe(res=>{
            if(res){
              let index = this.bannerGallerys.findIndex(bannerGallery=>bannerGallery._id === res._id);
              if(index>=0){
                this.bannerGallerys.splice(index, 1);
                this.toastService.shortToastSuccess('Đã xóa thành công', 'Thành công');
              }
            }else{
              this.toastService.shortToastWarning('Không tồn tại album này', '');
            }
          },error=>{
            if(error.status === 400){
              this.toastService.shortToastError('Sai mật khẩu', 'Thất bại');
            }else{
              this.toastService.shortToastError('Đã có lỗi xảy ra', 'Thất bại');
            }
          })
        );
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

interface Params{
  type: 'insert' | 'update',
  data: BannerGallery
}
