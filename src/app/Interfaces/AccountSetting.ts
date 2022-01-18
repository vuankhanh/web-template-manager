export interface AccountSetting{
    groupName: string,
    items: Array<ItemGroupSetting>
}

interface ItemGroupSetting{
    icon: string,
    title: string,
    isOpen: boolean
}