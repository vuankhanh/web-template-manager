import { BannerGallery } from './BannerGallery';
import { Posts } from './Posts';
import { ProductCategory } from './ProductCategory';
import { ProductGallery } from './ProductGallery';

export interface Product{
    _id?: string,
    code?: string,
    name: string,
    category: ProductCategory,
    price: number,
    currencyUnit: string,
    unit: string,
    thumbnailUrl?: string,
    sortDescription: string,
    highlight: boolean,
    albumBanner?: BannerGallery,
    theRemainingAmount: number,
    longDescription: Posts | null,
    supplier?: string | null,
    albumImg?: ProductGallery | null,
    albumVideo?: ProductGallery | null
    createdAt?: string,
    updatedAt?: string
  }