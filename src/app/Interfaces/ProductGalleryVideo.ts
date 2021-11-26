export interface ProductGalleryVideo{
    _id?: string,
    name: string,
    productName?: string,
    media: Array<Media>,
    isMain?: number,
    createdAt?: string,
    updatedAt?: string,
}

export interface Media{
    _id: string,
    type: string | 'youtube-video',
    youtubeId: string,
    isMain: boolean,
    createdAt?: string,
    updatedAt?: string,
}