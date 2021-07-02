
export interface JwtDecoded{
    data: AdminInformation,
    exp: Number,
    iat: Number
}

export interface AdminInformation {
    userName: string,
    name: string,
    avatar: string,
    permission: number,
    createdAt: Date,
    updatedAt: Date
}
