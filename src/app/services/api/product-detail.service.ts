import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor() { }
}
export interface ProductDetail{
  _id: string,
  longDescription: string | null,
  albumImg: Gallery | null,
  albumVideo: Gallery | null
  createdAt?: string,
  updatedAt?: string
}

export interface Gallery{
  _id?: string
  type: 'img' | 'video',
  src: string,
  srcThumbnail: string | null,
  isMain: boolean,
  createdAt?: string,
  updatedAt?: string
}