export interface IListItem {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: 'ACTIVE' | 'COMPLETED';
}

export type TMenuItem = 'ALL' | 'ACTIVE' | 'COMPLETED';
export type TActiveForm = 'NONE' | 'NEW' | 'EDIT'