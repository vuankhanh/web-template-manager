import { WillUpload } from "./WillUpload";

export interface BannerGallery{
    _id: string,
    name: string,
    route: string,
    thumbnail: string,
    src: string,
    createdAt: string,
    updatedAt: string
}

export interface BannerGalleryWillUpload{
    name: string,
    willUpload: Array<WillUpload>
}