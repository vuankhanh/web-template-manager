import { Identification } from "./Identification";

export interface Status{
    numericalOrder: number,
    code: string,
    name: string
}

export interface AdminRight{
    code: number,
    name: string
}

export interface ServerConfig{
    identification: Identification,
    orderStatus: Array<Status>,
    orderCreatedBy: Array<Status>,
    adminRights : Array<AdminRight>,
    reviewStatus: Array<Status>
}