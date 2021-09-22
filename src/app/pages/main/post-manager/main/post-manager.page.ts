import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PostModifyPage } from '../post-modify/post-modify.page';

import { Posts } from 'src/app/Interfaces/Posts';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PostsResponse, PostsService } from 'src/app/services/api/posts.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-manager',
  templateUrl: './post-manager.page.html',
  styleUrls: ['./post-manager.page.scss'],
})
export class PostManagerPage implements OnInit, OnDestroy {
  selection: 'product' | 'other' = 'product';
  postsResponse: PostsResponse;
  configPagination: PaginationParams;
  postses: Array<Posts>;
  subscription: Subscription = new Subscription();
  constructor(
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.listenPosts(this.selection);
  }

  listenPosts(type?: 'product' | 'other', paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);
    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.postsService.get(tokenStoraged.accessToken, type, paginationParams).subscribe(res=>{
          this.postsResponse = res;
          this.configPagination = {
            totalItems: this.postsResponse.totalItems,
            page: this.postsResponse.page,
            size: this.postsResponse.size,
            totalPages: this.postsResponse.totalPages
          };
          this.postses = this.postsResponse.data;
          console.log(this.postses);
        })
      )
    }
  }

  segmentChanged(){
    console.log(this.selection);
    this.listenPosts(this.selection);
  }

  async navigatorToModify(type: 'update'| 'insert', posts: Posts){
    const modal = await this.modalController.create({
      component: PostModifyPage,
      componentProps: {
        type,
        data: posts
      },
      cssClass: 'posts-modify-modal'
    });

    modal.present();
    
    const data = await modal.onDidDismiss();
    console.log(data);
    // if(data.data && data.data.type){

    //   let params: Params = {
    //     type: <'insert' | 'update'>data.data.type,
    //     data: <Product>data.data.data
    //   }

    //   if(type === 'insert'){
    //     this.products.push(params.data);
    //   }else if(type==='update'){
    //     for(let [index, productCategory] of this.products.entries()){
    //       if(productCategory._id === params.data._id){
    //         this.products[index] = params.data;
    //       }
    //     }
    //   }
    // }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
