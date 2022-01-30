
export interface JwtDecoded{
    data: AdminInformation,
    exp: Number,
    iat: Number
}

export interface AdminInformation {
    _id: string,
    userName: string,
    name: string,
    avatar: string,
    permission: number,
    activated: boolean,
    createdAt: string,
    updatedAt: string
}
