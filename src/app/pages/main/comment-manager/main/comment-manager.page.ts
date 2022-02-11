import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { Status } from 'src/app/Interfaces/ServerConfig';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';

import { ConfigService } from 'src/app/services/api/config.service';

import { ProductReviews, ProductReviewsStatus } from 'src/app/Interfaces/ProductReviews';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductReviewsService } from 'src/app/services/api/product-reviews.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-manager',
  templateUrl: './comment-manager.page.html',
  styleUrls: ['./comment-manager.page.scss'],
})
export class CommentManagerPage implements OnInit {
  reviewsStatuses: Array<Status>;

  productReviewses: Array<ProductReviews>;
  displayedColumns: string[] = ['status', 'rating', 'name', 'phoneNumber', 'product', 'createdAt', 'updatedAt'];
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  paginationParams: PaginationParams;
  reviewsStatusParam: ProductReviewsStatus = 'pending';
  
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private configService: ConfigService,
    private localStorageService: LocalStorageService,
    private productReviewsService: ProductReviewsService
  ) { }

  ngOnInit() {
    this.getConfig();
    this.getAll(
      null,
      this.reviewsStatusParam
    );
  }

  getConfig(){
    this.subscription.add(
      this.configService.get().subscribe(res=>{
        this.reviewsStatuses = res.reviewStatus;
      })
    )
  }

  getAll(
    paginationParams?: PaginationParams,
    status?: ProductReviewsStatus,
    createdBy?: string,
    orderCode?: string,
    phoneNumber?: string,
    fromDate?: Date,
    toDate?: Date
  ){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    this.subscription.add(
      this.productReviewsService.get(
        tokenStoraged.accessToken,
        paginationParams,
        status,
      ).subscribe(res=>{
        this.paginationParams = {
          totalItems: res.totalItems,
          size: res.size,
          page: res.page-1,
          totalPages: res.totalPages
        }
        this.productReviewses = res.data;
        console.log(this.productReviewses)
      },error=>{
      })
    );
  }

  filterNameOrderStatus(code: string){
    return this.configService.filterNameOrderStatus(code);
  }

  reviewsStatusParamChange(){
    this.getAll(
      this.paginationParams,
      this.reviewsStatusParam,
    );
  }

  //Xử lý sự kiện thay đổi của phân trang
  handlePageEvent(event: PageEvent) {
    let objectParams = Object.assign({}, this.paginationParams);
    objectParams.page = event.pageIndex+1;
    objectParams.size = event.pageSize;

    this.getAll(
      objectParams,
      this.reviewsStatusParam,
    );
  }

  censorshipReviews(productReviews: ProductReviews){
    this.router.navigate(['/main/comment-manager/comment-processing', productReviews._id]);
  }
}
