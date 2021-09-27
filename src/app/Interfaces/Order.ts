import { Address } from './Address';
import { ClientAuthentication } from './ClientAuthentication';

interface ProductSchema{
    productId: string,
    quantity: number
}

export type OrderStatus = 'revoke' | 'pending' | 'confirmed' | 'isComing' | 'done';
export interface Order{
    _id?: string,
    code: string,
    status: OrderStatus,
    totalValue: number,
    createdBy: string,
    createdAt: string,
    updatedAt: string
}

export interface OrderDetail extends Order{
    accountId: string | ClientAuthentication,
    deliverTo: Address,
    products: Array<ProductSchema>,
}