export interface IListItem {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: 'ACTIVE' | 'COMPLETED';
}

export interface IDummyDataItem {
    title: string;
    description: string
    ingredients: string[]
    image: string
    id: number
}

export interface IDummyUserData {
    id: string;
    name: string;
    password?: string;
}

export type TMenuItem = 'ALL' | 'ACTIVE' | 'COMPLETED';
export type TActiveForm = 'NONE' | 'NEW' | 'EDIT'