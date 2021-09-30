import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { hostConfiguration } from '../../../environments/environment';

import { Posts } from 'src/app/Interfaces/Posts';
import { PaginationParams } from 'src/app/Interfaces/PaginationParams';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private urlGetAll: string = hostConfiguration.host+'/posts';
  private urlInsert: string = hostConfiguration.host+'/posts/insert';
  private urlUpdate: string = hostConfiguration.host+'/posts/update';
  private urlRemove: string = hostConfiguration.host+'/posts/remove';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(token: string, type: 'product'| 'other', paginationParams?: PaginationParams){
    let params: HttpParams = new HttpParams();
    params = params.append('type', type);
    if(paginationParams){
      params = params.append('size', paginationParams?.size ? paginationParams?.size : 10);
      params = params.append('page', paginationParams?.page ? paginationParams?.page : 1);
    }

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<PostsResponse>(this.urlGetAll, { headers, params });
  }

  insert(token: string, posts: Posts){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<Posts>(this.urlInsert, posts, { headers });
  }

  update(token: string, posts: Posts){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.put<Posts>(this.urlUpdate, posts, { headers });
  }

  remove(token: string, posts: Posts){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<PostsResponse | null>(this.urlRemove, posts, { headers });
  }
}

export interface PostsResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<Posts>
}
