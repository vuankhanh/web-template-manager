import { WillUpload } from "./WillUpload";

export interface BannerGallery{
    _id?: string,
    name: string,
    bannerName: string,
    src: string,
    willUpload?: WillUpload
    createdAt?: string,
    updatedAt?: string
}