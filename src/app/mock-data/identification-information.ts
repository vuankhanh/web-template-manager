export const showIdentificationInfor: ShowIdentificationIformation = {
    logo: '',
    phoneNumber: '0974017030',
    socialNetworking: 'Facebook, Zalo',
    address: {
        id: 1,
        street: 'HH4A, KĐT Tây Nam Linh Đàm',
        ward: 'Hoàng Liệt',
        district: 'Hoàng Mai',
        province: 'Hà Nội',
        position:{
            lat: 20.963251, lng: 105.826472
        },
        isHeadquarters: true
    }
}

export interface ShowIdentificationIformation{
    logo: string,
    phoneNumber: string,
    socialNetworking: string,
    address: Address
}

export const identificationInfor: IdentificationInformation = {
    logo: '',
    phoneNumber: [
        {
            id: 1,
            number: '0974017030',
            isMain: true
        },{
            id: 2,
            number: '0834517989',
            isMain: false
        }
    ],
    socialNetworking: [
        {
            id: 1,
            social: 'facebook',
            src: 'facebook.com/ccrtuthan'
        },{
            id: 2,
            social: 'zalo',
            src: 'zalo.me/0974017030'
        }
    ],
    address: [
        {
            id: 1,
            street: 'HH4A, KĐT Tây Nam Linh Đàm',
            ward: 'Hoàng Liệt',
            district: 'Hoàng Mai',
            province: 'Hà Nội',
            position:{
                lat: 20.963251, lng: 105.826472
            },
            isHeadquarters: true
        },{
            id: 2,
            street: '136 Cầu Diễn',
            ward: 'Minh Khai',
            district: 'Cầu Diễn',
            province: 'Bắc Từ Liêm',
            position:{
                lat: 21.050669465111557, lng: 105.73767305644884
            },
            isHeadquarters: false
        }
    ]
}

export interface IdentificationInformation{
    logo: string,
    phoneNumber: Array<PhoneNumber>,
    socialNetworking: Array<SocialNetworking>,
    address: Array<Address>,
}

export interface PhoneNumber{
    id: number,
    number: string,
    isMain: boolean
}

export interface SocialNetworking{
    id: number,
    social: string,
    src: string
}

export interface Address{
    id: number,
    street: string,
    ward: string,
    district: string,
    province: string,
    position: Position,
    isHeadquarters: boolean,
}

export interface Position{
    lat: number,
    lng: number
}