import { Identification } from "./Identification";
import { ProductReviewsCodeStatus } from "./ProductReviews";

export interface Status{
    numericalOrder: number,
    code: string,
    name: string
}

export interface ProductReviewsStatus extends Omit<Status, 'code'>{
    code: ProductReviewsCodeStatus
}

export interface AdminRight{
    code: number,
    name: string
}

export interface Rating{
    value: number,
    title: string
}

export interface ServerConfig{
    identification: Identification,
    orderStatus: Array<Status>,
    orderCreatedBy: Array<Status>,
    adminRights : Array<AdminRight>,
    reviewStatus: Array<ProductReviewsStatus>,
    rating: Array<Rating>;
}