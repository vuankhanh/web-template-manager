import { Address } from './Address';
import { ClientAuthentication } from './ClientAuthentication';

interface ProductSchema{
    productId: string,
    quantity: number
}

export interface Status{
    
}
export interface Order{
    _id?: string,
    code: string,
    status: 'revoke' | 'pending' | 'confirmed' | 'isComing' | 'done',
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