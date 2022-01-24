interface Menu{
    title: string,
    url: string,
    permission: number
}

export interface MenuSideBar extends Menu{
    icon: string
}

export interface MenuParner extends Menu{
    logo: string
}
