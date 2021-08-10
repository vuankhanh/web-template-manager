import { Media } from "./ProductGallery";
import { WillUpload } from "./WillUpload";

export interface BannerGallery{
    _id?: string,
    name: string,
    bannerName: string,
    thumbnail?: string,
    src: string,
    media: Array<Media>,
    willUpload?: Array<WillUpload>,
    createdAt?: string,
    updatedAt?: string
}