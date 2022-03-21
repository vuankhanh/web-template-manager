import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { PaginationParams } from 'src/app/Interfaces/PaginationParams';
import { Posts } from 'src/app/Interfaces/Posts';

import { ResponseLogin } from 'src/app/services/api/login.service';
import { PostsResponse, PostsService } from 'src/app/services/api/posts.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-choose-posts',
  templateUrl: './choose-posts.component.html',
  styleUrls: ['./choose-posts.component.scss'],
})
export class ChoosePostsComponent implements OnInit, OnDestroy {
  postsResponse: PostsResponse;
  postses: Array<Posts>;

  configPagination: PaginationParams;
  subscription: Subscription = new Subscription();
  constructor(
    public modalController: ModalController,
    private localStorageService: LocalStorageService,
    private postsSerivce: PostsService
  ) { }

  ngOnInit() {
    this.listenPosts('other');
  }

  listenPosts(postsType: 'product'| 'other', paginationParams?: PaginationParams){
    let tokenStoraged: ResponseLogin = this.localStorageService.get(this.localStorageService.tokenKey);

    if(tokenStoraged && tokenStoraged.accessToken){
      this.subscription.add(
        this.postsSerivce.get(tokenStoraged.accessToken, postsType, paginationParams).subscribe(res=>{
          this.postsResponse = res;
          this.configPagination = {
            totalItems: res.totalItems,
            page: res.page,
            size: res.size,
            totalPages: res.totalPages
          };
          this.postses = this.postsResponse.data;
        })
      );
    }
  }

  changeIndex(index: number){
    this.configPagination.page = index;
    this.listenPosts('other', this.configPagination);
  }

  choosePosts(posts: Posts){
    this.modalController.dismiss(posts);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
