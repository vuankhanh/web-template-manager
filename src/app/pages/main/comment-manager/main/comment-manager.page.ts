import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

import { Status } from 'src/app/Interfaces/ServerConfig';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';

import { ConfigService } from 'src/app/services/api/config.service';

import { ProductReviews, ProductReviewsCodeStatus } from 'src/app/Interfaces/ProductReviews';
import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductReviewsService } from 'src/app/services/api/product-reviews.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-manager',
  templateUrl: './comment-manager.page.html',
  styleUrls: ['./comment-manager.page.scss'],
})
export class CommentManagerPage implements OnInit, OnDestroy {
  @ViewChild(MatTable) matTable: MatTable<any>;
  reviewsStatuses: Array<Status>;

  productReviewses: Array<ProductReviews>;
  displayedColumns: string[] = ['status', 'rating', 'name', 'phoneNumber', 'createdAt', 'updatedAt'];
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  paginationParams: PaginationParams;
  reviewsStatusParam: ProductReviewsCodeStatus = 'pending';
  
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
    this.getProductReviewsChange();
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
    status?: ProductReviewsCodeStatus,
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

  getProductReviewsChange(){
    this.subscription.add(
      this.productReviewsService.getProductReviewsChange().subscribe(res=>{
        if(res){
          for(let i=0; i<=this.productReviewses.length-1; i++){
            let productReviews = this.productReviewses[i];
            if(productReviews._id === res._id){
              console.log(res)
              this.productReviewses[i] = res;
              this.matTable.renderRows();
            }
          }
        }
      })
    )
  }

  filterNameProductReviewsStatus(code: ProductReviewsCodeStatus){
    return this.configService.filterNameProductReviewsStatus(code);
  }

  reviewsStatusParamChange(){
    this.getAll(
      this.paginationParams,
      this.reviewsStatusParam,
    );
  }

  //X??? l?? s??? ki???n thay ?????i c???a ph??n trang
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
