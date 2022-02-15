import { Product } from "./Product";

export type ProductReviewsCodeStatus = 'revoke' | 'pending' | 'confirmed';

export interface ProductReviews{
    _id: string,
    status: ProductReviewsCodeStatus,
    product: string | Product,
    clientInformation: ClientInformation,
    purchaseConfirmation: boolean,
    content: string,
    rating: number,
    createdAt: string,
    updatedAt: string
}

interface ClientInformation{
    name: string,
    phoneNumber: string
}