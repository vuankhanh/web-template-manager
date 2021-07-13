import { WillUpload } from "./WillUpload";

export interface ProductGallery{
    _id?: string,
    name: string,
    productName?: string,
    src?: string,
    thumbnail?: string,
    media: Array<Media>,
    willUpload?: Array<WillUpload>,
    isMain?: number,
    createdAt?: string,
    updatedAt?: string,
}

export interface Media{
    _id: string,
    type: 'img' | 'video',
    src: string,
    srcThumbnail: string | null,
    isMain: boolean,
    createdAt?: string,
    updatedAt?: string,
}