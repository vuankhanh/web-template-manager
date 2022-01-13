import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProductGalleryVideoModifyPage } from '../../../pages/main/gallery-video/product-gallery-video-modify/product-gallery-video-modify.page';
import { ConfirmPasswordPage } from '../../confirm-password/confirm-password.page';

import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { ProductGalleryVideo } from 'src/app/Interfaces/ProductGalleryVideo';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductGalleryVideoResponse, ProductGalleryVideoService } from 'src/app/services/api/product-gallery-video.service';
import { ToastService } from 'src/app/services/toast.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-gallery-video',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductGalleryVideoComponent implements OnInit, OnDestroy {
  productGalleryVideoResponse: ProductGalleryVideoResponse;
  productGalleryVideos: Array<ProductGalleryVideo>;

  configPagination: PaginationParams;

  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private productGalleryVideoService: ProductGalleryVideoService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getProductGalleryVideo();
  }

  getProductGalleryVideo(paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.productGalleryVideoService.get(tokenStoraged.accessToken, paginationParams).subscribe(res=>{
          this.productGalleryVideoResponse = res;
          this.configPagination = {
            totalItems: res.totalItems,
            page: res.page,
            size: res.size,
            totalPages: res.totalPages
          };
          this.productGalleryVideos = this.productGalleryVideoResponse.data;
        })
      );
    }
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.getProductGalleryVideo(this.configPagination);
  }

  async navigatorToModify(productGalleryVideo?: ProductGalleryVideo){
    const modal = await this.modalController.create({
      component: ProductGalleryVideoModifyPage,
      componentProps: {
        productGalleryVideo
      }
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    if(data.data){
      if(productGalleryVideo){
        for(let [index, productCategory] of this.productGalleryVideos.entries()){
          if(productCategory._id === data.data._id){
            this.productGalleryVideos[index] = data.data;
          }
        }
      }else{
        this.productGalleryVideos.push(data.data);
      }
    }
  }

  async removeProductGallery(productGallery: ProductGalleryVideo){
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
          this.productGalleryVideoService.remove(tokenStoraged.accessToken, productGallery._id, password).subscribe(res=>{
            if(res){
              let index = this.productGalleryVideos.findIndex(productGallery=>productGallery._id === res._id);
              if(index>=0){
                this.productGalleryVideos.splice(index, 1);
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
  data: ProductGalleryVideo
}
