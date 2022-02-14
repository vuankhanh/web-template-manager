import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ActionConfirmationPage } from '../modal/action-confirmation/action-confirmation.page';

import { ProductReviewsStatus } from 'src/app/Interfaces/ServerConfig';
import { ProductReviews, ProductReviewsCodeStatus } from 'src/app/Interfaces/ProductReviews';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { ProductReviewsService } from 'src/app/services/api/product-reviews.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ConfigService } from 'src/app/services/api/config.service';

import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-comment-processing',
  templateUrl: './comment-processing.page.html',
  styleUrls: ['./comment-processing.page.scss'],
})
export class CommentProcessingPage implements OnInit, OnDestroy {
  reviewsStatuses: Array<ProductReviewsStatus>;

  productReviews: ProductReviews;

  subscription: Subscription = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private productReviewsService: ProductReviewsService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.listenProductReviewDetail();
    this.getConfig();
  }

  listenProductReviewDetail(){
    const params$ = this.activatedRoute.params;
    this.subscription.add(
      params$.pipe(
        switchMap(params=>this.productReviewDetail(params['commentId']))
      ).subscribe(res=>{
        if(res){
          this.productReviews = res;
        }
      })
    )
  }

  productReviewDetail(commentId: string){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      return this.productReviewsService.getDetail(tokenStoraged.accessToken, commentId);
    }else{
      of(null)
    }
  }

  getConfig(){
    this.subscription.add(
      this.configService.get().subscribe(res=>{
        this.reviewsStatuses = res.reviewStatus;
      })
    )
  }

  filterNameProductReviewsStatus(code: ProductReviewsCodeStatus){
    return this.configService.filterNameProductReviewsStatus(code);
  }

  async changeStatus(numericalOrder: number){
    let newStatus: ProductReviewsCodeStatus = this.reviewsStatuses.find(status=>status.numericalOrder===numericalOrder).code;
    const modal = await this.modalController.create({
      component: ActionConfirmationPage,
      componentProps: {
        newStatus,
        productReviews: this.productReviews
      }
    });
    modal.present();
    modal.onDidDismiss().then(res=>{
      if(res.data){
        let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
        if(tokenStoraged && tokenStoraged.accessToken){
          this.subscription.add(
            this.productReviewsService.changeStatus(tokenStoraged.accessToken, this.productReviews._id, newStatus).subscribe(res=>{
              this.productReviews = res;
              this.toastService.shortToastSuccess('Đã đổi trạng thái của bình luận', 'Thành công');
            })
          )
        }
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
