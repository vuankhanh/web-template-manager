import { Address } from './Address';

export interface AccountType{
    userName: string,
    password: string,
    emailToken: string,
    isVerified: boolean
}

export interface ClientAuthentication{
    customerCode: string,
    email: string,
    phoneNumber: string,
    name: string,
    address: Array<Address>,
    allowAccount: boolean,
    allowFacebook: boolean,
    allowGoogle: boolean,
    allowZalo: boolean,
    account: AccountType,
    facebookId: string,
    googleId: string,
    zaloId: string,
    createdAt: string,
    updatedAt: string
}